import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Heart, Eye, ArrowRight, RotateCw, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { StyledFavoriteButton, StyledFilterButton, StyledPrimaryButton } from './styled/Buttons';

export const ProductCatalog: React.FC = () => {
  const { products, loading, error, refreshProducts, toggleFavorite, isFavorite, addToCart } = useShop();
  const navigate = useNavigate();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [selectedGender, setSelectedGender] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  const categories = ['Tümü', 'Kaban & Ceket', 'Sweatshirt & Hoodie', 'Triko & Kazak', 'Pantolon', 'Gömlek', 'Aksesuar'];
  const genders = ['Tümü', 'Kadın', 'Erkek', 'Unisex'];

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'Tümü' || p.category === selectedCategory;
        const matchesGender = selectedGender === 'Tümü' || p.gender === selectedGender;
        const matchesStock = !onlyInStock || p.inStock;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesGender && matchesStock && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedGender, searchQuery, sortBy, onlyInStock]);

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      {/* Editorial Campaign Hero */}
      <section className="relative overflow-hidden bg-stone-900 text-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6 z-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sonbahar / Kış Koleksiyonu · Enes Öztürk Atelier</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-brand font-normal tracking-tight leading-[1.1] text-stone-50">
              Kusursuz Silüetler, Zamansız Doku.
            </h1>

            <p className="text-stone-300 text-base sm:text-lg max-w-xl font-light leading-relaxed">
              Özel dokunmuş İtalyan merinos yünü, 460 GSM taranmış organik pamuk ve mimari dökümlü modern terzilik.
              Günümüz yaşam temposuna uyarlanmış lüks gardırop seçkisi.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a href="#catalog-items">
                <StyledPrimaryButton $size="lg">
                  Koleksiyonu Keşfet <ArrowRight className="w-4 h-4 ml-1" />
                </StyledPrimaryButton>
              </a>
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span>Axios & MockAPI.io Entegre</span>
                <span>·</span>
                <span>Enes Öztürk İmzalı</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-lg overflow-hidden shadow-2xl border border-stone-800 relative group">
              <img
                src="/src/assets/images/hero_fashion_collection_1794147278299.jpg"
                alt="Enes Öztürk Atelier Koleksiyonu"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent flex items-end p-6">
                <div className="text-stone-200 text-xs font-mono">
                  <div className="text-white font-medium text-sm">Editorial Runway Campaign 2026</div>
                  <div className="text-stone-400">İstanbul / Nişantaşı Stüdyo</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Catalog & Filter Navigation */}
      <section id="catalog-items" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="space-y-6">
          
          {/* Header Row: Title & Search */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <div className="text-xs font-mono text-stone-500 uppercase tracking-widest">
                Giyim Kataloğu · {filteredProducts.length} Ürün Listeleniyor
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-brand font-semibold text-stone-900 mt-1">
                Tüm Kıyafetler & Parçalar
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Search input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Kıyafet, kaban, kazak ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900"
                />
              </div>

              {/* Refresh with Axios button */}
              <button
                onClick={refreshProducts}
                title="Axios ile verileri güncelle"
                disabled={loading}
                className="p-2 border border-stone-300 rounded bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                aria-label="Verileri Güncelle"
              >
                <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Interactive Filters Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-stone-200 shadow-sm">
            
            {/* Category Segmented Controls */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <StyledFilterButton
                  key={cat}
                  $active={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </StyledFilterButton>
              ))}
            </div>

            {/* Sub-Filters: Gender, Stock, Sort */}
            <div className="flex flex-wrap items-center gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-100">
              
              {/* Gender Switch */}
              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded">
                {genders.map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`px-2.5 py-1 text-xs rounded transition-colors ${
                      selectedGender === g
                        ? 'bg-white text-stone-900 font-semibold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              {/* In-Stock Toggle */}
              <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                />
                <span>Sadece Stoktakiler</span>
              </label>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 text-xs text-stone-600">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border-0 font-medium text-stone-900 focus:ring-0 text-xs py-1 pr-6 cursor-pointer"
                >
                  <option value="featured">Öne Çıkanlar</option>
                  <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                  <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                  <option value="rating">Müşteri Puanı</option>
                </select>
              </div>

            </div>

          </div>

        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
            <RotateCw className="w-8 h-8 animate-spin text-stone-700" />
            <p className="text-sm font-medium text-stone-600">Axios ile MockAPI.io ürünleri yükleniyor...</p>
          </div>
        )}

        {/* Error State with retry */}
        {!loading && error && (
          <div className="my-8 p-4 bg-amber-50 border border-amber-200 rounded text-amber-800 text-sm flex items-center justify-between">
            <div>
              <strong>Bağlantı Bildirimi:</strong> {error}. Güvenli yerel katalog gösteriliyor.
            </div>
            <button
              onClick={refreshProducts}
              className="text-xs font-semibold underline hover:text-amber-950"
            >
              Yeniden Dene
            </button>
          </div>
        )}

        {/* Empty Search / Filter State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="py-24 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-serif-brand font-semibold text-stone-900">
              Aradığınız kriterlere uygun ürün bulunamadı
            </h3>
            <p className="text-xs text-stone-500">
              Farklı bir filtre seçebilir veya arama kelimenizi değiştirebilirsiniz.
            </p>
            <StyledPrimaryButton
              $size="sm"
              onClick={() => {
                setSelectedCategory('Tümü');
                setSelectedGender('Tümü');
                setSearchQuery('');
                setOnlyInStock(false);
              }}
            >
              Filtreleri Temizle
            </StyledPrimaryButton>
          </div>
        )}

        {/* Product Grid - Dinamik map fonksiyonu ile listeleme */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pt-8">
            {filteredProducts.map((product: Product) => {
              const favorited = isFavorite(product.id);
              const primaryImage = product.images[0] || '/src/assets/images/hero_fashion_collection_1794147278299.jpg';

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-md border border-stone-200/90 overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-stone-300"
                >
                  {/* Product Card Image Container */}
                  <div
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="relative aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={primaryImage}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Badge if available */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-xs text-white text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded">
                        {product.badge}
                      </span>
                    )}

                    {/* Wishlist toggle button */}
                    <div
                      className="absolute top-3 right-3 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product);
                      }}
                    >
                      <button
                        type="button"
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-sm ${
                          favorited
                            ? 'bg-rose-50 text-rose-600'
                            : 'bg-white/90 text-stone-700 hover:text-rose-600'
                        }`}
                        aria-label="Favorilere Ekle"
                        title={favorited ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                      >
                        <Heart
                          className={`w-4 h-4 ${favorited ? 'fill-rose-600 text-rose-600' : 'text-stone-700'}`}
                        />
                      </button>
                    </div>

                    {/* Quick View Overlay Bar on Hover */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between text-white text-xs">
                      <span className="flex items-center gap-1 font-medium">
                        <Eye className="w-3.5 h-3.5" /> Detayları Gör
                      </span>
                      <span className="font-mono-num">{product.sizes.join(' · ')}</span>
                    </div>
                  </div>

                  {/* Card Content & Details */}
                  <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                    
                    <div className="space-y-1">
                      {/* Clean metadata without pill boxes */}
                      <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                        <span>{product.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.gender}</span>
                      </div>

                      {/* Product Title */}
                      <h3
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="text-sm font-semibold text-stone-900 line-clamp-1 hover:text-stone-600 transition-colors cursor-pointer"
                        title={product.name}
                      >
                        {product.name}
                      </h3>
                      
                      <p className="text-xs text-stone-500 line-clamp-1">
                        {product.fabric}
                      </p>
                    </div>

                    {/* Price and Action Baseline */}
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-bold font-mono-num text-stone-900">
                          ₺{product.price.toLocaleString('tr-TR')}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs font-mono-num text-stone-400 line-through">
                            ₺{product.originalPrice.toLocaleString('tr-TR')}
                          </span>
                        )}
                      </div>

                      {/* Quick Detay button */}
                      <button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="text-xs font-semibold text-stone-900 hover:text-stone-600 transition-colors uppercase tracking-wider flex items-center gap-1"
                      >
                        İncele <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </section>

      {/* Brand Craftsmanship Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-stone-100 rounded-lg p-8 sm:p-12 border border-stone-200 grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-stone-500">01. Zanaat & Kumaş</div>
            <h4 className="text-lg font-serif-brand font-semibold text-stone-900">Doğal & Dayanıklı Lifler</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Sentetik dolgular yerine doğal Merinos yünü, Mısır pamuğu ve İtalyan kaşmiri ile sürdürülebilir lüks.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-stone-500">02. Mimari Terzilik</div>
            <h4 className="text-lg font-serif-brand font-semibold text-stone-900">Enes Öztürk İmzalı Kalıplar</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Her beden için milimetrik ayarlanan omuz dökümleri, rahat paça kesimleri ve zamansız proporsiyonlar.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-stone-500">03. Güvenli Sevkiyat</div>
            <h4 className="text-lg font-serif-brand font-semibold text-stone-900">Özel Koruma Kılıfı & Hızlı Kargo</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Tüm siparişler toz koruma kılıfları ve sertifikalı kutularla 2-3 iş günü içinde adresinize teslim edilir.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
