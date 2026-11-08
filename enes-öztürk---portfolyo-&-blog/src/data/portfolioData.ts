import { Project, Experience, BlogPost, SkillCategory } from '../types';

export const PERSONAL_INFO = {
  name: 'Enes Öztürk',
  title: 'Kıdemli Full-Stack Mühendis & UI Mimarı',
  tagline: 'Modern web ekosisteminde yüksek performanslı, ölçeklenebilir ve estetik dijital ürünler inşa ediyorum.',
  bio: `Yazılım mimarisi, modern ön yüz teknolojileri ve bulut altyapıları üzerine odaklanmış bir yazılım mühendisiyim. 6 yılı aşkın süredir karmaşık sistemleri sezgisel kullanıcı deneyimlerine dönüştüren kurumsal çözümler, SaaS platformları ve tasarım sistemleri geliştiriyorum.`,
  longBio: `Merhaba! Ben Enes Öztürk. Bilgisayar mühendisliği temelimle birlikte, modern web teknolojilerinin sınırlarını keşfetmeyi ve kullanıcıların günlük hayatına değer katan yüksek kaliteli yazılımlar üretmeyi tutkuyla sürdürüyorum.

Kariyerim boyunca fintech platformlarından kurumsal bulut yönetim araçlarına, kapsamlı tasarım sistemlerinden yüksek trafikli e-ticaret altyapılarına kadar geniş bir spektrumda çalıştım. Temiz kod prensipleri, tip güvenliği (TypeScript), modüler bileşen mimarisi ve mikro-servis yaklaşımları çalışma felsefemin temel taşlarını oluşturuyor.

Boş zamanlarımda açık kaynak projelere katkıda bulunuyor, teknik makaleler kaleme alıyor ve yeni nesil web standartlarını inceliyorum.`,
  email: 'enesbino38@gmail.com',
  location: 'İstanbul, Türkiye',
  github: 'https://github.com/enesozturk',
  linkedin: 'https://linkedin.com/in/enesozturk',
  twitter: 'https://x.com/enesozturk',
  portraitImage: '/src/assets/images/enes_portrait_1794152111912.jpg',
  stats: [
    { label: 'Yıl Deneyim', value: '6+' },
    { label: 'Geliştirilen Proje', value: '34+' },
    { label: 'Açık Kaynak Katkısı', value: '18+' },
    { label: 'Uptime Güvenilirliği', value: '%99.98' }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'cloudflow-architect',
    title: 'Stratus Architect: Dağıtık Bulut Yönetim Platformu',
    category: 'system',
    categoryLabel: 'Bulut Mimarisi & SaaS',
    year: '2025',
    summary: 'Mikroservis kümelerini, trafik yönlendirmesini ve sunucu sağlığını tek bir görsel kontrol merkezinden yöneten yüksek hızlı telemetri paneli.',
    description: 'Büyük ölçekli Kubernetes kümelerini gerçek zamanlı izlemek ve otomatik ölçeklendirme politikalarını simüle etmek üzere tasarlanmış kurumsal bulut orkestrasyon arayüzü. Ağ trafiği, bellek kullanımı ve servis bağımlılıkları milisaniye hassasiyetinde haritalandırılır.',
    imageUrl: '/src/assets/images/project_cloudflow_1794152112479.jpg',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Go Microservices'],
    metrics: [
      { label: 'Veri İşleme Hızı', value: '120k olay/sn' },
      { label: 'P99 Yanıt Süresi', value: '18ms' },
      { label: 'Aktif Küme Desteği', value: '250+' }
    ],
    features: [
      'Gerçek zamanlı ağ topolojisi ve canlı küme sağlık grafiği',
      'Otomatik yük devretme (failover) simülasyon araçları',
      'Granüler yetkilendirme ve rol tabanlı erişim kontrolü (RBAC)',
      'Grafana ve Prometheus veri hatlarıyla anlık senkronizasyon'
    ],
    demoUrl: 'https://stratus-architect-demo.dev',
    githubUrl: 'https://github.com/enesozturk/stratus-architect',
    highlights: 'Karmaşık altyapı telemetrisini sıfır gecikmeli Canvas ve WebGL görselleştirmesiyle 60 FPS akıcılıkta sunar.'
  },
  {
    id: 'finanalytics-suite',
    title: 'FinAnalytics: Yeni Nesil Kişisel Finans ve Yatırım Portalı',
    category: 'mobile',
    categoryLabel: 'Fintech & Mobil Web',
    year: '2024',
    summary: 'Gelir-gider akışını, varlık dağılımını ve geleceğe dönük bütçe hedeflerini yapay zeka destekli sezgisel modellerle analiz eden finansal kontrol paneli.',
    description: 'Bireysel ve küçük işletme kullanıcıları için banka API entegrasyonuyla nakit akışını anlık takip eden, harcama anomalilerini tespit eden ve tasarruf hedeflerine ulaşmayı kolaylaştıran modern finans platformu.',
    imageUrl: '/src/assets/images/project_mobileapp_1794152113349.jpg',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Open Banking'],
    metrics: [
      { label: 'Kullanıcı Tasarruf Artışı', value: '%28 Ortalama' },
      { label: 'Lighthouse Performans', value: '99/100' },
      { label: 'İşlenen İşlem Hacmi', value: '₺45M+' }
    ],
    features: [
      'Otomatik harcama kategorizasyonu ve akıllı anomali dedektörü',
      'Portföy risk analizi ve enflasyon düzeltmeli getiri hesaplaması',
      'Mobil dokunmatik ekranlara özel optimize edilmiş akıcı arayüz',
      'Uçtan uca şifrelenmiş yerel veri saklama ve biyometrik oturum'
    ],
    demoUrl: 'https://finanalytics-demo.dev',
    githubUrl: 'https://github.com/enesozturk/finanalytics-app',
    highlights: 'Responsive tasarım ve pürüzsüz grafik animasyonlarıyla finans yönetimini keyifli bir deneyime dönüştürür.'
  },
  {
    id: 'nordic-design-system',
    title: 'Aura UI: Erişilebilir ve Tip Güvenli Tasarım Sistemi',
    category: 'opensource',
    categoryLabel: 'Tasarım Sistemi & Kütüphane',
    year: '2024',
    summary: 'WCAG AAA standartlarına uygun, 50+ headless ve polimorfik React bileşeni içeren açık kaynaklı tasarım sistemi ve dokümantasyon motoru.',
    description: 'Büyük yazılım takımlarında tutarlı, erişilebilir ve marka kimliğini kolayca yansıtan arayüzler inşa etmek için geliştirilmiş modüler bileşen kütüphanesi. Kapsamlı Storybook entegrasyonu ve dinamik tema token desteği sunar.',
    imageUrl: '/src/assets/images/project_designsys_1794152114035.jpg',
    tags: ['React', 'TypeScript', 'Tailwind CSS v4', 'Storybook', 'Radix Primitives'],
    metrics: [
      { label: 'Haftalık İndirme', value: '14.5k+' },
      { label: 'Erişilebilirlik Skoru', value: 'WCAG AAA' },
      { label: 'Bundle Boyutu', value: '<12kb Gzip' }
    ],
    features: [
      '50+ tam erişilebilir klavye kontrollü bileşen seti',
      'Koyu/Açık tema geçişi ve dinamik CSS değişken mimarisi',
      'Katı TypeScript generic tipleriyle hatasız geliştirme deneyimi',
      'Etkileşimli dokümantasyon ve canlı kod önizleme editörü'
    ],
    demoUrl: 'https://aura-ui.dev',
    githubUrl: 'https://github.com/enesozturk/aura-ui-system',
    highlights: 'Yazılım ekiplerinin arayüz geliştirme hızını %40 artıran, test kapsamı %98 olan açık kaynak kütüphane.'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    role: 'Kıdemli Full-Stack Mühendis & Takım Lideri',
    company: 'Nova Digital Solutions',
    location: 'İstanbul (Hibrit)',
    period: '2023 - Günümüz',
    type: 'Tam Zamanlı',
    description: 'Yüksek trafikli kurumsal SaaS ürünlerinin mimari tasarımını yönetiyor, 7 kişilik mühendislik ekibine liderlik ediyorum.',
    achievements: [
      'Mikroservis geçişi ile platform genelindeki yanıt sürelerini ortalama %35 düşürdü.',
      'Şirket içi tasarım sistemini kurarak ürün teslimat döngülerini 4 haftadan 2 haftaya indirdi.',
      'Sıfır kesinti hedefiyle AWS üzerinde CI/CD altyapılarını modernize etti.'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Docker', 'PostgreSQL', 'AWS ECS', 'Redis']
  },
  {
    id: 'exp-2',
    role: 'Frontend Mimarı & Arayüz Uzmanı',
    company: 'Artisan Tech Labs',
    location: 'İstanbul',
    period: '2021 - 2023',
    type: 'Tam Zamanlı',
    description: 'Fintech ve e-ticaret müşterileri için veri odaklı analitik panelleri ve kullanıcı deneyimi optimizasyonları geliştirdi.',
    achievements: [
      'Core Web Vitals skorlarını kırmızıdan 95+ yeşil seviyeye yükselterek organik dönüşüm oranını %22 artırdı.',
      'Büyük ölçekli veri tabloları için sanallaştırılmış liste render mekanizmasını uyguladı.',
      'Junior ve Mid geliştiriciler için haftalık kod inceleme ve mentörlük programı yürüttü.'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'GraphQL', 'Jest']
  },
  {
    id: 'exp-3',
    role: 'Full-Stack Yazılım Geliştirici',
    company: 'Kuantum Yazılım Çözümleri',
    location: 'Ankara',
    period: '2019 - 2021',
    type: 'Tam Zamanlı',
    description: 'B2B CRM ve faturalandırma yazılımlarının hem ön yüzünü hem RESTful servislerini geliştirdi.',
    achievements: [
      '30.000 aktif kullanıcılı sipariş takip modülünü sıfırdan hayata geçirdi.',
      'Veritabanı indeksleme ve sorgu optimizasyonları ile raporlama hızını 4 katına çıkardı.'
    ],
    technologies: ['JavaScript', 'TypeScript', 'Express.js', 'MongoDB', 'Vue.js', 'Git']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Ön Yüz & Kullanıcı Arayüzü',
    description: 'Modern, erişilebilir ve yüksek performanslı kullanıcı arayüzleri inşa etme uzmanlığı.',
    items: [
      { name: 'React 19 & Next.js', level: 96, experience: '6+ yıl' },
      { name: 'TypeScript', level: 94, experience: '5+ yıl' },
      { name: 'Tailwind CSS v4 & CSS Mimarisi', level: 98, experience: '5+ yıl' },
      { name: 'Performans & Core Web Vitals', level: 90, experience: '4+ yıl' },
      { name: 'Erişilebilirlik (a11y / WCAG)', level: 88, experience: '3+ yıl' }
    ]
  },
  {
    title: 'Arka Yüz & Veri Mimarisi',
    description: 'Ölçeklenebilir API servisleri, veritabanı modellemesi ve dağıtık sistemler.',
    items: [
      { name: 'Node.js & Express / NestJS', level: 90, experience: '5+ yıl' },
      { name: 'PostgreSQL & SQL Modelleme', level: 86, experience: '4+ yıl' },
      { name: 'REST & GraphQL API Tasarımı', level: 92, experience: '5+ yıl' },
      { name: 'Redis Caching & Kuyruk Sistemleri', level: 82, experience: '3+ yıl' },
      { name: 'Veri Bütünlüğü & Güvenlik', level: 85, experience: '4+ yıl' }
    ]
  },
  {
    title: 'DevOps & Bulut Araçları',
    description: 'Konteynerleştirme, sürekli entegrasyon ve bulut sağlayıcı yönetimi.',
    items: [
      { name: 'Docker & Konteyner Yönetimi', level: 85, experience: '4+ yıl' },
      { name: 'Git & GitHub Actions CI/CD', level: 92, experience: '6+ yıl' },
      { name: 'AWS (ECS, S3, CloudFront, RDS)', level: 80, experience: '3+ yıl' },
      { name: 'Vite & Modern Build Araçları', level: 95, experience: '4+ yıl' }
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'react-19-server-actions-mimari',
    title: 'Modern Web Mimarisinde React 19 ve Server Actions İncelemesi',
    excerpt: 'React 19 ile hayatımıza giren yeni form kancaları, Server Actions paradigması ve istemci-sunucu sınırının nasıl yeniden tanımlandığı üzerine derinlemesine bir bakış.',
    category: 'Ön Yüz & Mimari',
    date: '15 Ekim 2025',
    readTime: '6 dk okuma',
    coverImage: '/src/assets/images/blog_cover_dev_1794152114217.jpg',
    featured: true,
    tags: ['React', 'Server Actions', 'Web Mimarisi', 'Performans'],
    likesCount: 42,
    content: {
      intro: 'Modern web geliştirme dünyası her birkaç yılda bir büyük bir paradigmik dönüşüm yaşıyor. React 19 ile sunucu ve istemci arasındaki yapay ayrım kalkıyor; veri getirme ve durum mutasyonu tek bir orkestrasyon hattında birleşiyor.',
      sections: [
        {
          heading: '1. useActionState ve Form Yönetiminin Sadeleşmesi',
          text: 'Geçmişte bir formu yönetmek için useState, useTransition, hata durumları ve yükleniyor bayrakları gibi onlarca değişken tanımlamak zorundaydık. React 19 ile gelen useActionState kancası bu süreci tek satırda çözüyor.',
          codeSnippet: {
            language: 'tsx',
            code: `// React 19 ile temiz form yönetimi
import { useActionState } from 'react';

async function updateProfile(prevState: State, formData: FormData) {
  const username = formData.get('username') as string;
  const res = await api.updateUser({ username });
  return res.success ? { error: null, ok: true } : { error: res.message, ok: false };
}

export function ProfileForm() {
  const [state, formAction, isPending] = useActionState(updateProfile, { error: null, ok: false });

  return (
    <form action={formAction} className="space-y-4">
      <input name="username" placeholder="Kullanıcı Adı" disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Kaydediliyor...' : 'Kaydet'}
      </button>
      {state.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}`
          },
          quote: 'En iyi soyutlama, geliştiricinin düşünce hızını kodla eşitleyen soyutlamadır.'
        },
        {
          heading: '2. İstemci Bundle Boyutlarının Dramatik Azalması',
          text: 'Server Actions ve Sunucu Bileşenleri sayesinde, yalnızca sunucuda çalışması gereken ağır kütüphaneler (örneğin markdown derleyicileri, tarih formatlayıcılar veya karmaşık doğrulama şemaları) istemcinin tarayıcısına hiç gönderilmez. Bu da başlangıç JavaScript yükünü %40 ila %60 arasında azaltır.'
        },
        {
          heading: '3. Optimistik Güncellemeler (useOptimistic)',
          text: 'Kullanıcının sunucu yanıtını beklemeden UI durumunu hemen güncellemesi modern kullanıcı deneyiminin vazgeçilmezidir. useOptimistic kancası, ağ gecikmesini kullanıcıdan tamamen gizlerken olası bir hata durumunda temiz bir geri alma (rollback) mekanizması sunar.'
        }
      ],
      conclusion: 'React 19, web uygulamalarını sadece daha hızlı kılmakla kalmıyor; kod tabanlarımızı daha öngörülebilir ve bakımı kolay hale getiriyor. Ekibinizle bir sonraki projeye başlarken bu pratikleri erken benimsemek büyük avantaj sağlayacaktır.'
    }
  },
  {
    id: 'post-2',
    slug: 'typescript-tip-guvenli-api-tasarimi',
    title: 'TypeScript ile Tip Güvenli ve Ölçeklenebilir API Mimarisi',
    excerpt: 'Zod doğrulama kütüphanesi, katı generic tipler ve uçtan uca tip paylaşımı ile çalışma zamanı hatalarını sıfıra indirme stratejileri.',
    category: 'TypeScript & Arka Yüz',
    date: '28 Eylül 2025',
    readTime: '8 dk okuma',
    coverImage: '/src/assets/images/project_cloudflow_1794152112479.jpg',
    featured: true,
    tags: ['TypeScript', 'API', 'Zod', 'Clean Code'],
    likesCount: 38,
    content: {
      intro: 'Büyük ölçekli yazılım projelerinde yaşanan hataların %80\'i sistem sınırlarında, yani harici API\'lerden gelen verilerin varsayılan tiplerle uyuşmamasından kaynaklanır. TypeScript ve Zod ikilisi bu sorunu kökten çözer.',
      sections: [
        {
          heading: '1. Tip Güvencesini Çalışma Zamanına Taşımak',
          text: 'TypeScript tipleri derleme zamanında kaybolur. Bu nedenle yalnızca "interface" tanımlamak harici kaynaklardan gelen verileri korumaya yetmez. Çalışma zamanında doğrulama yapan şemalar ile statik tipleri tek bir doğruluk kaynağından üretmeliyiz.',
          codeSnippet: {
            language: 'ts',
            code: `import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(['admin', 'member', 'guest']),
  createdAt: z.string().datetime()
});

// Zod şemasından doğrudan TypeScript tipi türetme
export type User = z.infer<typeof UserSchema>;

export async function fetchUserSafe(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  const rawData = await response.json();
  return UserSchema.parse(rawData); // Hatalıysa hemen yakalanır!
}`
          }
        },
        {
          heading: '2. Katı Tip Ayrımı ve Domain-Driven Yaklaşım',
          text: 'DTO (Data Transfer Object) ve domain varlıkları arasında net bir sınır koymak, arka uçta yapılan bir veritabanı sütun değişikliğinin tüm ön yüzü aniden çökertmesini engeller.'
        }
      ],
      conclusion: 'Tip güvenliğine yapılan başlangıç yatırımı, gelecekteki saatler süren hata ayıklama seanslarını tamamen ortadan kaldırır. Sağlam bir temel her zaman daha hızlı geliştirme sağlar.'
    }
  },
  {
    id: 'post-3',
    slug: 'tailwind-css-v4-sifir-konfigurasyon',
    title: 'Tailwind CSS v4 ile Yeni Dönem: Yüksek Hız ve Modern Değişkenler',
    excerpt: 'Tailwind CSS v4 motorunun getirdiği köklü mimari değişiklikler, lightningcss entegrasyonu ve CSS-first yapılandırma modelinin sunduğu avantajlar.',
    category: 'CSS & Tasarım',
    date: '12 Ağustos 2025',
    readTime: '5 dk okuma',
    coverImage: '/src/assets/images/project_designsys_1794152114035.jpg',
    featured: false,
    tags: ['Tailwind CSS', 'CSS', 'Performans', 'Frontend'],
    likesCount: 29,
    content: {
      intro: 'Tailwind CSS v4, geleneksel tailwind.config.js dosyasını ortadan kaldırarak saf CSS değişkenleri ve @theme direktifi üzerine kurulu yepyeni bir derleme motoruyla sahneye çıktı.',
      sections: [
        {
          heading: '1. JavaScript Yapılandırmasından Doğrudan CSS Direktiflerine',
          text: 'Artık temanızı JavaScript dosyası yerine standart CSS dosyanızda @theme bloğu içinde tanımlıyorsunuz. Bu, modern tarayıcı standartlarıyla tam uyum ve anında derleme hızı sunuyor.',
          codeSnippet: {
            language: 'css',
            code: `@import "tailwindcss";

@theme {
  --color-primary: #0F172A;
  --color-accent: #2563EB;
  --font-display: 'Outfit', sans-serif;
}`
          }
        },
        {
          heading: '2. Derleme Sürelerinde 10 Kat Hızlanma',
          text: 'Rust tabanlı Lightning CSS motorunun entegre edilmesiyle, büyük projelerde yüzbinlerce sınıfın taranıp derlenmesi milisaniyeler seviyesine indi. Geliştirici ortamında sıcak yeniden yükleme (HMR) neredeyse algılanamaz hale geldi.'
        }
      ],
      conclusion: 'Web platformu geliştikçe araçlarımız da daha hafif, daha standart ve daha hızlı hale geliyor. Tailwind v4 bu evrimin en başarılı örneklerinden biri.'
    }
  },
  {
    id: 'post-4',
    slug: 'yuksek-trafikli-sistemlerde-onbellekleme',
    title: 'Yüksek Trafikli Uygulamalarda Çok Katmanlı Önbellekleme',
    excerpt: 'CDN kenar önbelleği, Redis katmanı ve bellek içi yerel önbellek stratejileri ile veritabanı yükünü %90 azaltmanın pratik yolları.',
    category: 'Bulut & DevOps',
    date: '02 Temmuz 2025',
    readTime: '7 dk okuma',
    coverImage: '/src/assets/images/project_mobileapp_1794152113349.jpg',
    featured: false,
    tags: ['Redis', 'CDN', 'Mimari', 'Performans'],
    likesCount: 31,
    content: {
      intro: 'En hızlı veritabanı sorgusu, hiç yapılmayan sorgudur. Milyonlarca isteği karşılayan sistemlerde önbellekleme bir lüks değil, hayatta kalma kuralıdır.',
      sections: [
        {
          heading: '1. Üç Katmanlı Savunma Hattı',
          text: 'Önbellekleme stratejisi tek bir noktada kurulmaz. İlk katmanda Cloudflare veya CloudFront gibi küresel kenar (Edge) CDN önbelleği, ikinci katmanda Redis gibi dağıtık RAM anahtar-değer deposu, üçüncü katmanda ise servis içi bellek (in-memory) yer alır.'
        },
        {
          heading: '2. Cache Invalidation: Bilgisayar Bilimlerinin Zor Problemi',
          text: 'Zaman aşımı (TTL) bazlı temizlemenin yanı sıra etiket tabanlı (tag-based) geçersiz kılma mekanizmaları kurarak sadece değişen verinin önbellekten düşmesini sağlamak kritik öneme sahiptir.'
        }
      ],
      conclusion: 'Doğru kurulmuş bir önbellek mimarisi, sunucu maliyetlerinizi düşürürken kullanıcılarınıza milisaniye düzeyinde ışık hızında bir deneyim yaşatır.'
    }
  }
];

export const INITIAL_COMMENTS: Record<string, { id: string; author: string; date: string; content: string }[]> = {
  'post-1': [
    {
      id: 'c1',
      author: 'Kerem Arslan',
      date: '16 Ekim 2025',
      content: 'Harika bir özet olmuş Enes! useActionState ile formlarda state şişkinliğinden kurtulmak gerçekten büyük rahatlık.'
    },
    {
      id: 'c2',
      author: 'Selin Yıldız',
      date: '17 Ekim 2025',
      content: 'Server Actions ve optimistik güncellemeleri birlikte kullanırken hata yakalama örneğini de detaylandırdığın için teşekkürler.'
    }
  ],
  'post-2': [
    {
      id: 'c3',
      author: 'Murat Kaya',
      date: '30 Eylül 2025',
      content: 'Zod infer ile tipleri türetmek ekip içinde veri tipi uyumsuzluğu kaynaklı tüm runtime buglarını bitirdi.'
    }
  ]
};
