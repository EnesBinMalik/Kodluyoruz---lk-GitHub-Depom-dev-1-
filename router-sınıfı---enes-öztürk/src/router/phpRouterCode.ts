/**
 * ============================================================================
 * Müşteri Yönetim Sistemi (MYS) - Router Sınıfı (PHP 8.x Standartı)
 * @author Enes Öztürk
 * ============================================================================
 */

export const PHP_ROUTER_CODE = `<?php
declare(strict_types=1);

namespace App\\Core;

/**
 * ============================================================================
 * Müşteri Yönetim Sistemi (MYS) - Gelişmiş Router Mimarisi
 * 
 * Bu sınıf; GET ve POST isteklerini ayrıştıran, dinamik URL'lerde regex ile
 * parametre yakalayan, Anonim Fonksiyon (Callback) ve 'Class@Method'
 * yapılarını çözümleyerek çalıştıran modern bir yönlendiricidir.
 * 
 * @package   App\\Core
 * @author    Enes Öztürk
 * @version   2.4.0
 * @license   MIT
 * ============================================================================
 */
class Router
{
    /**
     * Yazar İmzası
     */
    public const AUTHOR = 'Enes Öztürk';
    public const VERSION = '2.4.0';

    /**
     * HTTP Metotlarına göre gruplanmış rotalar havuzu
     *
     * @var array<string, array<int, array{
     *     pattern: string,
     *     regex: string,
     *     paramNames: array<int, string>,
     *     handler: callable|string,
     *     type: 'callback'|'class_method',
     *     controller?: string,
     *     method?: string
     * }>>
     */
    private static array $routes = [
        'GET'    => [],
        'POST'   => [],
        'PUT'    => [],
        'DELETE' => [],
        'ANY'    => []
    ];

    /**
     * Controller sınıflarının bulunacağı varsayılan ad alanı (namespace)
     */
    private static string $controllerNamespace = 'App\\\\Controllers\\\\';

    /**
     * Özel 404 (Bulunamadı) işleyicisi
     * @var callable|null
     */
    private static $notFoundCallback = null;

    /**
     * Özel 405 (İzin Verilmeyen Metot) işleyicisi
     * @var callable|null
     */
    private static $methodNotAllowedCallback = null;

    /**
     * Controller ad alanını ayarlar
     */
    public static function setNamespace(string $namespace): void
    {
        self::$controllerNamespace = rtrim($namespace, '\\\\') . '\\\\';
    }

    /**
     * Rota deseni regex formatına derlenir ve parametre isimleri ayıklanır.
     * 
     * Desteklenen Biçimler:
     * 1. Doğrudan Regex: /musteri/detay/([0-9]+)
     * 2. İsimlendirilmiş Regex: /musteri/{id:[0-9]+}
     * 3. Basit Parametre: /musteri/:id veya /musteri/{id}
     * 4. Metin Regex: /kategori/{slug:[a-zA-Z0-9_-]+}
     *
     * @param string $pattern
     * @return array{regex: string, paramNames: array<int, string>}
     */
    private static function compilePattern(string $pattern): array
    {
        $normalized = '/' . trim($pattern, '/');
        if ($normalized === '') {
            $normalized = '/';
        }

        $paramNames = [];

        // 1. {id:[0-9]+} formatı
        $converted = preg_replace_callback(
            '/\\{([a-zA-Z0-9_]+):([^}]+)\\}/',
            function ($matches) use (&$paramNames) {
                $paramNames[] = $matches[1];
                return '(' . $matches[2] . ')';
            },
            $normalized
        );

        // 2. {id} formatı
        $converted = preg_replace_callback(
            '/\\{([a-zA-Z0-9_]+)\\}/',
            function ($matches) use (&$paramNames) {
                $paramNames[] = $matches[1];
                return '([^/]+)';
            },
            $converted
        );

        // 3. :id formatı
        $converted = preg_replace_callback(
            '/:([a-zA-Z0-9_]+)/',
            function ($matches) use (&$paramNames) {
                $paramNames[] = $matches[1];
                return '([^/]+)';
            },
            $converted
        );

        // 4. Doğrudan parantez içeren anonim regex grupları: ([0-9]+)
        // Eğer desende '(' varsa ve isim eklenmediyse otomatik adlandır
        $totalCaptures = preg_match_all('/\\((?!\\?:)/', $converted, $m);
        if ($totalCaptures > count($paramNames)) {
            $missing = $totalCaptures - count($paramNames);
            for ($i = 1; $i <= $missing; $i++) {
                $paramNames[] = 'param_' . (count($paramNames) + 1);
            }
        }

        $regex = '#^' . $converted . '$#u';

        return [
            'regex'      => $regex,
            'paramNames' => $paramNames
        ];
    }

    /**
     * Yeni bir rota kaydeder
     *
     * @param string $method HTTP Metodu (GET, POST, PUT, DELETE vb.)
     * @param string $pattern Rota Deseni
     * @param callable|string $handler Callback fonksiyonu veya 'Class@Method' dizesi
     */
    public static function add(string $method, string $pattern, callable|string $handler): void
    {
        $method = strtoupper($method);
        if (!isset(self::$routes[$method])) {
            self::$routes[$method] = [];
        }

        $compiled = self::compilePattern($pattern);

        $route = [
            'pattern'    => $pattern,
            'regex'      => $compiled['regex'],
            'paramNames' => $compiled['paramNames'],
            'handler'    => $handler,
            'type'       => is_string($handler) ? 'class_method' : 'callback'
        ];

        if (is_string($handler)) {
            $parts = explode('@', $handler);
            if (count($parts) === 2) {
                $route['controller'] = trim($parts[0]);
                $route['method']     = trim($parts[1]);
            } else {
                throw new \\InvalidArgumentException(
                    "Geçersiz çağrım formatı! Beklenen format: 'Controller@method'. Verilen: '{$handler}'"
                );
            }
        }

        self::$routes[$method][] = $route;
    }

    /**
     * GET İsteği Tanımlama
     *
     * @param string $pattern Rota Deseni
     * @param callable|string $handler Callback veya 'Controller@method'
     */
    public static function get(string $pattern, callable|string $handler): void
    {
        self::add('GET', $pattern, $handler);
    }

    /**
     * POST İsteği Tanımlama
     *
     * @param string $pattern Rota Deseni
     * @param callable|string $handler Callback veya 'Controller@method'
     */
    public static function post(string $pattern, callable|string $handler): void
    {
        self::add('POST', $pattern, $handler);
    }

    /**
     * PUT İsteği Tanımlama
     */
    public static function put(string $pattern, callable|string $handler): void
    {
        self::add('PUT', $pattern, $handler);
    }

    /**
     * DELETE İsteği Tanımlama
     */
    public static function delete(string $pattern, callable|string $handler): void
    {
        self::add('DELETE', $pattern, $handler);
    }

    /**
     * Tüm HTTP Metotlarına Açık Rota Tanımlama
     */
    public static function any(string $pattern, callable|string $handler): void
    {
        self::add('ANY', $pattern, $handler);
    }

    /**
     * 404 Sayfa Bulunamadı Callback'i
     */
    public static function setNotFound(callable $callback): void
    {
        self::$notFoundCallback = $callback;
    }

    /**
     * 405 İzin Verilmeyen Metot Callback'i
     */
    public static function setMethodNotAllowed(callable $callback): void
    {
        self::$methodNotAllowedCallback = $callback;
    }

    /**
     * Gelen HTTP İsteğini Çözümler ve Uygun Hedefe Yönlendirir (Dispatch)
     *
     * @param string|null $method Özel metot (varsayılan: $_SERVER['REQUEST_METHOD'])
     * @param string|null $uri    Özel URI   (varsayılan: $_SERVER['REQUEST_URI'])
     * @return mixed
     */
    public static function dispatch(?string $method = null, ?string $uri = null): mixed
    {
        $requestMethod = strtoupper($method ?? $_SERVER['REQUEST_METHOD'] ?? 'GET');
        $rawUri        = $uri ?? $_SERVER['REQUEST_URI'] ?? '/';

        // Query string temizliği (örn: /musteri?sayfa=2 -> /musteri)
        $cleanUri = parse_url($rawUri, PHP_URL_PATH) ?? '/';
        $cleanUri = '/' . trim($cleanUri, '/');
        if ($cleanUri === '') {
            $cleanUri = '/';
        }

        // Taranacak rotalar: İlgili metot + ANY rotaları
        $methodRoutes = array_merge(
            self::$routes[$requestMethod] ?? [],
            self::$routes['ANY'] ?? []
        );

        $matchedRoute  = null;
        $matchedParams = [];

        // 1. Regex Desen Eşleştirme
        foreach ($methodRoutes as $route) {
            if (preg_match($route['regex'], $cleanUri, $matches)) {
                $matchedRoute = $route;
                // $matches[0] tam eşleşmedir; yakalanan gruplar 1'den başlar
                $rawParams = array_slice($matches, 1);

                // Parametreleri isimleriyle eşle
                foreach ($rawParams as $idx => $val) {
                    $paramKey = $route['paramNames'][$idx] ?? ('param_' . ($idx + 1));
                    $matchedParams[$paramKey] = urldecode($val);
                }
                break;
            }
        }

        // 2. Metot Eşleşmediyse: Başka bir metotta var mı kontrol et (405 Kontrolü)
        if (!$matchedRoute) {
            $allowedMethods = [];
            foreach (self::$routes as $m => $routes) {
                if ($m === $requestMethod || $m === 'ANY') {
                    continue;
                }
                foreach ($routes as $route) {
                    if (preg_match($route['regex'], $cleanUri)) {
                        $allowedMethods[] = $m;
                        break;
                    }
                }
            }

            if (!empty($allowedMethods)) {
                http_response_code(405);
                header('Allow: ' . implode(', ', array_unique($allowedMethods)));
                header('X-Author: ' . self::AUTHOR);

                if (is_callable(self::$methodNotAllowedCallback)) {
                    return call_user_func(self::$methodNotAllowedCallback, $requestMethod, $cleanUri, $allowedMethods);
                }

                echo json_encode([
                    'status'         => 405,
                    'error'          => 'Method Not Allowed',
                    'message'        => "Bu adrese ({$cleanUri}) {$requestMethod} ile erişilemez.",
                    'allowedMethods' => array_values(array_unique($allowedMethods)),
                    'author'         => self::AUTHOR
                ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                return null;
            }

            // 3. Hiçbir rotada bulunamadı (404)
            http_response_code(404);
            header('X-Author: ' . self::AUTHOR);

            if (is_callable(self::$notFoundCallback)) {
                return call_user_func(self::$notFoundCallback, $cleanUri);
            }

            echo json_encode([
                'status'  => 404,
                'error'   => 'Not Found',
                'message' => "Aradığınız rota ({$cleanUri}) sistemde kayıtlı değil.",
                'author'  => self::AUTHOR
            ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            return null;
        }

        // 4. Hedef İşleyiciyi Çağır
        header('X-Author: ' . self::AUTHOR);

        // Durum A: Callback / Anonim Fonksiyon
        if ($matchedRoute['type'] === 'callback') {
            return call_user_func_array($matchedRoute['handler'], array_values($matchedParams));
        }

        // Durum B: Class@Method Çağrımı
        $controllerShort = $matchedRoute['controller'];
        $methodName      = $matchedRoute['method'];

        // Tam sınıf adını namespace ile oluştur
        $fullClass = str_starts_with($controllerShort, '\\\\')
            ? $controllerShort
            : self::$controllerNamespace . $controllerShort;

        if (!class_exists($fullClass)) {
            throw new \\RuntimeException("Controller Sınıfı Bulunamadı: [{$fullClass}]");
        }

        $controllerInstance = new $fullClass();

        if (!method_exists($controllerInstance, $methodName)) {
            throw new \\BadMethodCallException(
                "Metot Bulunamadı: [{$fullClass}::{$methodName}()]"
            );
        }

        // Metodu parametrelerle çağır
        return call_user_func_array([$controllerInstance, $methodName], array_values($matchedParams));
    }
}
`;

