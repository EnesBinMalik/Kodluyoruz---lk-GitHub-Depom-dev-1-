import { BmiCategoryInfo, BmiCategoryKey } from '../types/bmi';

export const BMI_CATEGORIES: Record<BmiCategoryKey, BmiCategoryInfo> = {
  underweight: {
    key: 'underweight',
    name: 'Zayıf (Düşük Kilo)',
    shortLabel: 'Zayıf',
    rangeText: '< 18.5 kg/m²',
    min: 0,
    max: 18.49,
    color: '#0284c7', // Sky blue
    bgColor: '#f0f9ff',
    borderColor: '#7dd3fc',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    healthRisk: 'Düşük bağışıklık, vitamin/mineral eksikliği, kas kaybı ve kemik erimesi riski.',
    summary: 'Vücut ağırlığınız boyunuza oranla ideal sınırın altında. Kas kütlenizi artıracak, besin değeri yüksek ve dengeli bir kalori fazlası içeren beslenme programı önerilir.'
  },
  normal: {
    key: 'normal',
    name: 'Normal (Sağlıklı Kilo)',
    shortLabel: 'İdeal / Normal',
    rangeText: '18.5 - 24.9 kg/m²',
    min: 18.5,
    max: 24.99,
    color: '#16a34a', // Emerald green
    bgColor: '#f0fdf4',
    borderColor: '#86efac',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    healthRisk: 'En düşük kronik hastalık ve kardiyovasküler risk düzeyi.',
    summary: 'Tebrikler! Vücut kitle endeksiniz sağlıklı ve ideal aralıkta. Mevcut formunuzu korumak, bağışıklığınızı güçlü tutmak ve enerji seviyenizi maksimize etmek için Akdeniz tipi dengeli beslenmeye devam edin.'
  },
  overweight: {
    key: 'overweight',
    name: 'Fazla Kilolu',
    shortLabel: 'Fazla Kilolu',
    rangeText: '25.0 - 29.9 kg/m²',
    min: 25.0,
    max: 29.99,
    color: '#ea580c', // Orange
    bgColor: '#fff7ed',
    borderColor: '#fdba74',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    healthRisk: 'Hafif-orta düzeyde hipertansiyon, insülin direnci ve eklem yükü artışı riski.',
    summary: 'Boyunuza göre vücut ağırlığınız ideal sınırın biraz üzerinde. Hafif bir kalori kısıtlaması, liften zengin beslenme ve günlük 30-45 dakikalık tempolu yürüyüş ile ideal kilonuza rahatlıkla dönebilirsiniz.'
  },
  obese1: {
    key: 'obese1',
    name: '1. Derece Obezite',
    shortLabel: '1. Derece Obezite',
    rangeText: '30.0 - 34.9 kg/m²',
    min: 30.0,
    max: 34.99,
    color: '#dc2626', // Red
    bgColor: '#fef2f2',
    borderColor: '#fca5a5',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    healthRisk: 'Tip 2 diyabet, karaciğer yağlanması, kalp-damar hastalıkları ve uyku apnesi riski belirginleşir.',
    summary: 'Vücudunuzda yağ oranı belirgin şekilde artmış durumdadır. İşlenmiş gıdaları ve rafine şekeri keserek, protein ve lif ağırlıklı bir metabolizma hızlandırıcı diyetle sağlıklı yağ kaybı başlatılmalıdır.'
  },
  obese2: {
    key: 'obese2',
    name: '2. Derece Obezite (Ciddi)',
    shortLabel: '2. Derece Obezite',
    rangeText: '35.0 - 39.9 kg/m²',
    min: 35.0,
    max: 39.99,
    color: '#991b1b', // Deep Red
    bgColor: '#fff1f2',
    borderColor: '#f43f5e',
    badgeClass: 'bg-red-100 text-red-900 border-red-300',
    healthRisk: 'Yüksek kardiyovasküler risk, eklem dejenerasyonu, metabolik sendrom.',
    summary: 'Ciddi düzeyde kilo fazlalığı mevcuttur. Doktor ve uzman diyetisyen kontrolünde kontrollü, glisemik indeksi düşük ve düzenli takip edilen bir beslenme programı uygulanmalıdır.'
  },
  obese3: {
    key: 'obese3',
    name: '3. Derece Obezite (Morbid)',
    shortLabel: 'Morbid Obezite',
    rangeText: '≥ 40.0 kg/m²',
    min: 40.0,
    max: 100,
    color: '#7f1d1d', // Very dark Red / Purple
    bgColor: '#faf5ff',
    borderColor: '#c084fc',
    badgeClass: 'bg-purple-100 text-purple-900 border-purple-300',
    healthRisk: 'Çok yüksek hayati risk; acil multidisipliner tıbbi müdahale ve yaşam tarzı dönüşümü gerektirir.',
    summary: 'Vücut kitle endeksiniz morbid obezite sınırındadır. Mutlaka bir endokrinoloji uzmanı ve diyetisyen gözetiminde kapsamlı bir tedavi ve beslenme planı hayata geçirilmelidir.'
  }
};

export function getBmiCategory(bmi: number): BmiCategoryInfo {
  if (bmi < 18.5) return BMI_CATEGORIES.underweight;
  if (bmi < 25.0) return BMI_CATEGORIES.normal;
  if (bmi < 30.0) return BMI_CATEGORIES.overweight;
  if (bmi < 35.0) return BMI_CATEGORIES.obese1;
  if (bmi < 40.0) return BMI_CATEGORIES.obese2;
  return BMI_CATEGORIES.obese3;
}
