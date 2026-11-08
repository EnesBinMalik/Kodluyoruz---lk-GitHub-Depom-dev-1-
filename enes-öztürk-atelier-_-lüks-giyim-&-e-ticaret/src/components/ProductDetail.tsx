import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Check,
  Ruler,
  Star
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { api } from '../services/api';
import {
  StyledCartButton,
  StyledFavoriteButton,
  StyledBackButton,
  StyledPrimaryButton
} from './styled/Buttons';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, isFavorite, products } = useShop();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddedRecently, setIsAddedRecently] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);

  // Fetch product using Axios
  useEffect(() => {
    let isMounted = true;
    const fetchItem = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const item = await api.getProductById(id);
        if (isMounted && item) {
          setProduct(item);
          setSelectedImage(item.images[0] || '');
          setSelectedSize(item.sizes[0] || 'M');
          setSelectedColor(item.colors[0]?.name || 'Varsayılan');
        }
      } catch (err) {
        console.warn('Axios detail error', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchItem();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 py-24 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-2 border-stone-800 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-stone-600">Ürün detayları Axios ile yükleniyor...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 py-24 px-4 text-center space-y-6">
        <h2 className="text-2xl font-serif-brand font-bold text-stone-900">Ürün Bulunamadı</h2>
        <p className="text-sm text-stone-600">Aradığınız kıyafet mevcut değil veya stoktan kaldırılmış olabilir.</p>
        <StyledBackButton onClick={() => navigate('/')}>
          <ArrowLeft className="w-4 h-4" /> Anasayfaya Dön
        </StyledBackButton>
      </div>
    );
  }

  const favorited = isFavorite(product.id);

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsAddedRecently(true);
    setTimeout(() => {
      setIsAddedRecently(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      
      {/* Breadcrumb & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-stone-200">
        
        {/* Requirement: "Anasayfaya Dön" butonu ile Ürünler sayfasına geri dönebiliriz. */}
        <StyledBackButton
          onClick={() => navigate('/')}
          title="Ürünler sayfasına geri dön"
          aria-label="Anasayfaya Dön"
        >
          <ArrowLeft className="w-4 h-4" /> Anasayfaya Dön
        </StyledBackButton>

        {/* Clean breadcrumbs */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-stone-500">
          <Link to="/" className="hover:text-stone-900 transition-colors">Katalog</Link>
          <span>/</span>
          <span className="text-stone-700">{product.category}</span>
          <span>/</span>
          <span className="text-stone-950 font-medium truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Main Image */}
            <div className="relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-[4/5] bg-stone-100 rounded-lg overflow-hidden border border-stone-200 shadow-xs">
              <img
                src={selectedImage || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-stone-900 text-white text-xs font-mono uppercase tracking-widest px-2.5 py-1 rounded">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail switcher if multiple images */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-24 rounded border-2 overflow-hidden shrink-0 transition-all ${
                      selectedImage === img ? 'border-stone-900 ring-2 ring-stone-900/10' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} görünüm ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Product Craftsmanship Notes */}
            <div className="bg-white p-6 rounded-lg border border-stone-200 space-y-4 mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-stone-700" /> Kumaş & Materyal Özellikleri
              </h4>
              <div className="grid sm:grid-cols-2 gap-4 text-xs text-stone-600">
                <div>
                  <div className="font-semibold text-stone-900 mb-0.5">Kumaş Kompozisyonu:</div>
                  <div>{product.fabric}</div>
                </div>
                <div>
                  <div className="font-semibold text-stone-900 mb-0.5">Bakım & Yıkama:</div>
                  <div>{product.care}</div>
                </div>
                <div>
                  <div className="font-semibold text-stone-900 mb-0.5">Kalıp / Silüet:</div>
                  <div>Modern Relaxed Oversized Fit (Enes Öztürk İmzalı)</div>
                </div>
                <div>
                  <div className="font-semibold text-stone-900 mb-0.5">Üretim Yeri:</div>
                  <div>İstanbul Atelier Atölyesi (Sürdürülebilir Butik Üretim)</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200/90 shadow-sm space-y-6">
              
              {/* Category, Rating and Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="uppercase tracking-widest font-mono">{product.category} · {product.gender}</span>
                  <div className="flex items-center gap-1 text-amber-600 font-mono-num font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{product.rating}</span>
                    <span className="text-stone-400">({product.reviewsCount})</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif-brand font-semibold text-stone-900 leading-tight">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-3xl font-bold font-mono-num text-stone-950">
                    ₺{product.price.toLocaleString('tr-TR')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base font-mono-num text-stone-400 line-through">
                      ₺{product.originalPrice.toLocaleString('tr-TR')}
                    </span>
                  )}
                  <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    KDV Dahil
                  </span>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-sm text-stone-600 leading-relaxed font-light border-t border-b border-stone-100 py-4">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-stone-900">Renk: <span className="font-normal text-stone-600">{selectedColor}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor === color.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs transition-all ${
                          isSelected
                            ? 'border-stone-900 bg-stone-50 font-semibold text-stone-900 ring-1 ring-stone-900'
                            : 'border-stone-200 text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-stone-300"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selection with Size Guide Trigger */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-stone-900">Beden Seçimi</span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-stone-600 hover:text-stone-900 flex items-center gap-1 underline underline-offset-2"
                  >
                    <Ruler className="w-3.5 h-3.5" /> Beden Tablosu
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 text-xs font-semibold rounded transition-all text-center ${
                          isSelected
                            ? 'bg-stone-900 text-white shadow-xs'
                            : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-medium text-stone-900">Adet:</span>
                <div className="flex items-center border border-stone-300 rounded overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 bg-stone-50 hover:bg-stone-200 text-stone-800 text-sm font-semibold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-xs font-mono-num font-semibold text-stone-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 bg-stone-50 hover:bg-stone-200 text-stone-800 text-sm font-semibold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* REQUIRED STYLED COMPONENTS BUTTONS */}
              <div className="space-y-3 pt-2">
                {/* 1. "Sepete Ekle" (Add to Cart) */}
                <StyledCartButton
                  type="button"
                  $fullWidth
                  $added={isAddedRecently}
                  onClick={handleAddToCart}
                >
                  {isAddedRecently ? (
                    <>
                      <Check className="w-4 h-4" /> Sepete Eklendi
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Sepete Ekle
                    </>
                  )}
                </StyledCartButton>

                {/* 2. "Favorilere Ekle" (Add to Favorites) */}
                <StyledFavoriteButton
                  type="button"
                  style={{ width: '100%' }}
                  $isFavorited={favorited}
                  onClick={() => toggleFavorite(product)}
                >
                  <Heart className="w-4 h-4" />
                  <span>{favorited ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}</span>
                </StyledFavoriteButton>

                {/* 3. "Anasayfaya Dön" (Back to Home / Catalog) */}
                <StyledBackButton
                  type="button"
                  style={{ width: '100%' }}
                  onClick={() => navigate('/')}
                >
                  <ArrowLeft className="w-4 h-4" /> Anasayfaya Dön
                </StyledBackButton>
              </div>

              {/* Trust Badges */}
              <div className="border-t border-stone-100 pt-4 space-y-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-stone-800" />
                  <span>1.500 TL üzeri tüm Türkiye'ye ücretsiz ekspres kargo</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-stone-800" />
                  <span>14 gün içinde koşulsuz kolay iade ve değişim</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-stone-800" />
                  <span>%100 Orijinal Enes Öztürk sertifikalı ürün garantisi</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Related Clothing Items Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-stone-200">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-stone-500">Kombin Önerileri</span>
                <h3 className="text-2xl font-serif-brand font-semibold text-stone-900 mt-1">
                  Bu Parçayla İyi Gider
                </h3>
              </div>
              <Link to="/" className="text-xs font-semibold text-stone-900 hover:text-stone-600 uppercase tracking-wider">
                Tümünü Gör →
              </Link>
            </div>

            {/* Dinamik map fonksiyonu ile ilgili ürünler */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel: Product) => (
                <div
                  key={rel.id}
                  onClick={() => navigate(`/product/${rel.id}`)}
                  className="group bg-white rounded border border-stone-200 overflow-hidden cursor-pointer hover:border-stone-400 transition-all"
                >
                  <div className="aspect-[3/4] bg-stone-100 overflow-hidden">
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <div className="text-[11px] text-stone-500 font-medium">{rel.category}</div>
                    <div className="text-xs font-semibold text-stone-900 truncate mt-0.5">{rel.name}</div>
                    <div className="text-xs font-mono-num font-bold text-stone-900 mt-1">
                      ₺{rel.price.toLocaleString('tr-TR')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Beden Tablosu Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif-brand font-semibold text-lg text-stone-900">Beden Ölçü Tablosu (CM)</h3>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-stone-500">
              Enes Öztürk Atelier kalıpları hafif rahat (relaxed fit) kesimdir. Standart bedeninizi tercih edebilirsiniz.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-100 text-stone-700">
                  <tr>
                    <th className="p-2">Beden</th>
                    <th className="p-2">Göğüs</th>
                    <th className="p-2">Bel</th>
                    <th className="p-2">Basen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono-num">
                  <tr><td className="p-2 font-semibold">XS</td><td className="p-2">84-88</td><td className="p-2">68-72</td><td className="p-2">90-94</td></tr>
                  <tr><td className="p-2 font-semibold">S</td><td className="p-2">89-93</td><td className="p-2">73-77</td><td className="p-2">95-99</td></tr>
                  <tr><td className="p-2 font-semibold">M</td><td className="p-2">94-98</td><td className="p-2">78-82</td><td className="p-2">100-104</td></tr>
                  <tr><td className="p-2 font-semibold">L</td><td className="p-2">99-103</td><td className="p-2">83-87</td><td className="p-2">105-109</td></tr>
                  <tr><td className="p-2 font-semibold">XL</td><td className="p-2">104-110</td><td className="p-2">88-94</td><td className="p-2">110-116</td></tr>
                </tbody>
              </table>
            </div>
            <div className="pt-2">
              <StyledPrimaryButton $size="sm" $fullWidth onClick={() => setIsSizeGuideOpen(false)}>
                Anladım
              </StyledPrimaryButton>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
