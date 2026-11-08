import React, { useState, useEffect } from 'react';
import { Page, Project, BlogPost } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ContactModal } from './components/ContactModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('enes_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('enes_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('enes_theme', 'light');
    }
  }, [darkMode]);

  const handleSelectPost = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentPage('blog-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#0A0D14] text-slate-800 dark:text-slate-100 transition-colors">
      {/* Top Navbar Contract */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={(page) => {
          setCurrentPage(page);
          if (page !== 'blog-detail') {
            setSelectedPost(null);
          }
        }}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8 sm:py-12">
        {currentPage === 'home' && (
          <HomePage
            setCurrentPage={setCurrentPage}
            onSelectProject={handleSelectProject}
            onSelectPost={handleSelectPost}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}

        {(currentPage === 'blog' || currentPage === 'blog-detail') && (
          <BlogPage
            selectedPost={selectedPost}
            setSelectedPost={(post) => {
              setSelectedPost(post);
              if (!post) {
                setCurrentPage('blog');
              } else {
                setCurrentPage('blog-detail');
              }
            }}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Signature & Links Footer */}
      <Footer
        setCurrentPage={(page) => {
          setCurrentPage(page);
          if (page !== 'blog-detail') {
            setSelectedPost(null);
          }
        }}
        onOpenContact={() => setIsContactOpen(true)}
      />
    </div>
  );
}
