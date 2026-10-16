import { ChecklistItem, GitCommit, ProjectFile } from '../types/homework';

export const DEFAULT_STUDENT_INFO = {
  name: 'Enes Öztürk',
  email: 'enesozturk@gmail.com',
  githubUsername: 'enesozturk',
  repoName: 'kodluyoruzilkrepo',
};

export const getReadmeContent = (username: string, studentName: string) => `# Kodluyoruz İlk Repo

Bu repo [Kodluyoruz](https://www.kodluyoruz.org) Front-End 101 Eğitimi kapsamında açtığım ilk repodur. İçerisinde bir adet \`index.html\` ve bir adet \`README.md\` dosyası barındırmaktadır.

![Proje Önizleme](https://raw.githubusercontent.com/${username}/kodluyoruzilkrepo/main/preview.png)

## Proje Hakkında
Bu proje, Git ve GitHub temellerini öğrenmek, terminal üzerinden sürüm kontrol sistemlerini yönetmek ve açık kaynak ekosistemine ilk adımı atmak amacıyla hazırlanmıştır.

## İçerik Listesi
- **index.html**: Temel HTML5 yapısı ve başlangıç içeriklerini barındıran web sayfası.
- **README.md**: Proje tanıtımı ve kurulum adımlarını içeren dokümantasyon dosyası.
- **LICENSE**: Projenin açık kaynak MIT Lisansı.

## Kurulum ve Kullanım
Projeyi bilgisayarınıza klonlamak için aşağıdaki komutu terminalinizde çalıştırın:

\`\`\`bash
git clone https://github.com/${username}/kodluyoruzilkrepo.git
\`\`\`

Depo dizinine gidin:
\`\`\`bash
cd kodluyoruzilkrepo
\`\`\`

\`index.html\` dosyasını herhangi bir web tarayıcısında açarak çalıştırabilirsiniz:
\`\`\`bash
# MacOS için
open index.html

# Windows için
start index.html

# Linux için
xdg-open index.html
\`\`\`

## Eğitmen & Katkıda Bulunanlar
- **Eğitmen**: [Hakan Yalçınkaya](https://github.com/hakanyalcinkaya)
- **Öğrenci**: [${studentName}](https://github.com/${username})

## Lisans
Bu proje [MIT](https://choosealicense.com/licenses/mit/) lisansı ile korunmaktadır. Detaylar için \`LICENSE\` dosyasına göz atabilirsiniz.
`;

export const getIndexHtmlContent = (studentName: string) => `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kodluyoruz İlk Repo - ${studentName}</title>
  <style>
    :root {
      --primary: #FF5A36;
      --primary-dark: #E04826;
      --text-main: #1E293B;
      --text-muted: #64748B;
      --bg-page: #F8FAFC;
      --bg-card: #FFFFFF;
      --border: #E2E8F0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
      background-color: var(--bg-page);
      color: var(--text-main);
      line-height: 1.6;
      padding: 2rem 1rem;
    }
    .container {
      max-width: 760px;
      margin: 0 auto;
      background: var(--bg-card);
      border-radius: 12px;
      border: 1px solid var(--border);
      padding: 2.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    header {
      border-bottom: 2px solid #FFF0EB;
      padding-bottom: 1.5rem;
      margin-bottom: 2rem;
    }
    .badge {
      display: inline-block;
      background: #FFF0EB;
      color: var(--primary);
      font-size: 0.85rem;
      font-weight: 600;
      padding: 0.35rem 0.8rem;
      border-radius: 6px;
      margin-bottom: 0.75rem;
    }
    h1 {
      font-size: 2rem;
      color: var(--text-main);
      line-height: 1.25;
      margin-bottom: 0.5rem;
    }
    p.lead {
      font-size: 1.1rem;
      color: var(--text-muted);
    }
    section {
      margin-bottom: 2rem;
    }
    h2 {
      font-size: 1.35rem;
      color: var(--text-main);
      margin-bottom: 0.75rem;
      position: relative;
    }
    ul {
      list-style-type: none;
      padding-left: 0;
    }
    li {
      padding: 0.6rem 0;
      border-bottom: 1px dashed var(--border);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    li:last-child {
      border-bottom: none;
    }
    .icon {
      color: var(--primary);
      font-weight: bold;
    }
    .card-footer {
      background: #F1F5F9;
      padding: 1.25rem;
      border-radius: 8px;
      font-size: 0.95rem;
      color: var(--text-muted);
      margin-top: 2rem;
    }
    .card-footer strong {
      color: var(--text-main);
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <span class="badge">Kodluyoruz &bull; Frontend 101</span>
      <h1>Merhaba, Ben ${studentName}!</h1>
      <p class="lead">Bu sayfa, Git ve GitHub eğitimi kapsamında hazırladığım ilk web projemdir.</p>
    </header>

    <section>
      <h2>Öğrendiklerim & Uyguladıklarım</h2>
      <ul>
        <li><span class="icon">&check;</span> GitHub üzerinde public "kodluyoruzilkrepo" deposu oluşturma</li>
        <li><span class="icon">&check;</span> MIT Açık Kaynak Lisansı ve README.md yapılandırması</li>
        <li><span class="icon">&check;</span> Terminal üzerinden git clone, add, commit ve push akışları</li>
        <li><span class="icon">&check;</span> Hakan Yalçınkaya'nın eğitim deposunu forklama ve yerel inceleme</li>
      </ul>
    </section>

    <section>
      <h2>Depo Dosyaları</h2>
      <p>Bu proje dizininde standart bir açık kaynak projesinde bulunması gereken temel dosyalar yer almaktadır: <code>index.html</code>, <code>README.md</code>, <code>LICENSE</code> ve <code>.gitignore</code>.</p>
    </section>

    <div class="card-footer">
      <p>Eğitmen: <strong>Hakan Yalçınkaya</strong> &bull; Kodluyoruz / Patika.dev 2026</p>
    </div>
  </div>
</body>
</html>
`;

