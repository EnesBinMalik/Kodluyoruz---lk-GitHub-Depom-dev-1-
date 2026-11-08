import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Activity, BookOpen, UtensilsCrossed, History, Menu, X, Sparkles } from 'lucide-react';
import { PrimaryButton } from './styled/Buttons';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { to: '/', label: 'BMI Hesapla', icon: Activity, exact: true },
    { to: '/bmi-nedir', label: 'BMI Nedir?', icon: BookOpen },
    { to: '/diyet-listeleri', label: 'Diyet Listeleri', icon: UtensilsCrossed },
    { to: '/gecmis', label: 'Geçmiş Kayıtlar', icon: History },
  ];

  const handleQuickCalc = () => {
    navigate('/');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Signature */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-900 bg-clip-text text-transparent">
                  FitIndex
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  VKİ & Diyet
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Enes Öztürk Tasarımı
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/70">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/60'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 opacity-70" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Action Button using Styled Component */}
          <div className="hidden md:flex items-center gap-3">
            <PrimaryButton $size="sm" onClick={handleQuickCalc}>
              <Sparkles className="w-4 h-4" />
              <span>Hemen Hesapla</span>
            </PrimaryButton>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Menüyü aç/kapat"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                <Icon className="w-5 h-5 text-emerald-600" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
          <div className="pt-2">
            <PrimaryButton $fullWidth $size="md" onClick={handleQuickCalc}>
              <Sparkles className="w-4 h-4" />
              <span>Hemen Hesapla</span>
            </PrimaryButton>
          </div>
        </div>
      )}
    </header>
  );
};
