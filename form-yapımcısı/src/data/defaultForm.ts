import { FormConfig, FormField, ToolboxItemDefinition } from '../types/form';

export const TOOLBOX_ITEMS: ToolboxItemDefinition[] = [
  {
    type: 'text',
    title: 'Text Input (Metin Kutusu)',
    description: 'Tek satırlık metin girişi (Ad, Soyad vb.)',
    icon: 'Type',
    defaultLabel: 'Adınız Soyadınız',
    defaultPlaceholder: 'Örn: Ahmet Yılmaz',
    defaultHelpText: 'Lütfen resmi kimlik bilgilerinizi giriniz.',
    category: 'core',
  },
  {
    type: 'textarea',
    title: 'Textarea (Çok Satırlı Metin)',
    description: 'Uzun metinler ve mesajlar için alan',
    icon: 'AlignLeft',
    defaultLabel: 'Mesajınız / Görüşleriniz',
    defaultPlaceholder: 'Düşüncelerinizi buraya ayrıntılı olarak yazabilirsiniz...',
    defaultHelpText: 'Maksimum 500 karakter.',
    category: 'core',
  },
  {
    type: 'select',
    title: 'Dropdown (Açılır Liste)',
    description: 'Kullanıcının seçenekler arasından seçim yapması için liste',
    icon: 'ChevronDownSquare',
    defaultLabel: 'Konu Seçiniz',
    defaultPlaceholder: '-- Lütfen Bir Seçenek Belirleyin --',
    defaultHelpText: 'Başvurunuzun ilgili departmanını seçin.',
    category: 'core',
  },
  {
    type: 'email',
    title: 'Email (E-Posta)',
    description: 'Otomatik format doğrulamalı e-posta girişi',
    icon: 'Mail',
    defaultLabel: 'E-Posta Adresi',
    defaultPlaceholder: 'adiniz@ornek.com',
    defaultHelpText: 'Yanıt bu adrese iletilecektir.',
    category: 'advanced',
  },
  {
    type: 'number',
    title: 'Number (Sayı Girişi)',
    description: 'Yaş, telefon, miktar gibi sayısal değerler',
    icon: 'Hash',
    defaultLabel: 'Telefon Numarası / Yaş',
    defaultPlaceholder: 'Örn: 25',
    defaultHelpText: 'Sadece rakam giriniz.',
    category: 'advanced',
  },
  {
    type: 'checkbox',
    title: 'Checkbox (Onay Kutusu)',
    description: 'Kullanım koşulları veya tekil onaylar',
    icon: 'CheckSquare',
    defaultLabel: 'Kullanım ve Gizlilik Koşullarını kabul ediyorum',
    defaultHelpText: 'Formu göndermek için onay gereklidir.',
    category: 'advanced',
  },
  {
    type: 'radio',
    title: 'Radio (Çoktan Seçmeli)',
    description: 'Tek bir opsiyonu seçtiren radyo düğmeleri',
    icon: 'CircleDot',
    defaultLabel: 'Cinsiyet / Tercih',
    defaultHelpText: 'Uygun olan tek bir seçeneği işaretleyiniz.',
    category: 'advanced',
  },
  {
    type: 'date',
    title: 'Date (Tarih Seçici)',
    description: 'Takvim arayüzü ile tarih seçimi',
    icon: 'Calendar',
    defaultLabel: 'Randevu / Doğum Tarihi',
    defaultHelpText: 'GG/AA/YYYY formatında seçiniz.',
    category: 'advanced',
  },
];

