import React, { useState } from 'react';
import { Page, Project, BlogPost } from '../types';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, BLOG_POSTS } from '../data/portfolioData';
import { Signature } from '../components/Signature';
import { ArrowRight, ArrowUpRight, Code, Layers, Sparkles, Terminal } from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
  onSelectProject: (project: Project) => void;
  onSelectPost: (post: BlogPost) => void;
  onOpenContact: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  onSelectProject,
  onSelectPost,
  onOpenContact
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'system' | 'mobile' | 'opensource'>('all');

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <div className="space-y-24 sm:space-y-32">

      {/* ================= HERO SECTION (SPLIT SCREEN) ================= */}
      <section className="relative pt-6 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Kicker & Signature badge */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400">
                  Kişisel Portfolyo
                </span>
                <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">/</span>
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  İstanbul, TR
                </span>
              </div>

              {/* Display Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] text-balance">
                Enes Öztürk
              </h1>

              <p className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300">
                {PERSONAL_INFO.title}
              </p>

              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                {PERSONAL_INFO.tagline} {PERSONAL_INFO.bio}
              </p>
            </div>

            {/* Signature & CTAs */}
            <div className="pt-4 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href="#calismalar"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                >
                  <span>Çalışmalarımı Keşfet</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => {
                    setCurrentPage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-xl transition-all cursor-pointer"
                >
                  <span>Hakkımda & Deneyim</span>
                </button>

                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <span>İletişime Geç</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Handcrafted signature mark */}
              <div className="pt-2">
                <Signature className="w-44 h-11" showTagline />
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Container */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-900 group">
              <img
                src={PERSONAL_INFO.portraitImage}
                alt="Enes Öztürk Portresi"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <div>
                  <p className="font-semibold text-sm">Enes Öztürk</p>
                  <p className="text-slate-300 font-mono text-[11px]">Software Engineer · UI Architect</p>
                </div>
                <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                  <Terminal className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Full-Width Key Metrics Strip (Below Hero Split - Portfolio Guideline) */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white tabular-nums tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= KIŞISEL ÇALIŞMALAR (PROJECTS) ================= */}
      <section id="calismalar" className="space-y-8 scroll-mt-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-mono font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-1">
              Portfolyo & Ürünler
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Öne Çıkan Kişisel Çalışmalar
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Uçtan uca mimarisini tasarladığım, yüksek performans ve erişilebilirlik standartlarına sahip seçili projeler.
            </p>
          </div>

          {/* Interactive Filter Tabs (Buttons with click handlers) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl overflow-x-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tüm Projeler ({PROJECTS.length})
            </button>
            <button
              onClick={() => setActiveFilter('system')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === 'system'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Bulut & SaaS
            </button>
            <button
              onClick={() => setActiveFilter('mobile')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === 'mobile'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Fintech & Mobil
            </button>
            <button
              onClick={() => setActiveFilter('opensource')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === 'opensource'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Açık Kaynak
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group flex flex-col rounded-2xl bg-white dark:bg-[#0E121B] border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 hover:shadow-lg cursor-pointer"
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors" />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-900 dark:text-white">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Clean unboxed metadata with separators (No pill enclosure) */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span>{project.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Tags and metrics */}
                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono flex flex-wrap gap-x-2 gap-y-1">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx}>
                        {tag}
                        {idx < 2 && <span className="text-slate-300 dark:text-slate-700 ml-2">/</span>}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-900 dark:text-white font-mono tabular-nums">
                      {project.metrics[0].value}
                    </span>
                    <span className="text-slate-400">{project.metrics[0].label}</span>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= İŞ DENEYİMLERİ ÖZETİ (EXPERIENCE HIGHLIGHTS) ================= */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-mono font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-1">
              Kariyer Yolculuğu
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              İş Deneyimleri
            </h2>
          </div>
          <button
            onClick={() => {
              setCurrentPage('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-white hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer"
          >
            <span>Tüm Deneyimi & Becerileri İncele</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#0E121B] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-start justify-between gap-6 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-900 dark:text-white">{exp.company}</span>
                  <span aria-hidden="true">·</span>
                  <span>{exp.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{exp.type}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {exp.role}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {exp.description}
                </p>
                <div className="pt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                  {exp.technologies.slice(0, 5).map((tech, idx) => (
                    <span key={idx}>
                      {tech}
                      {idx < 4 && <span className="text-slate-300 dark:text-slate-700 ml-2">/</span>}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-sm font-mono text-slate-500 dark:text-slate-400 shrink-0">
                {exp.period}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ÖNE ÇIKAN BLOG YAZILARI ================= */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-mono font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-1">
              Düşünceler & Yazılar
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Son Blog Makaleleri
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Yazılım mimarisi, React ekosistemi ve web performansı üzerine notlar.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentPage('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-white hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer"
          >
            <span>Tüm Makaleleri Gör ({BLOG_POSTS.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_POSTS.slice(0, 2).map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="p-6 rounded-2xl bg-white dark:bg-[#0E121B] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Metadata without pills */}
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>Makaleyi Oku</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="font-mono text-slate-500 dark:text-slate-400 font-normal">
                  {post.likesCount} beğeni
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white dark:bg-slate-900/90 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Yeni Projeler İçin Müsait</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Bir sonraki dijital ürününüzü birlikte inşa edelim.
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            İster kurumsal bir SaaS platformu, ister özel bir tasarım sistemi veya yüksek performanslı bir mobil web uygulaması olsun; fikrinizi hayata geçirmek için hazır mısınız?
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenContact}
              className="px-6 py-3 text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.98]"
            >
              Mesaj Gönderin
            </button>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-sm text-slate-300 hover:text-white transition-colors underline underline-offset-4"
            >
              {PERSONAL_INFO.email}
            </a>
          </div>
        </div>

        <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none hidden lg:block">
          <Signature className="w-96 h-96" />
        </div>
      </section>

    </div>
  );
};
