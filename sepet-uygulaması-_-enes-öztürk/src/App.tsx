import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, SortOption, ToastMessage } from './types';
import { PRODUCTS, CATEGORIES, formatCurrency } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ClearCartConfirmModal } from './components/ClearCartConfirmModal';
import { CheckoutModal } from './components/CheckoutModal';
import { SignatureModal } from './components/SignatureModal';
import { ToastContainer } from './components/Toast';
import { Footer } from './components/Footer';
import { SlidersHorizontal, ArrowUpDown, ShoppingBag, Sparkles, RefreshCcw } from 'lucide-react';

const CART_STORAGE_KEY = 'enes_ozturk_cart_v1';

export default function App() {
  // Cart state with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    // Default initial cart with 1 headphones and 1 keyboard to showcase immediately
    return [
      { product: PRODUCTS[0], quantity: 1, addedAt: Date.now() },
      { product: PRODUCTS[3], quantity: 2, addedAt: Date.now() - 1000 }
    ];
  });

  // UI & Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('featured');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isSignatureOpen, setIsSignatureOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Promo code discount
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(0);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Toast dispatcher
  const addToast = (
    message: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'success',
    undoAction?: () => void
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, undoAction }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantityToAdd: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantityToAdd,
        };
        return next;
      } else {
        return [...prev, { product, quantity: quantityToAdd, addedAt: Date.now() }];
      }
    });

    addToast(
      `${product.name} sepete eklendi (${quantityToAdd > 1 ? `${quantityToAdd} adet` : '1 adet'})`,
      'success'
    );
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    const removedItem = cart.find((item) => item.product.id === productId);
    if (!removedItem) return;

    setCart((prev) => prev.filter((item) => item.product.id !== productId));

    addToast(
      `"${removedItem.product.name}" sepetten çıkarıldı.`,
      'info',
      () => {
        // Undo handler
        setCart((prev) => [...prev, removedItem]);
        addToast(`"${removedItem.product.name}" sepete geri yüklendi.`);
      }
    );
  };

  const handleClearCart = () => {
    if (cart.length === 0) return;
    const previousCart = [...cart];
    setCart([]);
    addToast(
      'Sepetteki tüm ürünler başarıyla temizlendi.',
      'info',
      () => {
        setCart(previousCart);
        addToast('Sepet geri yüklendi.');
      }
    );
  };

  const handleApplyCoupon = (code: string): boolean => {
    const upper = code.toUpperCase().trim();
    if (upper === 'ENES10') {
      setCouponCode(upper);
      setAppliedDiscountPercent(10);
      addToast('Tebrikler! %10 Enes Öztürk indirimi uygulandı.', 'success');
      return true;
    } else if (upper === 'OZTURK20') {
      setCouponCode(upper);
      setAppliedDiscountPercent(20);
      addToast('Harika! %20 VIP Öztürk indirimi uygulandı.', 'success');
      return true;
    } else if (upper === '') {
      setCouponCode('');
      setAppliedDiscountPercent(0);
      return true;
    }
    return false;
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Tümü' || product.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      return 0; // 'featured' keep original catalog order
    });
  }, [selectedCategory, searchQuery, sortOption]);

  // Derived totals
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedDiscountPercent > 0 ? (cartSubtotal * appliedDiscountPercent) / 100 : 0;
  const isFreeShipping = cartSubtotal >= 1000 || cartSubtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 59;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const getProductCartQuantity = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const scrollToCatalog = () => {
    document.getElementById('urun-katalogu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] selection:bg-slate-900 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        cartCount={totalItemCount}
        cartTotal={grandTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSignature={() => setIsSignatureOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Showcase Section */}
      <HeroBanner onExploreClick={scrollToCatalog} />

      {/* Main Content Area */}
      <main id="urun-katalogu" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Section Heading & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                Küratör: Enes Öztürk
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">{PRODUCTS.length} Özel Parça</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ürün Kataloğu & Seçkiler
            </h2>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5" />
              Sırala:
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-slate-400 shadow-2xs cursor-pointer"
            >
              <option value="featured">Öne Çıkanlar</option>
              <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
              <option value="rating">En Yüksek Puanlılar</option>
            </select>
          </div>
        </div>

        {/* Category Filter Tabs (Segmented Control style) */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 custom-scrollbar">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Search feedback indicator if query active */}
        {searchQuery && (
          <div className="mb-6 p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-600">
              "<strong className="text-slate-900">{searchQuery}</strong>" araması için{' '}
              <strong className="text-slate-900">{filteredProducts.length}</strong> sonuç bulundu.
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-amber-700 font-bold hover:underline cursor-pointer"
            >
              Aramayı Temizle
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-6">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Eşleşen Ürün Bulunamadı</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              Arama kriterlerinize uygun ürün bulunamadı. Lütfen farklı bir anahtar kelime deneyin ya da kategoriyi değiştirin.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tümü');
              }}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Tüm Ürünleri Göster
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantityInCart={getProductCartQuantity(product.id)}
                onAddToCart={handleAddToCart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveFromCart={handleRemoveItem}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}

        {/* Cart Quick Summary Floating Strip (visible when cart has items) */}
        {cart.length > 0 && (
          <div className="sticky bottom-6 mt-12 z-30 max-w-2xl mx-auto">
            <div className="bg-slate-900 text-white p-3.5 sm:p-4 rounded-2xl shadow-xl flex items-center justify-between gap-4 border border-slate-800 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-slate-900 text-[10px] font-black rounded-full flex items-center justify-center">
                    {totalItemCount}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>Sepetinizde {totalItemCount} Adet Ürün Var</span>
                  </div>
                  <div className="text-xs text-amber-400 font-extrabold tabular-nums">
                    Toplam: {formatCurrency(grandTotal)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsClearModalOpen(true)}
                  className="px-3 py-2 text-xs font-semibold text-rose-400 hover:text-white hover:bg-rose-950/50 rounded-xl transition-colors cursor-pointer border border-rose-900/50"
                  title="Sepetteki Tüm Ürünleri Boşalt"
                >
                  Sepeti Boşalt
                </button>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold rounded-xl transition-colors cursor-pointer shadow-xs active:scale-95"
                >
                  Sepeti İncele &gt;
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Cart Drawer Slide-over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCartRequest={() => setIsClearModalOpen(true)}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        appliedDiscountPercent={appliedDiscountPercent}
        onApplyCoupon={handleApplyCoupon}
      />

      {/* Clear Cart Confirmation Dialog */}
      <ClearCartConfirmModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={handleClearCart}
        itemCount={totalItemCount}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        discountPercent={appliedDiscountPercent}
        onOrderCompleted={() => {
          setCart([]);
          addToast('Siparişiniz tamamlandı! Sepetiniz sıfırlandı.', 'success');
        }}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        quantityInCart={quickViewProduct ? getProductCartQuantity(quickViewProduct.id) : 0}
      />

      {/* Developer Signature Modal */}
      <SignatureModal
        isOpen={isSignatureOpen}
        onClose={() => setIsSignatureOpen(false)}
      />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Footer with Enes Öztürk Signature */}
      <Footer onOpenSignature={() => setIsSignatureOpen(true)} />

    </div>
  );
}