export const createDefaultField = (type: FormField['type']): FormField => {
  const toolboxDef = TOOLBOX_ITEMS.find((item) => item.type === type);
  const id = `field_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const base: FormField = {
    id,
    type,
    label: toolboxDef?.defaultLabel || 'Yeni Alan',
    placeholder: toolboxDef?.defaultPlaceholder || '',
    helpText: toolboxDef?.defaultHelpText || '',
    required: false,
  };

  if (type === 'select' || type === 'radio') {
    base.options = [
      { id: 'opt_1', label: 'Birinci Seçenek', value: 'secenek_1' },
      { id: 'opt_2', label: 'İkinci Seçenek', value: 'secenek_2' },
      { id: 'opt_3', label: 'Üçüncü Seçenek', value: 'secenek_3' },
    ];
  }

  if (type === 'textarea') {
    base.rows = 4;
    base.validation = { maxLength: 500 };
  }

  if (type === 'text') {
    base.validation = { minLength: 2, maxLength: 100 };
  }

  if (type === 'checkbox') {
    base.defaultValue = false;
  }

  return base;
};

export const INITIAL_FORM_CONFIG: FormConfig = {
  id: 'form_default_1',
  title: 'İletişim & Talep Formu',
  description: 'Bizimle iletişime geçmek için lütfen formu eksiksiz doldurunuz. En kısa sürede geri dönüş yapacağız.',
  submitButtonText: 'Formu Gönder',
  themeColor: 'indigo',
  fields: [
    {
      id: 'field_initial_text',
      type: 'text',
      label: 'Adınız ve Soyadınız',
      placeholder: 'Örn: Enes Öztürk',
      helpText: 'Resmi evraklarda geçen tam adınızı yazınız.',
      required: true,
      validation: { minLength: 3, maxLength: 80 },
    },
    {
      id: 'field_initial_select',
      type: 'select',
      label: 'İletişim Nedeni / Departman',
      placeholder: '-- Lütfen Bir Departman Seçiniz --',
      helpText: 'Talebinizin en hızlı şekilde çözülmesi için doğru birimi seçiniz.',
      required: true,
      options: [
        { id: 'opt_1', label: 'Genel Bilgi ve Danışmanlık', value: 'genel_bilgi' },
        { id: 'opt_2', label: 'Teknik Destek ve Hata Bildirimi', value: 'teknik_destek' },
        { id: 'opt_3', label: 'İş Birliği ve Proje Teklifi', value: 'is_birligi' },
        { id: 'opt_4', label: 'Müşteri Hizmetleri & Şikayet', value: 'musteri_hizmetleri' },
      ],
    },
    {
      id: 'field_initial_textarea',
      type: 'textarea',
      label: 'Detaylı Mesajınız',
      placeholder: 'Konuyla ilgili ayrıntıları, sorununuzu veya proje detaylarınızı buraya yazınız...',
      helpText: 'Ayrıntılı bilgi vermeniz işleminizi hızlandıracaktır.',
      required: true,
      rows: 4,
      validation: { minLength: 10, maxLength: 1000 },
    },
  ],
};

export const PRESET_TEMPLATES: { name: string; description: string; config: FormConfig }[] = [
  {
    name: 'İletişim Formu (Standart)',
    description: 'Metin, Açılır Liste ve Çok Satırlı Mesaj alanları içerir.',
    config: INITIAL_FORM_CONFIG,
  },
  {
    name: 'Müşteri Geri Bildirim Formu',
    description: 'Hizmet memnuniyeti ve önerileri toplamak için tasarlanmıştır.',
    config: {
      id: 'form_feedback',
      title: 'Müşteri Memnuniyeti Anketi',
      description: 'Hizmet kalitemizi artırmamıza yardımcı olmak için lütfen birkaç dakikanızı ayırın.',
      submitButtonText: 'Değerlendirmeyi Gönder',
      themeColor: 'emerald',
      fields: [
        {
          id: 'fb_1',
          type: 'text',
          label: 'Adınız (İsteğe Bağlı)',
          placeholder: 'İsminizi belirtebilirsiniz...',
          required: false,
        },
        {
          id: 'fb_2',
          type: 'select',
          label: 'Hizmetimizden Ne Derece Memnun Kaldınız?',
          placeholder: '-- Değerlendirme Seçin --',
          required: true,
          options: [
            { id: 'fbo_1', label: '⭐️⭐️⭐️⭐️⭐️ Çok Memnun Kaldım', value: '5_star' },
            { id: 'fbo_2', label: '⭐️⭐️⭐️⭐️ Memnun Kaldım', value: '4_star' },
            { id: 'fbo_3', label: '⭐️⭐️⭐️ Orta / İdare Eder', value: '3_star' },
            { id: 'fbo_4', label: '⭐️⭐️ Memnun Kalmadım', value: '2_star' },
            { id: 'fbo_5', label: '⭐️ Hiç Memnun Kalmadım', value: '1_star' },
          ],
        },
        {
          id: 'fb_3',
          type: 'textarea',
          label: 'Geliştirmemiz Gereken Yönlerimiz & Önerileriniz',
          placeholder: 'Deneyiminizi daha iyi hale getirmek için ne yapabiliriz?',
          helpText: 'Tüm geri bildirimler geliştirme ekibimiz tarafından incelenir.',
          required: false,
          rows: 4,
        },
      ],
    },
  },
  {
    name: 'İş / Staj Başvuru Formu',
    description: 'Pozisyon seçimi, özgeçmiş özeti ve iletişim detayları.',
    config: {
      id: 'form_job',
      title: 'Kariyer & İş Başvuru Formu',
      description: 'Ekibimize katılmak için başvurunuzu yapın.',
      submitButtonText: 'Başvuruyu Tamamla',
      themeColor: 'blue',
      fields: [
        {
          id: 'job_1',
          type: 'text',
          label: 'Ad Soyad',
          placeholder: 'Örn: Enes Öztürk',
          required: true,
        },
        {
          id: 'job_2',
          type: 'email',
          label: 'E-Posta Adresi',
          placeholder: 'ornek@alanadi.com',
          required: true,
        },
        {
          id: 'job_3',
          type: 'select',
          label: 'Başvurulan Pozisyon',
          placeholder: '-- Pozisyon Seçiniz --',
          required: true,
          options: [
            { id: 'po_1', label: 'Frontend Developer (React/TS)', value: 'frontend' },
            { id: 'po_2', label: 'Fullstack Developer (Node.js)', value: 'fullstack' },
            { id: 'po_3', label: 'UI/UX Designer', value: 'ui_ux' },
            { id: 'po_4', label: 'Stajyer / Jr. Yazılımcı', value: 'intern' },
          ],
        },
        {
          id: 'job_4',
          type: 'textarea',
          label: 'Özet Deneyim & Kendinizden Bahsedin',
          placeholder: 'Daha önce yaptığınız projeler, yetenekleriniz ve motivasyonunuz...',
          required: true,
          rows: 5,
        },
        {
          id: 'job_5',
          type: 'checkbox',
          label: 'Kişisel Verilerin Korunması Kanunu (KVKK) metnini okudum, onaylıyorum.',
          required: true,
        },
      ],
    },
  },
];
