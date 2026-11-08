import React from 'react';
import { Page } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Signature } from './Signature';
import { Github, Linkedin, Mail, Twitter, ArrowUp } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#07090E] transition-colors mt-20">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand & Signature Column */}
          <div className="md:col-span-5 space-y-4">
            <Signature className="w-52 h-14" showTagline />
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed mt-2">
              Modern web mimarileri, bulut çözümleri ve estetik kullanıcı arayüzleri geliştiren bağımsız yazılım mühendisi.
            </p>
            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
              <span>{PERSONAL_INFO.location}</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="hover:text-slate-900 dark:hover:text-white transition-colors underline underline-offset-4"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-900 dark:text-slate-100">
              Sayfalar
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    scrollToTop();
                  }}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Anasayfa
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('about');
                    scrollToTop();
                  }}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Hakkımda & Deneyim
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('blog');
                    scrollToTop();
                  }}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Teknik Blog & Makaleler
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  İletişim Formu
                </button>
              </li>
            </ul>
          </div>

          {/* Social Profiles & Back to Top */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-900 dark:text-slate-100">
              Bağlantılar & İletişim
            </h4>
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profili"
                className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profili"
                className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X Profili"
                className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label="E-posta Gönder"
                className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer group"
              >
                <span>Başa Dön</span>
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar with subtle divider */}
        <div className="mt-12 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Enes Öztürk. Tüm hakları saklıdır.</p>
          <p className="flex items-center gap-2">
            <span>Tasarım & Geliştirme: Enes Öztürk</span>
            <span aria-hidden="true">·</span>
            <span>İstanbul</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
