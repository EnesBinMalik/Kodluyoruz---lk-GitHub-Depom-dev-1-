/**
 * ============================================================================
 * Müşteri Yönetim Sistemi (MYS) - Gelişmiş Router Sınıfı
 * @author Enes Öztürk
 * @version 2.4.0
 * @description GET ve POST ayrımı, dinamik regex parametre yakalama,
 *              Callback ve Class@Method çağrım mimarisi.
 * ============================================================================
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'ANY';

export type CallbackHandler = (
  params: Record<string, string>,
  request: RequestContext
) => any;

export type RouteHandler = CallbackHandler | string; // string e.g. "MusteriController@detay"

export interface RequestContext {
  method: string;
  uri: string;
  body?: any;
  query?: Record<string, string>;
  params?: Record<string, string>;
  rawParams?: string[];
  timestamp: string;
}

export interface RouteDefinition {
  id: string;
  method: HttpMethod;
  pattern: string;
  compiledRegex: RegExp;
  paramNames: string[];
  handler: RouteHandler;
  handlerType: 'callback' | 'class_method';
  controllerName?: string;
  methodName?: string;
  description?: string;
}

export interface DispatchResult {
  success: boolean;
  statusCode: number;
  statusText: string;
  matchedRoute: RouteDefinition | null;
  params: Record<string, string>;
  rawParams: string[];
  handlerType: 'callback' | 'class_method' | 'none';
  handlerName: string;
  response: any;
  executionTimeMs: number;
  pipelineSteps: {
    title: string;
    description: string;
    status: 'success' | 'warning' | 'error' | 'info';
    detail?: string;
  }[];
  authorSignature: string;
}

export class Router {
  public static readonly AUTHOR = 'Enes Öztürk';
  public static readonly VERSION = '2.4.0';

  /**
   * HTTP metotlarına göre ayrıştırılmış rotalar havuzu
   */
  private static routes: Record<HttpMethod, RouteDefinition[]> = {
    GET: [],
    POST: [],
    PUT: [],
    DELETE: [],
    PATCH: [],
    ANY: [],
  };

  /**
   * Class@Method çağrıları için kayıtlı Controller sınıfları veya nesneleri
   */
  private static controllers: Map<string, any> = new Map();

  /**
   * Özel 404 (Bulunamadı) işleyicisi
   */
  private static notFoundHandler: RouteHandler | null = null;

  /**
   * Özel 405 (İzin Verilmeyen Metot) işleyicisi
   */
  private static methodNotAllowedHandler: RouteHandler | null = null;

  /**
   * Global Rota Temizleme
   */
  public static clear(): void {
    this.routes = {
      GET: [],
      POST: [],
      PUT: [],
      DELETE: [],
      PATCH: [],
      ANY: [],
    };
    this.controllers.clear();
  }

  /**
   * Controller sınıfını / örneğini Router'a kaydeder
   */
  public static registerController(name: string, controller: any): void {
    this.controllers.set(name, controller);
  }

  /**
   * Controller kayıtlı mı kontrol eder
   */
  public static hasController(name: string): boolean {
    return this.controllers.has(name);
  }

  /**
   * Rota deseni regex'e dönüştürülür ve parametre isimleri ayıklanır.
   * Desteklenen formatlar:
   * 1. Regex Grupları: /musteri/detay/([0-9]+) -> param0, param1...
   * 2. İsimlendirilmiş Regex: /musteri/{id:[0-9]+} -> { id: "..." }
   * 3. Basit Parametreler: /musteri/:id veya /musteri/{id} -> [^/]+
   * 4. İsimlendirilmiş Regex: /kategori/{slug:[a-zA-Z0-9_-]+}
   */
  private static compilePattern(pattern: string): { regex: RegExp; paramNames: string[] } {
    let normalized = pattern.trim();
    if (!normalized.startsWith('/')) {
      normalized = '/' + normalized;
    }
    // Sondaki slash'ı temizle (kök hariç)
    if (normalized.length > 1 && normalized.endsWith('/')) {
      normalized = normalized.slice(0, -1);
    }

    const paramNames: string[] = [];
    let regexString = '';
    let autoIndex = 0;

    // 1. İsimlendirilmiş özel regex deseni: {name:regex} e.g. {id:[0-9]+}
    let converted = normalized.replace(/\{([a-zA-Z0-9_]+):([^}]+)\}/g, (_, name, customRegex) => {
      paramNames.push(name);
      return `(${customRegex})`;
    });

    // 2. Basit süslü parantez deseni: {name}
    converted = converted.replace(/\{([a-zA-Z0-9_]+)\}/g, (_, name) => {
      paramNames.push(name);
      return '([^/]+)';
    });

    // 3. İki nokta üst üste deseni: :id
    converted = converted.replace(/:([a-zA-Z0-9_]+)/g, (_, name) => {
      paramNames.push(name);
      return '([^/]+)';
    });

    // 4. Doğrudan parantez içeren anonim regex grupları: ([0-9]+)
    // Henüz paramNames'e eklenmemiş açık parantezleri kontrol edelim
    const segments = converted.split('/');
    const builtSegments: string[] = [];

    for (const segment of segments) {
      if (!segment && builtSegments.length === 0) {
        builtSegments.push('');
        continue;
      }
      // Eğer segmentte yakalama grubu '(' var ve paramNames sayısı henüz bunu karşılamıyorsa
      const openParens = (segment.match(/\((?!\?:)/g) || []).length;
      if (openParens > 0) {
        // Zaten isimli olmayan anonim grupları param{n} olarak numaralandır
        while (paramNames.length < autoIndex + openParens) {
          paramNames.push(`param_${paramNames.length + 1}`);
        }
        autoIndex += openParens;
      }
      builtSegments.push(segment);
    }

    regexString = '^' + builtSegments.join('/') + '$';
    const regex = new RegExp(regexString);

    return { regex, paramNames };
  }

  /**
   * Genel Rota Ekleme Metodu
   */
  public static add(
    method: HttpMethod,
    pattern: string,
    handler: RouteHandler,
    description?: string
  ): RouteDefinition {
    const { regex, paramNames } = this.compilePattern(pattern);

    let handlerType: 'callback' | 'class_method' = 'callback';
    let controllerName: string | undefined;
    let methodName: string | undefined;

    if (typeof handler === 'string') {
      handlerType = 'class_method';
      const parts = handler.split('@');
      if (parts.length === 2) {
        controllerName = parts[0].trim();
        methodName = parts[1].trim();
      } else {
        throw new Error(`Geçersiz Class@Method formatı: ${handler}. Doğru format: 'SinifAdi@metotAdi'`);
      }
    }

    const routeDef: RouteDefinition = {
      id: `${method}_${pattern}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      method,
      pattern,
      compiledRegex: regex,
      paramNames,
      handler,
      handlerType,
      controllerName,
      methodName,
      description,
    };

    this.routes[method].push(routeDef);
    return routeDef;
  }

  /**
   * GET İsteği Tanımlama
   */
  public static get(pattern: string, handler: RouteHandler, description?: string): RouteDefinition {
    return this.add('GET', pattern, handler, description);
  }

  /**
   * POST İsteği Tanımlama
   */
  public static post(pattern: string, handler: RouteHandler, description?: string): RouteDefinition {
    return this.add('POST', pattern, handler, description);
  }

  /**
   * PUT İsteği Tanımlama
   */
  public static put(pattern: string, handler: RouteHandler, description?: string): RouteDefinition {
    return this.add('PUT', pattern, handler, description);
  }

  /**
   * DELETE İsteği Tanımlama
   */
  public static delete(pattern: string, handler: RouteHandler, description?: string): RouteDefinition {
    return this.add('DELETE', pattern, handler, description);
  }

  /**
   * Tüm metotlar için rota tanımlama
   */
  public static any(pattern: string, handler: RouteHandler, description?: string): RouteDefinition {
    return this.add('ANY', pattern, handler, description);
  }

  /**
   * Kayıtlı tüm rotaları döner
   */
  public static getRoutes(): Record<HttpMethod, RouteDefinition[]> {
    return this.routes;
  }

  /**
   * Düz rota listesi döner
   */
  public static getAllRoutesFlat(): RouteDefinition[] {
    const list: RouteDefinition[] = [];
    (Object.keys(this.routes) as HttpMethod[]).forEach((m) => {
      list.push(...this.routes[m]);
    });
    return list;
  }

  /**
   * Özel 404 işleyicisi atama
   */
  public static setNotFound(handler: RouteHandler): void {
    this.notFoundHandler = handler;
  }

  /**
   * Özel 405 işleyicisi atama
   */
  public static setMethodNotAllowed(handler: RouteHandler): void {
    this.methodNotAllowedHandler = handler;
  }

  /**
   * URL'yi normalize eder
   */
  private static normalizeUri(uri: string): string {
    let clean = uri.split('?')[0].trim();
    if (!clean.startsWith('/')) {
      clean = '/' + clean;
    }
    if (clean.length > 1 && clean.endsWith('/')) {
      clean = clean.slice(0, -1);
    }
    return clean;
  }

  /**
   * İsteği Karşıla ve Yönlendir (Dispatch)
   */
  public static dispatch(
    method: string,
    uri: string,
    body?: any,
    query?: Record<string, string>
  ): DispatchResult {
    const startTime = performance.now();
    const upperMethod = method.toUpperCase() as HttpMethod;
    const cleanUri = this.normalizeUri(uri);

    const pipelineSteps: DispatchResult['pipelineSteps'] = [];

    pipelineSteps.push({
      title: 'İstek Karşılandı (Request Received)',
      description: `Gelen İstek: ${upperMethod} ${cleanUri}`,
      status: 'info',
      detail: `Zaman damgası: ${new Date().toLocaleTimeString('tr-TR')}`,
    });

    // 1. Method için tanımlı rotaları ve ANY rotalarını topla
    const methodRoutes = [
      ...(this.routes[upperMethod] || []),
      ...(this.routes.ANY || []),
    ];

    pipelineSteps.push({
      title: 'Metot Filtresi (Method Routing)',
      description: `${upperMethod} için ${methodRoutes.length} adet kayıtlı rota taranıyor`,
      status: 'info',
    });

    let matchedRoute: RouteDefinition | null = null;
    let matchedParams: Record<string, string> = {};
    let rawParams: string[] = [];

    // 2. Rota desenlerini regex ile test et
    for (const route of methodRoutes) {
      const match = cleanUri.match(route.compiledRegex);
      if (match) {
        matchedRoute = route;
        // regex match sonucu parantez gruplarını al (0. eleman full match)
        rawParams = match.slice(1);

        // Parametre isimleriyle eşle
        rawParams.forEach((val, idx) => {
          const name = route.paramNames[idx] || `param_${idx + 1}`;
          matchedParams[name] = decodeURIComponent(val);
        });

        pipelineSteps.push({
          title: 'Regex Eşleşmesi Başarılı (Pattern Match)',
          description: `Rota: ${route.pattern} ➔ Regex: ${route.compiledRegex.toString()}`,
          status: 'success',
          detail: `Yakalanan Parametreler: ${JSON.stringify(matchedParams)}`,
        });
        break;
      }
    }

    // 3. Eğer bu metotla eşleşmediyse, başka bir metotla eşleşiyor mu kontrol et (405 Method Not Allowed)
    if (!matchedRoute) {
      let matchedInOtherMethod: HttpMethod | null = null;
      for (const [m, rList] of Object.entries(this.routes)) {
        if (m === upperMethod || m === 'ANY') continue;
        for (const route of rList) {
          if (cleanUri.match(route.compiledRegex)) {
            matchedInOtherMethod = m as HttpMethod;
            break;
          }
        }
        if (matchedInOtherMethod) break;
      }

      if (matchedInOtherMethod) {
        pipelineSteps.push({
          title: '405 Method Not Allowed (Geçersiz İstek Metodu)',
          description: `İstenen URL (${cleanUri}) ${matchedInOtherMethod} metodu için tanımlı, ancak ${upperMethod} ile çağrıldı.`,
          status: 'error',
        });

        const execTime = performance.now() - startTime;
        return {
          success: false,
          statusCode: 405,
          statusText: 'Method Not Allowed',
          matchedRoute: null,
          params: {},
          rawParams: [],
          handlerType: 'none',
          handlerName: '405 Handler',
          response: {
            error: '405 Method Not Allowed',
            message: `Bu adrese yalnızca ${matchedInOtherMethod} isteği yapılabilir.`,
            uri: cleanUri,
            method: upperMethod,
            allowedMethod: matchedInOtherMethod,
            signature: `Router Architecture by ${Router.AUTHOR}`,
          },
          executionTimeMs: Math.round(execTime * 100) / 100,
          pipelineSteps,
          authorSignature: Router.AUTHOR,
        };
      }

      // 4. Hiçbir rotayla eşleşmedi: 404 Not Found
      pipelineSteps.push({
        title: '404 Not Found (Rota Bulunamadı)',
        description: `İstenen URL (${cleanUri}) ile eşleşen herhangi bir rota deseni bulunamadı.`,
        status: 'warning',
      });

      const execTime = performance.now() - startTime;
      return {
        success: false,
        statusCode: 404,
        statusText: 'Not Found',
        matchedRoute: null,
        params: {},
        rawParams: [],
        handlerType: 'none',
        handlerName: '404 Handler',
        response: {
          error: '404 Not Found',
          message: `Aradığınız rota (${cleanUri}) sistemde kayıtlı değil.`,
          signature: `Router Architecture by ${Router.AUTHOR}`,
        },
        executionTimeMs: Math.round(execTime * 100) / 100,
        pipelineSteps,
        authorSignature: Router.AUTHOR,
      };
    }

    // 5. Rota bulundu, Handler'ı çalıştır
    const requestContext: RequestContext = {
      method: upperMethod,
      uri: cleanUri,
      body,
      query: query || {},
      params: matchedParams,
      rawParams,
      timestamp: new Date().toISOString(),
    };

    let handlerName = '';
    let responseOutput: any = null;
    let statusCode = 200;

    try {
      if (matchedRoute.handlerType === 'callback') {
        handlerName = 'Closure / Callback Fonksiyonu';
        pipelineSteps.push({
          title: 'Callback Çağrısı (Executing Closure)',
          description: 'Rota işleyicisi anonim fonksiyon olarak yürütülüyor.',
          status: 'success',
        });

        const fn = matchedRoute.handler as CallbackHandler;
        responseOutput = fn(matchedParams, requestContext);
      } else {
        // Class@Method çağrımı
        const controllerName = matchedRoute.controllerName!;
        const methodName = matchedRoute.methodName!;
        handlerName = `${controllerName}@${methodName}`;

        pipelineSteps.push({
          title: 'Class@Method Çözümleme (Controller Dispatch)',
          description: `Sınıf: ${controllerName} ➔ Metot: ${methodName}()`,
          status: 'info',
        });

        const controllerInstance = this.controllers.get(controllerName);
        if (!controllerInstance) {
          throw new Error(
            `Controller '${controllerName}' Router havuzunda bulunamadı! 'Router.registerController("${controllerName}", instance)' ile kayıt edilmelidir.`
          );
        }

        if (typeof controllerInstance[methodName] !== 'function') {
          throw new Error(
            `Metot '${methodName}' '${controllerName}' sınıfı içinde mevcut değil!`
          );
        }

        // Metodu çağır: parametreleri ve requestContext'i aktar
        // Parametreleri argüman olarak sırasıyla veya obje olarak geçir
        const methodArgs = [...rawParams, requestContext];
        responseOutput = controllerInstance[methodName](...methodArgs);

        pipelineSteps.push({
          title: 'Metot Yürütüldü (Execution Success)',
          description: `${controllerName}->${methodName}() başarıyla çalıştırıldı ve yanıt üretti.`,
          status: 'success',
        });
      }
    } catch (err: any) {
      statusCode = 500;
      pipelineSteps.push({
        title: '500 Sunucu Hatası (Execution Error)',
        description: err.message || 'Bilinmeyen bir hata oluştu.',
        status: 'error',
      });
      responseOutput = {
        error: '500 Internal Server Error',
        message: err.message,
        trace: err.stack,
        signature: `Router Architecture by ${Router.AUTHOR}`,
      };
    }

    const execTime = performance.now() - startTime;

    return {
      success: statusCode === 200,
      statusCode,
      statusText: statusCode === 200 ? 'OK' : 'Internal Server Error',
      matchedRoute,
      params: matchedParams,
      rawParams,
      handlerType: matchedRoute.handlerType,
      handlerName,
      response: responseOutput,
      executionTimeMs: Math.round(execTime * 100) / 100,
      pipelineSteps,
      authorSignature: Router.AUTHOR,
    };
  }
}
