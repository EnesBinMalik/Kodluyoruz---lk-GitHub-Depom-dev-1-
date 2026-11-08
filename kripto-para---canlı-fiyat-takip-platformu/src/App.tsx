import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CryptoCoin, Currency, FilterCategory, SortField, SortOrder, ViewMode } from './types/crypto';
import { fetchCryptoMarkets } from './services/api';
import { Navbar } from './components/Navbar';
import { MarketBanner } from './components/MarketBanner';
import { Search } from './components/Search';
import { FilterBar } from './components/FilterBar';
import { CoinTable } from './components/CoinTable';
import { CoinGrid } from './components/CoinGrid';
import { CoinDetailModal } from './components/CoinDetailModal';
import { CryptoConverter } from './components/CryptoConverter';
import { Footer } from './components/Footer';
import { AlertCircle, RefreshCw, Sparkles } from 'lucide-react';

export default function App() {
  // 1. Primary States (useState hooks)
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [currency, setCurrency] = useState<Currency>('usd');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [sortField, setSortField] = useState<SortField>('market_cap_rank');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Favorites (persisted in localStorage)
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('kripto_favorites_enes');
      return stored ? JSON.parse(stored) : ['bitcoin', 'ethereum', 'solana'];
    } catch {
      return ['bitcoin', 'ethereum', 'solana'];
    }
  });

  // Modal / Drawer States
  const [selectedCoin, setSelectedCoin] = useState<CryptoCoin | null>(null);
  const [isConverterOpen, setIsConverterOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('markets');

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kripto_favorites_enes', JSON.stringify(favorites));
    } catch (e) {
      console.warn('LocalStorage kayıt hatası:', e);
    }
  }, [favorites]);

  // Data fetching callback using Axios via fetchCryptoMarkets
  const loadMarketData = useCallback(async (isSilent = false) => {
    if (!isSilent) {
      setIsLoading(true);
    } else {
      setIsRefreshing(true);
    }
    setError(null);

    try {
      const result = await fetchCryptoMarkets(currency);
      setCoins(result.data);
      setIsFallback(result.isFallback);
      setLastUpdated(result.timestamp);
    } catch (err: any) {
      setError(err?.message || 'Veri yüklenirken beklenmeyen bir hata oluştu');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [currency]);

  // Initial load and currency change effect (useEffect hook)
  useEffect(() => {
    loadMarketData();
  }, [loadMarketData]);

  // Periodic live price update every 45 seconds (useEffect hook)
  useEffect(() => {
    const timer = setInterval(() => {
      loadMarketData(true);
    }, 45000);

    return () => clearInterval(timer);
  }, [loadMarketData]);

  // Favorite toggle handler
  const handleToggleFavorite = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  // Sort change handler
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      // Default to desc for price & change, asc for rank & name
      setSortOrder(field === 'market_cap_rank' || field === 'name' ? 'asc' : 'desc');
    }
  };

  // Quick navigation handler
  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === 'top10') {
      setFilterCategory('top10');
      setSearchQuery('');
    } else if (section === 'gainers') {
      setFilterCategory('gainers');
      setSearchQuery('');
    } else {
      setFilterCategory('all');
      setSearchQuery('');
    }
  };

  // Filtered & Sorted coins memoization
  const processedCoins = useMemo(() => {
    let result = [...coins];

    // 1. Search Query filter (by Name or Symbol)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.symbol.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q)
      );
    }

    // 2. Category Filter
    if (filterCategory === 'top10') {
      result = result.slice(0, 10);
    } else if (filterCategory === 'gainers') {
      result = result
        .filter((c) => (c.price_change_percentage_24h || 0) > 0)
        .sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0));
    } else if (filterCategory === 'losers') {
      result = result
        .filter((c) => (c.price_change_percentage_24h || 0) < 0)
        .sort((a, b) => (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0));
    } else if (filterCategory === 'favorites') {
      result = result.filter((c) => favorites.includes(c.id));
    }

    // 3. Sorting (applied if not already custom sorted by gainer/loser tab)
    if (filterCategory !== 'gainers' && filterCategory !== 'losers') {
      result.sort((a, b) => {
        let valA: any = a[sortField];
        let valB: any = b[sortField];

        if (typeof valA === 'string') {
          return sortOrder === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }

        valA = Number(valA || 0);
        valB = Number(valB || 0);
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      });
    }

    return result;
  }, [coins, searchQuery, filterCategory, sortField, sortOrder, favorites]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 1. Header / Navbar following Top Bar Contract */}
      <Navbar
        currency={currency}
        onCurrencyChange={(newCurr) => setCurrency(newCurr)}
        onRefresh={() => loadMarketData(false)}
        isLoading={isLoading || isRefreshing}
        onOpenConverter={() => setIsConverterOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* 2. Global Market Statistics Strip */}
      <MarketBanner
        coins={coins}
        currency={currency}
        lastUpdated={lastUpdated}
        isFallback={isFallback}
      />

      {/* 3. Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Hero Section with Title & Highlights */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Canlı Kripto Para Fiyat Takip & Analiz</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white text-balance">
              Kripto Para Piyasaları
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Gerçek zamanlı kur verileri, 24 saatlik değişimler, piyasa hacimleri ve derinlemesine teknik istatistikler.
            </p>
          </div>

          {/* Quick Portfolio / Summary badge */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsConverterOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 rounded-xl transition-all"
            >
              <span>Dönüştürücü Hesap Makinesi</span>
            </button>
          </div>
        </div>

        {/* Error Notification if any */}
        {error && (
          <div className="flex items-center justify-between p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => loadMarketData(false)}
              className="font-bold underline hover:text-white"
            >
              Tekrar Dene
            </button>
          </div>
        )}

        {/* 4. Default Landing Requirement: Search Component */}
        <div className="bg-slate-900/40 p-4 sm:p-5 rounded-2xl border border-slate-800/80 shadow-sm space-y-4">
          <Search
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalResults={processedCoins.length}
            totalCoins={coins.length}
            onQuickFilter={(sym) => setSearchQuery(sym)}
          />

          {/* 5. Filter & View Switcher Bar */}
          <FilterBar
            filterCategory={filterCategory}
            onFilterChange={setFilterCategory}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            favoritesCount={favorites.length}
            sortField={sortField}
            sortOrder={sortOrder}
            onSortChange={handleSort}
          />
        </div>

        {/* 6. Dynamic Crypto Rendering using map function */}
        {isLoading && coins.length === 0 ? (
          <div className="border border-slate-800/80 rounded-2xl bg-slate-900/30 p-16 text-center">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-slate-900 border border-slate-800 mb-4">
              <RefreshCw className="w-6 h-6 text-amber-400 animate-spin" />
            </div>
            <h3 className="text-base font-semibold text-slate-200 mb-1">
              Canlı Piyasa Verileri Çekiliyor...
            </h3>
            <p className="text-xs text-slate-400">
              Axios kütüphanesi ile kripto para ağından güncel kurlar alınıyor.
            </p>
          </div>
        ) : viewMode === 'table' ? (
          <CoinTable
            coins={processedCoins}
            currency={currency}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectCoin={setSelectedCoin}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
            isLoading={isLoading}
            onResetSearch={() => {
              setSearchQuery('');
              setFilterCategory('all');
            }}
          />
        ) : (
          <CoinGrid
            coins={processedCoins}
            currency={currency}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectCoin={setSelectedCoin}
            isLoading={isLoading}
          />
        )}
      </main>

      {/* 7. Coin Detail Modal */}
      <CoinDetailModal
        coin={selectedCoin}
        currency={currency}
        isFavorite={selectedCoin ? favorites.includes(selectedCoin.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onClose={() => setSelectedCoin(null)}
      />

      {/* 8. Dedicated Crypto Converter Drawer/Modal */}
      <CryptoConverter
        coins={coins}
        isOpen={isConverterOpen}
        onClose={() => setIsConverterOpen(false)}
        currency={currency}
      />

      {/* 9. Enes Öztürk Signature & Attribution Footer */}
      <Footer />
    </div>
  );
}