export const PHP_CONTROLLER_EXAMPLE = `<?php
declare(strict_types=1);

namespace App\\Controllers;

/**
 * Müşteri Yönetim Sistemi (MYS) - Müşteri Kontrolcüsü
 * @author Enes Öztürk
 */
class MusteriController
{
    /**
     * Tüm müşterileri listeler
     * Route: GET /musteri
     */
    public function index(): void
    {
        $musteriler = [
            ['id' => 1, 'ad' => 'Ahmet Yılmaz', 'sirket' => 'Yılmaz Lojistik', 'bakiye' => 45200.00],
            ['id' => 2, 'ad' => 'Ayşe Kaya', 'sirket' => 'Kaya Teknoloji', 'bakiye' => 18750.50],
            ['id' => 3, 'ad' => 'Mehmet Demir', 'sirket' => 'Demir İnşaat', 'bakiye' => 92000.00],
        ];

        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'basarili' => true,
            'sayi'     => count($musteriler),
            'veri'     => $musteriler,
            'yoneten'  => \\App\\Core\\Router::AUTHOR
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }

    /**
     * Tekil müşteri detayını gösterir (Regex ile id parametresi)
     * Route: GET /musteri/detay/([0-9]+)
     */
    public function detay(string|int $id): void
    {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'basarili' => true,
            'musteriId'=> (int)$id,
            'bilgi'    => [
                'ad'     => 'Ahmet Yılmaz',
                'sirket' => 'Yılmaz Lojistik A.Ş.',
                'telefon'=> '+90 532 111 2233',
                'durum'  => 'Aktif'
            ],
            'mesaj'    => "ID: {$id} nolu müşteri kaydı başarıyla getirildi.",
            'yazar'    => \\App\\Core\\Router::AUTHOR
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }

    /**
     * Yeni müşteri kaydeder
     * Route: POST /musteri/ekle
     */
    public function ekle(): void
    {
        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

        header('Content-Type: application/json; charset=utf-8');
        http_response_code(201);
        echo json_encode([
            'basarili' => true,
            'mesaj'    => 'Yeni müşteri sisteme başarıyla kaydedildi.',
            'kayitId'  => rand(100, 999),
            'veri'     => $input,
            'yazar'    => \\App\\Core\\Router::AUTHOR
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }

    /**
     * Müşteri günceller
     * Route: POST /musteri/guncelle/([0-9]+)
     */
    public function guncelle(string|int $id): void
    {
        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'basarili' => true,
            'mesaj'    => "ID: {$id} nolu müşteri bilgileri güncellendi.",
            'musteriId'=> (int)$id,
            'guncellenenVeri' => $input,
            'yazar'    => \\App\\Core\\Router::AUTHOR
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }

    /**
     * Müşteri arama (Regex slug/query ile)
     * Route: GET /musteri/ara/([a-zA-Z0-9_-]+)
     */
    public function ara(string $terim): void
    {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'basarili' => true,
            'aramaTerimi' => $terim,
            'sonuclar' => [
                ['id' => 1, 'ad' => 'Ahmet Yılmaz', 'eslesme' => 'Tam'],
            ],
            'yazar'    => \\App\\Core\\Router::AUTHOR
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }
}
`;

