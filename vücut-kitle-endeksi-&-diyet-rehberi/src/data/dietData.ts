import { CategoryDietPlan } from '../types/bmi';

export const CATEGORY_DIET_PLANS: Record<string, CategoryDietPlan> = {
  underweight: {
    categoryKey: 'underweight',
    title: 'Sağlıklı Kilo Alma & Kas Kazanımı Beslenme Programı',
    subtitle: 'Besin yoğunluğu yüksek, kaliteli protein ve kompleks karbonhidratlarla zenginleştirilmiş beslenme planı.',
    dailyCalorieRange: '2.400 - 2.800 kcal (Hafif Kalori Fazlası)',
    waterFormulaPerKg: 35, // 35 ml per kg
    macronutrientRatio: {
      protein: 25,
      carbs: 50,
      fat: 25,
    },
    principles: [
      'Günde 3 ana öğün ve 3 besleyici ara öğün ile düzenli kalori akışı sağlayın.',
      'Boş kalori ve abur cubur yerine; ceviz, fındık, zeytinyağı, fıstık ezmesi gibi sağlıklı yağları tercih edin.',
      'Yemeklerle birlikte sıvı tüketmeyin, yemeklerden 30 dakika önce veya sonra su için (mide kapasitesini korumak için).',
      'Haftada 3-4 gün direnç ve ağırlık egzersizleri yaparak alınan kalorilerin kas kütlesine dönüşmesini sağlayın.',
      'Uyumadan 1-1.5 saat önce protein ve sağlıklı yağ içeren bir gece ara öğünü ekleyin.'
    ],
    sampleDays: [
      {
        dayName: '1. Gün - Enerji & Güç Başlangıcı',
        focus: 'Yüksek proteinli kahvaltı ve fındıklı ara öğünler',
        targetCalories: 2500,
        meals: [
          {
            mealTime: '08:00 - 08:30',
            mealName: 'Zengin Kahvaltı',
            description: '3 yumurtalı bol peynirli ve zeytinyağlı omlet, 2 dilim tam buğday ekmeği, 5-6 adet zeytin, 1 yemek kaşığı tahin-pekmez veya fıstık ezmesi, domates, salatalık.',
            caloriesEstimate: 620,
            options: ['Omlet yerine 2 adet haşlanmış yumurta + 1 avokado + 60g beyaz peynir'],
            tips: 'Zeytinyağını omletin üzerine çiğ olarak da gezdirebilirsiniz.'
          },
          {
            mealTime: '10:30 - 11:00',
            mealName: '1. Ara Öğün (Smoothie)',
            description: '1 bardak tam yağlı süt, 1 adet muz, 2 tatlı kaşığı doğal fıstık ezmesi, 1 yemek kaşığı yulaf ezmesi ve 1 çay kaşığı bal ile hazırlanan enerji smoothie.',
            caloriesEstimate: 380,
            options: ['1 kase süzme yoğurt + 1 avuç ceviz içi + 3 adet kuru incir'],
          },
          {
            mealTime: '13:00 - 13:45',
            mealName: 'Doyurucu Öğle Yemeği',
            description: '180g ızgara tavuk göğsü veya bonfile, 1.5 porsiyon tereyağlı bulgur pilavı, 1 kase mercimek çorbası, zeytinyağlı mevsim salatası.',
            caloriesEstimate: 680,
            options: ['Fırında somon balığı + fırınlanmış patates dilimleri + bol yeşillikli salata'],
          },
          {
            mealTime: '16:30 - 17:00',
            mealName: '2. Ara Öğün',
            description: '1 avuç kavrulmamış çiğ badem ve kaju, 3 adet hurma, 1 dilim kaşar peyniri.',
            caloriesEstimate: 290,
            options: ['Tost (çift kaşarlı tam tahıllı ekmek) + 1 bardak ayran'],
          },
          {
            mealTime: '19:30 - 20:15',
            mealName: 'Akşam Yemeği',
            description: '1 tabak kıymalı sebze yemeği (veya etli nohut/kuru fasulye), 1 porsiyon pirinç veya karabuğday pilavı, 1 kase tam yağlı ev yoğurdu.',
            caloriesEstimate: 620,
            options: ['Ev yapımı ızgara köfte (5-6 adet) + fırın sebzeler + yayla çorbası'],
          },
          {
            mealTime: '22:00 - 22:30',
            mealName: 'Gece Ara Öğünü',
            description: '1 bardak ılık süt, 2 adet ceviz, 1 tatlı kaşığı bal ve bir tutam tarçın.',
            caloriesEstimate: 200,
            options: ['3 kaşık kefir + 1 tatlı kaşığı chia tohumu'],
          }
        ]
      },
      {
        dayName: '2. Gün - Kompleks Karbonhidrat & Sağlıklı Yağlar',
        focus: 'Kuru baklagiller, kuruyemişler ve taze meyveler',
        targetCalories: 2600,
        meals: [
          {
            mealTime: '08:00 - 08:30',
            mealName: 'Kahvaltı',
            description: 'Bol sütlü ve muzlu yulaf lapası (üzerine 1 avuç ceviz, 1 kaşık fındık ezmesi ve chia tohumu), yanında 2 adet haşlanmış yumurta.',
            caloriesEstimate: 650,
            options: ['Geleneksel menemen (bol tereyağlı) + 2 dilim ekşi mayalı ekmek + tulum peyniri'],
          },
          {
            mealTime: '10:45 - 11:15',
            mealName: '1. Ara Öğün',
            description: '1 kase meyveli süzme yoğurt + 2 kuru kayısı + 10 adet badem.',
            caloriesEstimate: 310,
            options: ['1 adet muz + 1 yemek kaşığı fıstık ezmesi'],
          },
          {
            mealTime: '13:00 - 13:45',
            mealName: 'Öğle Yemeği',
            description: '1 porsiyon etli kuru fasulye, bol tereyağlı pirinç pilavı, turşu veya çoban salata, 1 bardak koyu ayran.',
            caloriesEstimate: 720,
            options: ['Etli güveç + bulgur pilavı + cacık'],
          },
          {
            mealTime: '16:30 - 17:00',
            mealName: '2. Ara Öğün',
            description: 'Avokadolu ve beyaz peynirli tam tahıl sandviç, 1 bardak taze sıkılmış portakal suyu.',
            caloriesEstimate: 360,
            options: ['Kuru meyve & çiğ kuruyemiş karışımı (60g)'],
          },
          {
            mealTime: '19:30 - 20:15',
            mealName: 'Akşam Yemeği',
            description: 'Fırında levrek veya çipura, fırın patates, zeytinyağlı roka salatası, 1 dilim mısır ekmeği.',
            caloriesEstimate: 590,
            options: ['Tavuk sote + makarna + mevsim salatası'],
          },
          {
            mealTime: '22:00 - 22:30',
            mealName: 'Gece Öğünü',
            description: '1 kase ev yoğurdu içine 1 tatlı kaşığı pekmez ve 3 adet ezilmiş ceviz.',
            caloriesEstimate: 210,
            options: ['1 bardak badem sütü + 2 adet yulaflı kurabiye'],
          }
        ]
      }
    ],
    healthySwaps: [
      { avoid: 'Şekerli gazlı içecekler', prefer: 'Ev yapımı ballı fındıklı muzlu smoothie', reason: 'Boş şeker yerine kas gelişimini destekleyen kaliteli kalori sağlar.' },
      { avoid: 'Düşük yağlı / light ürünler', prefer: 'Tam yağlı peynir, yoğurt ve doğal süt', reason: 'Doyurucu sağlıklı yağlar ve yağda eriyen vitaminlerin emilimini artırır.' },
      { avoid: 'Öğün atlamak', prefer: 'Zamanında tüketilen mini besleyici atıştırmalıklar', reason: 'Metabolizmanın katabolik (kas yıkımı) faza geçmesini engeller.' }
    ],
    recommendedDrinks: ['Ev yapımı proteinli muz smoothie', 'Tam yağlı kefir', 'Taze sıkılmış havuç-portakal suyu', 'Papatya ve ıhlamur çayı'],
    lifestyleAdvice: [
      'Haftada 3 gün bileşik hareketler (squat, deadlift, şınav, bench press) ile kas hipertrofisi hedefleyin.',
      'Günde en az 7.5 - 8 saat kaliteli uyuyun; büyüme hormonu uykuda salgılanır.',
      'Haftalık kilo tartımınızı aynı gün, sabah aç karnına yapın. Haftalık 250-500 gram artış idealdir.'
    ]
  },

  normal: {
    categoryKey: 'normal',
    title: 'Dengeli Akdeniz Tipi Form Koruma & Zindelik Programı',
    subtitle: 'Vücut kitle endeksinizi koruyan, metabolik zindeliği ve hücresel yenilenmeyi destekleyen dengeli beslenme.',
    dailyCalorieRange: '1.900 - 2.200 kcal (Form Koruma)',
    waterFormulaPerKg: 33,
    macronutrientRatio: {
      protein: 25,
      carbs: 45,
      fat: 30,
    },
    principles: [
      'Gökkuşağı tabağı kuralı: Her gün farklı renklerde sebze ve meyve tüketerek antioksidan çeşitliliği sağlayın.',
      'Zeytinyağı, ceviz, keten tohumu gibi kalp dostu doymamış yağ asitlerine ağırlık verin.',
      'Haftada en az 2 gün balık (özellikle omega-3 zengini yağlı balıklar) tüketin.',
      'Günlük en az 8.000 - 10.000 adım ile aktif kalın.',
      'Akşam yemeklerini saat 20:00 sonrasına bırakmamaya özen gösterin.'
    ],
    sampleDays: [
      {
        dayName: '1. Gün - Klasik Akdeniz Dengesi',
        focus: 'Zeytinyağlılar, taze yeşillikler ve kaliteli protein',
        targetCalories: 2050,
        meals: [
          {
            mealTime: '08:00 - 08:30',
            mealName: 'Kahvaltı',
            description: '2 adet haşlanmış organik yumurta, 50g az tuzlu lor veya beyaz peynir, 5 adet kırma yeşil zeytin, bol maydanoz, nane, domates, salatalık, 2 dilim ekşi mayalı siyez ekmeği.',
            caloriesEstimate: 460,
            options: ['Sebzeli mantarlı omlet + 1 dilim çavdar ekmeği + yeşillikler'],
          },
          {
            mealTime: '11:00 - 11:30',
            mealName: '1. Ara Öğün',
            description: '1 adet taze yeşil elma veya armut, 8-10 adet kavrulmamış badem, 1 fincan yeşil çay.',
            caloriesEstimate: 180,
            options: ['1 fincan filtre kahve + 2 adet ceviz içi'],
          },
          {
            mealTime: '13:00 - 13:45',
            mealName: 'Öğle Yemeği',
            description: '150g ızgara tavuk fileto veya hindi, 4 yemek kaşığı kinoalı veya karabuğdaylı sebze salatası, 1 kase cacık.',
            caloriesEstimate: 540,
            options: ['1 kase mercimek çorbası + zeytinyağlı enginar/taze fasulye + yoğurt'],
          },
          {
            mealTime: '16:30 - 17:00',
            mealName: '2. Ara Öğün',
            description: '1 kase probiyotik yoğurt içine 1 tatlı kaşığı chia tohumu ve birkaç taze yaban mersini.',
            caloriesEstimate: 160,
            options: ['1 bardak ayran + 2 adet kepekli galeta'],
          },
          {
            mealTime: '19:30 - 20:15',
            mealName: 'Akşam Yemeği',
            description: 'Fırında sebzeli çipura veya levrek, yanında zeytinyağlı ve limonlu bol roka salatası, 1 dilim tam buğday ekmeği.',
            caloriesEstimate: 520,
            options: ['1 tabak zeytinyağlı barbunya + mevsim salatası + 1 dilim ekmek'],
          },
          {
            mealTime: '21:30 - 22:00',
            mealName: 'Gece Dinlenme',
            description: '1 fincan melisa veya papatya çayı, 1-2 dilim limon ile.',
            caloriesEstimate: 20,
            options: ['Ilık rezene çayı'],
          }
        ]
      },
      {
        dayName: '2. Gün - Bitkisel Protein & Lif Günü',
        focus: 'Kuru baklagiller ve sindirim dostu lifler',
        targetCalories: 2000,
        meals: [
          {
            mealTime: '08:00 - 08:30',
            mealName: 'Kahvaltı',
            description: 'Yulaf ezmesi (4 kaşık), 1 bardak badem sütü veya inek sütü, yarım muz, 1 çay kaşığı tarçın, 1 tatlı kaşığı keten tohumu ve 3 adet ceviz.',
            caloriesEstimate: 430,
            options: ['2 göz yumurta + 1 dilim peynir + çeri domatesler + tam tahıl ekmeği'],
          },
          {
            mealTime: '11:00 - 11:30',
            mealName: '1. Ara Öğün',
            description: '1 fincan sade Türk kahvesi + 2 kare bitter çikolata (%70 üzeri).',
            caloriesEstimate: 120,
            options: ['1 adet mandalina veya portakal + 6 adet fındık'],
          },
          {
            mealTime: '13:00 - 13:45',
            mealName: 'Öğle Yemeği',
            description: '1 büyük tabak nohutlu Akdeniz salatası (haşlanmış nohut, nar ekşisi, zeytinyağı, ceviz, tulum peyniri), 1 bardak maden suyu.',
            caloriesEstimate: 510,
            options: ['1 tabak etli sebze yemeği + 3 kaşık bulgur pilavı + ayran'],
          },
          {
            mealTime: '16:30 - 17:00',
            mealName: '2. Ara Öğün',
            description: '1 dilim beyaz peynir + 2 adet wasa veya tam tahıllı kraker + söğüş salatalık.',
            caloriesEstimate: 170,
            options: ['1 kase kefir + 1 tatlı kaşığı kabak çekirdeği'],
          },
          {
            mealTime: '19:30 - 20:15',
            mealName: 'Akşam Yemeği',
            description: '150g ızgara dana köfte (ekmeksiz, baharatlı), fırında ızgara kabak ve biber, 1 kase ev yoğurdu.',
            caloriesEstimate: 560,
            options: ['Fırında tavuk but (derisiz) + közlenmiş sebzeler + çoban salata'],
          },
          {
            mealTime: '21:30 - 22:00',
            mealName: 'Gece',
            description: 'Rezene veya ıhlamur çayı.',
            caloriesEstimate: 10,
            options: ['Tarçınlı ılık su'],
          }
        ]
      }
    ],
    healthySwaps: [
      { avoid: 'Rafine ayçiçek/mısır yağı', prefer: 'Soğuk sıkım sızma zeytinyağı', reason: 'Güçlü polifenoller ve kalp sağlığını koruyan tekli doymamış yağlar içerir.' },
      { avoid: 'Paketli bisküvi / gofret', prefer: 'Çiğ kuruyemiş + 1 taze meyve', reason: 'Kan şekerini dengede tutar ve ani acıkma krizlerini önler.' },
      { avoid: 'Beyaz ekmek ve beyaz pirinç', prefer: 'Ekşi mayalı tam çavdar/siyez ve bulgur', reason: 'Daha yüksek lif ve B vitamini içeriği sağlar.' }
    ],
    recommendedDrinks: ['Doğal mineralli maden suyu (limonlu)', 'Yeşil çay ve beyaz çay', 'Sade Türk kahvesi / filtre kahve', 'Ev yapımı probiyotik kefir'],
    lifestyleAdvice: [
      'Günde 2-2.5 litre su tüketimini ihmal etmeyin.',
      'Haftada 150 dakika orta tempolu kardiyo (hızlı yürüyüş, yüzme, bisiklet) kalp sağlığını zirvede tutar.',
      'Yılda bir kez rutin tam kan sayımı, D vitamini ve tiroit kontrollerinizi yaptırın.'
    ]
  },

  overweight: {
    categoryKey: 'overweight',
    title: 'Hafif Kalori Açıklı Yağ Yakıcı Beslenme Planı',
    subtitle: 'Kas kütlesini koruyarak vücut yağ oranını azaltmayı ve ideal kiloya inmeyi hedefleyen program.',
    dailyCalorieRange: '1.550 - 1.800 kcal (Kontrollü Açık)',
    waterFormulaPerKg: 35,
    macronutrientRatio: {
      protein: 30,
      carbs: 40,
      fat: 30,
    },
    principles: [
      'Günlük 400-500 kalorilik sağlıklı açık oluşturarak haftada 0.5 - 1 kg güvenli yağ kaybı sağlayın.',
      'Glisemik indeksi düşük besinler tüketerek insülin dalgalanmalarını ve tatlı krizlerini engelleyin.',
      'Öğünlerde tabağın yarısını çiğ veya buharda pişmiş yeşil lifli sebzelerle doldurun.',
      'Akşam 19:30’dan sonra meyve dahil kalorili besin tüketimini sonlandırın.',
      'Günde en az 8.000 - 10.000 adım atarak metabolik harcamayı destekleyin.'
    ],
    sampleDays: [
      {
        dayName: '1. Gün - İnsülin Dengesi & Yağ Yakımı',
        focus: 'Yüksek proteinli başlangıç ve düşük glisemik indeks',
        targetCalories: 1650,
        meals: [
          {
            mealTime: '08:00 - 08:30',
            mealName: 'Protein Dolu Kahvaltı',
            description: '2 adet yumurtadan bol maydanozlu ve lor peynirli omlet, 5 adet tuzsuz zeytin, bol roka, salatalık, domates, 1 ince dilim ekşi mayalı çavdar ekmeği.',
            caloriesEstimate: 390,
            options: ['2 adet haşlanmış yumurta + 40g az yağlı peynir + 2 ceviz + bol yeşillik'],
            tips: 'Tuz yerine kekik, pul biber ve çörek otu serpiştirin.'
          },
          {
            mealTime: '11:00 - 11:30',
            mealName: '1. Ara Öğün',
            description: '1 fincan sade yeşil çay (limonlu) + 2 tam ceviz içi.',
            caloriesEstimate: 110,
            options: ['1 fincan sade filtre kahve + 6 adet çiğ badem'],
          },
          {
            mealTime: '13:00 - 13:45',
            mealName: 'Öğle Yemeği',
            description: '150g ızgara tavuk göğsü veya hindi bonfile, bol limonlu ve 1 tatlı kaşığı zeytinyağlı yeşil salata, 3 yemek kaşığı haşlanmış karabuğday veya bulgur.',
            caloriesEstimate: 430,
            options: ['1 tabak zeytinyağlı kabak/ıspanak yemeği + 1 kase yoğurt + 1 dilim çavdar ekmeği'],
          },
          {
            mealTime: '16:30 - 17:00',
            mealName: '2. Ara Öğün',
            description: '1 su bardağı probiyotik az yağlı kefir veya 3 kaşık yoğurt + 1 tatlı kaşığı chia tohumu + toz tarçın.',
            caloriesEstimate: 130,
            options: ['1 adet yeşil elma + 1 bardak tarçınlı ılık su'],
          },
          {
            mealTime: '19:00 - 19:45',
            mealName: 'Hafif Akşam Yemeği',
            description: '1 tabak zeytinyağlı taze fasulye veya brokoli/karnabahar yemeği, 1 kase naneli ve salatalıklı cacık, 1 dilim tam buğday ekmeği.',
            caloriesEstimate: 410,
            options: ['160g ızgara balık + fırında ızgara kabak + roka salatası'],
          },
          {
            mealTime: '21:00 - 21:30',
            mealName: 'Gece Bitki Çayı',
            description: 'Papatya veya rezene çayı (şekersiz).',
            caloriesEstimate: 10,
            options: ['Zencefil & limon dilimli ılık su'],
          }
        ]
      },
      {
        dayName: '2. Gün - Lif Bombası & Ödem Atıcı Menü',
        focus: 'Ödem atıcı sebzeler ve kaliteli hafif proteinler',
        targetCalories: 1600,
        meals: [
          {
            mealTime: '08:00 - 08:30',
            mealName: 'Kahvaltı',
            description: '3 yemek kaşığı yulaf ezmesi, 1 su bardağı laktozsuz/badem sütü, yarım yeşil elma rendesi ve bol tarçın ile pişirilmiş yulaf lapası + yanında 1 haşlanmış yumurta.',
            caloriesEstimate: 380,
            options: ['Klasik Türk kahvaltısı: 1 yumurta, 30g lor peyniri, söğüş, 1 dilim kepek ekmeği'],
          },
          {
            mealTime: '11:00 - 11:30',
            mealName: '1. Ara Öğün',
            description: '1 fincan beyaz çay veya mate çayı + 10 adet çiğ kabak çekirdeği.',
            caloriesEstimate: 90,
            options: ['Sade maden suyu içine taze nane ve limon dilimleri'],
          },
          {
            mealTime: '13:00 - 13:45',
            mealName: 'Öğle Yemeği',
            description: '1 kase mercimek veya ezogelin çorbası (kremasız), 1 tabak zeytinyağlı enginar veya pırasa, 1 kase yoğurt.',
            caloriesEstimate: 420,
            options: ['Ton balıklı yeşil salata (yağı süzülmüş 120g ton balığı + 1 tatlı kaşığı zeytinyağı)'],
          },
          {
            mealTime: '16:30 - 17:00',
            mealName: '2. Ara Öğün',
            description: '1 dilim beyaz peynir + 2 adet kepekli etimek veya wasa + bol söğüş salatalık.',
            caloriesEstimate: 150,
            options: ['1 kase yoğurt + 1 çay kaşığı çörek otu'],
          },
          {
            mealTime: '19:00 - 19:45',
            mealName: 'Akşam Yemeği',
            description: '150g fırında yağsız kıymadan hazırlanmış ızgara köfte, közlenmiş patlıcan & biber salatası, 1 kase ayran.',
            caloriesEstimate: 450,
            options: ['Izgara hindi göğüs + mantar sote + yeşil salata'],
          },
          {
            mealTime: '21:00 - 21:30',
            mealName: 'Gece',
            description: '1 fincan melisa çayı.',
            caloriesEstimate: 10,
            options: ['Ihlamur çayı'],
          }
        ]
      }
    ],
    healthySwaps: [
      { avoid: 'Şekerli meyve suları ve kolalar', prefer: 'Limonlu ve naneli doğal maden suyu', reason: 'Günde 200-300 gizli kaloriden ve insülin sıçramasından korur.' },
      { avoid: 'Mayonez ve krema bazlı soslar', prefer: 'Hardal, limon suyu ve sızma zeytinyağı', reason: 'Gereksiz doymuş yağ yükünü sıfıra indirir.' },
      { avoid: 'Kızartma ve kavurmalar', prefer: 'Fırınlama, ızgara veya haşlama', reason: 'Kalori yoğunluğunu yarı yarıya düşürür ve sindirimi rahatlatır.' }
    ],
    recommendedDrinks: ['Ödem atıcı yeşil çay (limonlu)', 'Zencefil ve nane demlenmiş su', 'Sade filtre kahve (metabolizma canlandırıcı)', 'Tuzsuz doğal maden suyu'],
    lifestyleAdvice: [
      'Günde en az 2.5 - 3 litre su için; su tüketimi yağ yakım sürecinin vazgeçilmez katalizörüdür.',
      'Yemekleri yavaş yiyin ve her lokmayı en az 15-20 kez çiğneyin (doyma sinyali beyne 20 dakikada ulaşır).',
      'Akşam yemeğinden sonra 20-30 dakikalık hafif tempo yürüyüş kan şekeri tepe noktasını düşürür.'
    ]
  },

  obese1: {
    categoryKey: 'obese1',
    title: 'Metabolik Restorasyon & Güvenli Yağ Kaybı Programı',
    subtitle: 'İnsülin direncini kırmaya, iç organ yağlanmasını azaltmaya ve metabolizma hızını yükseltmeye odaklı plan.',
    dailyCalorieRange: '1.400 - 1.650 kcal (Metabolik Koruma)',
    waterFormulaPerKg: 38,
    macronutrientRatio: {
      protein: 35,
      carbs: 35,
      fat: 30,
    },
    principles: [
      'Rafine beyaz un, paketli abur cuburlar ve ilave şekeri hayatınızdan tamamen çıkarın.',
      'Yüksek kaliteli protein (yumurta, balık, tavuk, hindi, lor) ile tokluk hormonlarını (GLP-1, PYY) uyarın.',
      'Öğün sayısını 3 ana öğün ve maksimum 1 hafif ara öğünle sınırlandırarak insülin dinlenme pencereleri açın.',
      'Eklem sağlığınızı korumak için koşu yerine yüzme veya tempolu düz yol yürüyüşlerini tercih edin.',
      'Kan tahlillerinizle karaciğer enzimleri (ALT/AST), açlık insülini ve HbA1c değerlerinizi kontrol ettirin.'
    ],
    sampleDays: [
      {
        dayName: '1. Gün - Düşük Glisemik İndeks Başlangıcı',
        focus: 'Temiz proteinler ve bol yeşillikli arınma',
        targetCalories: 1480,
        meals: [
          {
            mealTime: '08:30 - 09:00',
            mealName: 'Doyurucu Kahvaltı',
            description: '2 adet haşlanmış yumurta, 2 dilim az yağlı beyaz peynir, 4 adet zeytin, sınırsız yeşillik (roka, dereotu, maydanoz, salatalık), 1 dilim ekşi mayalı karabuğday ekmeği.',
            caloriesEstimate: 360,
            options: ['Mantarlı ve ıspanaklı 2 yumurtalı omlet + yeşillikler'],
          },
          {
            mealTime: '13:00 - 13:45',
            mealName: 'Öğle Yemeği',
            description: '160g ızgara tavuk veya hindi göğsü, 1 büyük kase zeytinyağlı sirkeli yeşil salata, 1 kase mercimek çorbası.',
            caloriesEstimate: 440,
            options: ['Zeytinyağlı taze fasulye yemeği + 1 kase yoğurt + 1 kase cacık'],
          },
          {
            mealTime: '16:30 - 17:00',
            mealName: 'Tek Ara Öğün',
            description: '1 fincan yeşil çay + 2 tam ceviz içi veya 8 adet çiğ badem.',
            caloriesEstimate: 120,
            options: ['1 bardak probiyotik kefir + tarçın'],
          },
          {
            mealTime: '19:00 - 19:45',
            mealName: 'Akşam Yemeği',
            description: '1 porsiyon etli veya kıymalı sebze yemeği (kabak/patlıcan/ıspanak), 1 kase yağsız ev yoğurdu (üzerine pul biber ve nane), 1 dilim çavdar ekmeği.',
            caloriesEstimate: 470,
            options: ['180g fırında yağsız balık + bol limonlu roka salatası'],
          },
          {
            mealTime: '21:30',
            mealName: 'Gece İçeceği',
            description: 'Limonlu ılık su veya papatya çayı.',
            caloriesEstimate: 10,
            options: ['Rezene çayı'],
          }
        ]
      }
    ],
    healthySwaps: [
      { avoid: 'Hazır paketli kraker ve bisküviler', prefer: 'Salatalık dilimleri üzerine az yağlı lor ve çörek otu', reason: 'Tansiyonu yükselten sodyum ve trans yağlardan uzak tutar.' },
      { avoid: 'Hamur işi, börek, poğaça', prefer: 'Yumurtalı ve bol yeşillikli protein kahvaltısı', reason: 'Saatlerce süren tok kalma hissi sağlar.' },
      { avoid: 'Şekerli kahve şurupları', prefer: 'Sade filtre kahve veya tarçınlı Türk kahvesi', reason: 'Yüzlerce gizli kaloriden arındırır.' }
    ],
    recommendedDrinks: ['Günde en az 3 litre su', 'Taze demlenmiş yeşil çay', 'Tarçın çubuğu bekletilmiş su', 'Sade mineralli maden suyu'],
    lifestyleAdvice: [
      'Günde mutlaka en az 30-40 dakika orta tempo yürüyüş yapın (eklemlerinizi yormadan).',
      'Bir hekim veya diyetisyen gözetiminde kan değerlerinizi ve insülin seviyenizi takip edin.',
      'Yemek günlüğü tutmak farkındalığınızı iki katına çıkarır.'
    ]
  },

  obese2: {
    categoryKey: 'obese2',
    title: 'Klinik Destekli Yoğun Yağ Kaybı & Sağlık İyileştirme Planı',
    subtitle: 'Eklem yükünü hafifleten, kardiyovasküler sistemi koruyan ve kan şekerini stabilize eden uzman beslenme çerçevesi.',
    dailyCalorieRange: '1.350 - 1.550 kcal (Uzman Kontrolünde)',
    waterFormulaPerKg: 38,
    macronutrientRatio: {
      protein: 35,
      carbs: 30,
      fat: 35,
    },
    principles: [
      'Bu derece obezitede bir endokrinolog ve uzman diyetisyen takibi mutlaka önerilir.',
      'Karbonhidrat kaynağı olarak yalnızca lif içeriği çok yüksek sebzeler ve sınırlı baklagiller tercih edilir.',
      'Tuz tüketimi ödem ve hipertansiyon riskini düşürmek amacıyla kısıtlanmalıdır (günde maksimum 1 çay kaşığı).',
      'Sıvı kaloriler (meyve suları, asitli içecekler, şekerli çay/kahve) tamamen yasaklanmalıdır.',
      'Fiziksel aktivite olarak eklem dostu su içi egzersizler, yüzme ve düz zemin yürüyüşleri seçilmelidir.'
    ],
    sampleDays: [
      {
        dayName: '1. Gün - Karbonhidrat Kısıtlı Sağlıklı Menü',
        focus: 'Anti-enflamatuar gıdalar ve yüksek lif',
        targetCalories: 1400,
        meals: [
          {
            mealTime: '08:30 - 09:00',
            mealName: 'Kahvaltı',
            description: '2 adet haşlanmış organik yumurta, 60g tuzsuz lor peyniri, bol dereotu, maydanoz, salatalık, çeyrek avokado, 1 dilim karabuğday ekmeği.',
            caloriesEstimate: 360,
            options: ['Sebzeli çılbır (yoğurtlu haşlanmış yumurta) + yeşillikler'],
          },
          {
            mealTime: '13:00 - 13:45',
            mealName: 'Öğle Yemeği',
            description: '1 tabak zeytinyağlı kabak sote veya fırınlanmış brokoli, 150g ızgara hindi bonfile, 1 kase probiyotik yoğurt.',
            caloriesEstimate: 420,
            options: ['Etli türlü yemeği (patatessiz) + ayran'],
          },
          {
            mealTime: '16:30 - 17:00',
            mealName: 'Ara Öğün',
            description: '1 bardak sade kefir + 1 tatlı kaşığı chia tohumu.',
            caloriesEstimate: 120,
            options: ['1 fincan yeşil çay + 2 ceviz'],
          },
          {
            mealTime: '19:00 - 19:30',
            mealName: 'Akşam Yemeği',
            description: '150g ızgara somon veya yağsız köfte, bol sumaklı ve limonlu marul salatası, 1 tabak sebze çorbası (unsuz/kremasız).',
            caloriesEstimate: 440,
            options: ['Fırında tavuk but (yağsız) + buharda pişmiş karnabahar püre'],
          },
          {
            mealTime: '21:30',
            mealName: 'Gece',
            description: 'Papatya çayı ve 1 tatlı kaşığı elma sirkesi eklenmiş ılık su.',
            caloriesEstimate: 10,
            options: ['Ilık limonlu su'],
          }
        ]
      }
    ],
    healthySwaps: [
      { avoid: 'Patates kızartması ve püreler', prefer: 'Buharda karnabahar püresi veya kereviz', reason: 'Kan şekerini zıplatmadan aynı doyurucu dokuyu verir.' },
      { avoid: 'Salam, sosis, sucuk gibi şarküteri', prefer: 'Haşlanmış tavuk göğsü veya ev yapımı ızgara köfte', reason: 'Kanserojen nitrit ve aşırı tuz yükünü ortadan kaldırır.' },
      { avoid: 'Şekerli tatlılar', prefer: 'Toz tarçın serpilmiş fırın elma dilimi (arada)', reason: 'Tatlı krizini doğal ve lifli şekilde yönetir.' }
    ],
    recommendedDrinks: ['Günde 3.5 litre saf su', 'Yeşil çay & nane', 'Ihlamur ve adaçayı', 'Sodyumu düşük maden suyu'],
    lifestyleAdvice: [
      'Lütfen kan biyokimyası, karaciğer ultrasonu ve kardiyolojik muayene için hekime danışınız.',
      'Ağırlık kaldırmak yerine oturarak veya suda yapılan direnç egzersizleriyle kaslarınızı harekete geçirin.',
      'Yavaş, istikrarlı ve sürdürülebilir kilo kaybı kalıcı başarı getirir.'
    ]
  },

  obese3: {
    categoryKey: 'obese3',
    title: 'Medikal Takip & Yaşam Kurtaran Beslenme Rejimi',
    subtitle: 'Morbid obezite sürecinde hayati riskleri minimize eden, organ fonksiyonlarını rahatlatan sıkı tıbbi beslenme protokolü.',
    dailyCalorieRange: '1.250 - 1.450 kcal (Mutlaka Hekim Gözetiminde)',
    waterFormulaPerKg: 40,
    macronutrientRatio: {
      protein: 40,
      carbs: 25,
      fat: 35,
    },
    principles: [
      'DİKKAT: Morbid obezite seviyesinde herhangi bir beslenme programına başlamadan önce mutlaka bir endokrinoloji veya bariatrik cerrahi/dahiliye hekimine danışılmalıdır.',
      'Kas kaybını önlemek ve metabolizmayı korumak için protein alımı önceliklendirilir.',
      'Tüm basit şekerler, beyaz unlar, trans yağlar ve işlenmiş ürünler tamamen yasaklanır.',
      'Eklemleri korumak için su içi yürüme, sandalye egzersizleri ve fizyoterapist eşliğinde hareket planı uygulanır.',
      'Uyku apnesi, yüksek tansiyon ve şeker hastalığı semptomları yakından takip edilmelidir.'
    ],
    sampleDays: [
      {
        dayName: '1. Gün - Saf Protein & Lifli Koruma',
        focus: 'Karaciğeri dinlendirme ve ödem boşaltma',
        targetCalories: 1300,
        meals: [
          {
            mealTime: '09:00',
            mealName: 'Sabah',
            description: '2 yumurta beyazı + 1 tam yumurta ile mantarlı omlet, 50g yağsız lor peyniri, bol taze nane ve salatalık, 1 dilim karabuğday ekmeği.',
            caloriesEstimate: 320,
            options: ['Haşlanmış yumurta + söğüş yeşillik + 1 dilim yağsız peynir'],
          },
          {
            mealTime: '13:00',
            mealName: 'Öğle',
            description: '150g ızgara hindi/tavuk, zeytinyağlı yeşil fasulye yemeği, 1 kase yağsız yoğurt.',
            caloriesEstimate: 380,
            options: ['Haşlanmış et + haşlanmış brokoli & karnabahar + cacık'],
          },
          {
            mealTime: '16:30',
            mealName: 'Ara Öğün',
            description: '1 kase probiyotik yoğurt içine 1 tatlı kaşığı öğütülmüş keten tohumu.',
            caloriesEstimate: 110,
            options: ['Yeşil çay + 2 ceviz'],
          },
          {
            mealTime: '19:00',
            mealName: 'Akşam',
            description: '150g fırında ızgara beyaz etli balık veya 4 adet ev köftesi, buharda sebzeler (kabak, kuşkonmaz, brokoli), bol limonlu yeşil salata.',
            caloriesEstimate: 420,
            options: ['Sebzeli tavuk güveç + ayran'],
          },
          {
            mealTime: '21:00',
            mealName: 'Gece',
            description: 'Ilık rezene çayı.',
            caloriesEstimate: 10,
            options: ['Limonlu su'],
          }
        ]
      }
    ],
    healthySwaps: [
      { avoid: 'Hamur işi, makarna ve ekmekler', prefer: 'Karnabahar pirinci, kabak spagetti', reason: 'Kaloriyi 1/5 oranına düşürür ve kan şekerini düz tutar.' },
      { avoid: 'Tüm şekerli ve gazlı içecekler', prefer: 'Taze naneli, limonlu soğuk kaynak suyu', reason: 'Günlük yüzlerce lüzumsuz kaloriden korur.' },
      { avoid: 'Ağır yağlı kızartmalar', prefer: 'Buharda veya airfryer/fırında pişirme', reason: 'Karaciğer yağlanmasını geriletmeye yardımcı olur.' }
    ],
    recommendedDrinks: ['Günde en az 3.5 - 4 litre su', 'Tıbbi kontrol eşliğinde bitki çayları', 'Doğal limonlu sular'],
    lifestyleAdvice: [
      'Mutlaka bariatrik uzmanı, diyetisyen ve kardiyolog eşliğinde bir tedavi planı oluşturun.',
      'Yalnız değilsiniz; profesyonel destekle bu süreç güvenle ve sağlığa kavuşarak aşılabilir.',
      'Düzenli tansiyon ve kan şekeri ölçümü yapın.'
    ]
  }
};

export function getDietPlanForCategory(categoryKey: string): CategoryDietPlan {
  return CATEGORY_DIET_PLANS[categoryKey] || CATEGORY_DIET_PLANS.normal;
}