export const getLicenseContent = (studentName: string) => `MIT License

Copyright (c) 2026 ${studentName}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;

export const getGitignoreContent = () => `# macOS
.DS_Store
.AppleDouble
.LSOverride

# Windows
Thumbs.db
ehthumbs.db
Desktop.ini

# IDEs and Editors
.vscode/
.idea/
*.sublime-project
*.sublime-workspace

# Temporary files
*.tmp
*.log
`;

export const INITIAL_COMMITS: GitCommit[] = [
  {
    hash: 'a39f1c2',
    message: 'docs: Add project preview screenshot and final README details',
    author: 'Enes Öztürk',
    email: 'enesozturk@gmail.com',
    date: '10 dakika önce',
    filesChanged: 2,
  },
  {
    hash: 'e82b7d4',
    message: 'feat: Add index.html starter web page for Kodluyoruz homework',
    author: 'Enes Öztürk',
    email: 'enesozturk@gmail.com',
    date: '25 dakika önce',
    filesChanged: 1,
  },
  {
    hash: '1c49b09',
    message: 'Initial commit with README.md and MIT License',
    author: 'Enes Öztürk',
    email: 'enesozturk@gmail.com',
    date: '45 dakika önce',
    filesChanged: 2,
  },
];


export const INITIAL_CHECKLIST: ChecklistItem[] = [
  {
    id: 'chk_1',
    title: 'Repo Adı: "kodluyoruzilkrepo"',
    description: 'GitHub üzerinde depo adı tam olarak kodluyoruzilkrepo şeklinde belirlendi.',
    isCompleted: true,
    category: 'github',
  },
  {
    id: 'chk_2',
    title: 'Public (Kamuya Açık) Depo',
    description: 'Eğitmen ve topluluğun inceleyebilmesi için depo görünürlüğü Public olarak işaretlendi.',
    isCompleted: true,
    category: 'github',
  },
  {
    id: 'chk_3',
    title: 'Açıklama (Description) Metni',
    description: '"Kodluyoruz Eğitimi kapsamında açtığım ilk repo" açıklaması eklendi.',
    isCompleted: true,
    category: 'github',
  },
  {
    id: 'chk_4',
    title: 'README.md Dosyası',
    description: '"Add a README file" seçeneği işaretlenerek ilk doküman oluşturuldu.',
    isCompleted: true,
    category: 'github',
  },
  {
    id: 'chk_5',
    title: 'MIT Lisansı Seçimi',
    description: '"Choose a license" menüsünden açık kaynak MIT Lisansı seçildi.',
    isCompleted: true,
    category: 'github',
  },
  {
    id: 'chk_6',
    title: 'Depoyu Bilgisayara Klonlama',
    description: 'Yeşil Code butonundaki URL alınarak "git clone" ile yerel bilgisayara indirildi.',
    isCompleted: true,
    category: 'local',
  },
  {
    id: 'chk_7',
    title: 'README.md Markdown ve Resim Ekleme',
    description: 'README içerisine proje tanıtımı, kurulum adımları ve proje önizleme görseli eklendi.',
    isCompleted: true,
    category: 'local',
  },
  {
    id: 'chk_8',
    title: 'index.html Dosyası Oluşturma',
    description: 'Depo kök dizininde öğrenci tanıtımını içeren temiz bir index.html yazıldı.',
    isCompleted: true,
    category: 'local',
  },
  {
    id: 'chk_9',
    title: 'Git Commit ve Push İşlemleri',
    description: '"git add .", "git commit -m" ve "git push" ile yerel değişiklikler GitHub\'a aktarıldı.',
    isCompleted: true,
    category: 'local',
  },
  {
    id: 'chk_10',
    title: 'Hakan Yalçınkaya Reposunu Forklama',
    description: 'Eğitmen Hakan Yalçınkaya\'nın "kodluyoruz-frontend-101-egitimi" reposu forkladı ve klonlandı.',
    isCompleted: true,
    category: 'fork',
  },
];