export const PHP_ROUTES_EXAMPLE = `<?php
declare(strict_types=1);

require_once __DIR__ . '/vendor/autoload.php';

use App\\Core\\Router;

// Namespace ayarı
Router::setNamespace('App\\\\Controllers');

// ----------------------------------------------------------------------------
// 1. GET Rotaları - Müşteri Yönetim Sistemi
// ----------------------------------------------------------------------------
// Müşteri listesi (Class@Method)
Router::get('/musteri', 'MusteriController@index');

// Regex ile sayısal ID yakalama: ([0-9]+) (Class@Method)
Router::get('/musteri/detay/([0-9]+)', 'MusteriController@detay');

// Regex ile metinsel slug / arama terimi yakalama
Router::get('/musteri/ara/([a-zA-Z0-9_-]+)', 'MusteriController@ara');

// Çoklu Regex Parametresi: Müşterinin faturası (/musteri/:id/fatura/:faturaId)
Router::get('/musteri/{id:[0-9]+}/fatura/{faturaId:[0-9]+}', 'FaturaController@detay');

// Callback Fonksiyonu ile GET Rotası
Router::get('/sistem/durum', function () {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'sistem'   => 'Müşteri Yönetim Sistemi (MYS)',
        'durum'    => 'Aktif / Çalışıyor',
        'surum'    => Router::VERSION,
        'mimari'   => 'Router Engine by ' . Router::AUTHOR,
        'zaman'    => date('Y-m-d H:i:s')
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
});

// ----------------------------------------------------------------------------
// 2. POST Rotaları - Müşteri Yönetim Sistemi
// ----------------------------------------------------------------------------
// Yeni müşteri ekleme (Class@Method)
Router::post('/musteri/ekle', 'MusteriController@ekle');

// Müşteri güncelleme (Regex ID + POST)
Router::post('/musteri/guncelle/([0-9]+)', 'MusteriController@guncelle');

// Callback Fonksiyonu ile POST Rotası
Router::post('/sistem/log', function () {
    $data = json_decode(file_get_contents('php://input'), true);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'kaydedildi' => true,
        'veri'       => $data,
        'onaylayan'  => Router::AUTHOR
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
});

// ----------------------------------------------------------------------------
// 3. İsteği Yönlendir (Dispatch)
// ----------------------------------------------------------------------------
Router::dispatch();
`;
