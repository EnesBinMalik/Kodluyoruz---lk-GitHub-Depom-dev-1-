import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';
import { api, INITIAL_PRODUCTS } from '../services/api';

interface ShopContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateCartQuantity: (productId: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  discountAmount: number;
  shippingFee: number;
  cartTotal: number;
  cartItemCount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  mockApiUrl: string;
  updateMockApiUrl: (url: string) => void;
  resetMockApiUrl: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'enes_ozturk_cart_v1';
const FAV_STORAGE_KEY = 'enes_ozturk_favs_v1';

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(FAV_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('ENES2026'); // Preloaded promo coupon for delight
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [mockApiUrl, setMockApiUrl] = useState<string>(api.getEndpoint());

  // Show auto-dismissing toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Sync Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [cart]);

  // Sync Favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [favorites]);

  // Initial load using Axios
  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Ürünler yüklenirken hata oluştu';
      setError(message);
      setProducts(INITIAL_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Cart operations
  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
    });
    showToast(`"${product.name}" (${size}) sepete eklendi.`);
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)
      )
    );
    showToast('Ürün sepetten kaldırıldı.');
  };

  const updateCartQuantity = (productId: string, size: string, color: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedSize === size && item.selectedColor === color) {
          return { ...item, quantity: qty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Free shipping over ₺1500
  const shippingFee = cartSubtotal > 1500 || cartSubtotal === 0 ? 0 : 79;

  // 15% discount for ENES2026 or 20%
  const discountRate = appliedCoupon === 'ENES2026' ? 0.2 : 0;
  const discountAmount = Math.round(cartSubtotal * discountRate);
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ENES2026' || clean === 'ENES' || clean === 'OZTURK') {
      setAppliedCoupon('ENES2026');
      showToast('%20 "ENES2026" indirim kodu başarıyla uygulandı!');
      return { success: true, message: '%20 İndirim uygulandı' };
    }
    return { success: false, message: 'Geçersiz kupon kodu. Deneyin: ENES2026' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Kupon kodu kaldırıldı.');
  };

  // Favorites operations
  const toggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`"${product.name}" favorilerden çıkarıldı.`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`"${product.name}" favorilere eklendi.`);
        return [...prev, product];
      }
    });
  };

  const isFavorite = (productId: string) => {
    return favorites.some((p) => p.id === productId);
  };

  const updateMockApiUrl = (url: string) => {
    api.setEndpoint(url);
    setMockApiUrl(api.getEndpoint());
    loadProducts();
    showToast('MockAPI.io adresi güncellendi ve veriler Axios ile tazelendi.');
  };

  const resetMockApiUrl = () => {
    api.resetDefaultEndpoint();
    setMockApiUrl(api.getEndpoint());
    loadProducts();
    showToast('Varsayılan MockAPI.io adresine dönüldü.');
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        loading,
        error,
        refreshProducts: loadProducts,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        discountAmount,
        shippingFee,
        cartTotal,
        cartItemCount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        favorites,
        toggleFavorite,
        isFavorite,
        toastMessage,
        showToast,
        isCartOpen,
        setIsCartOpen,
        mockApiUrl,
        updateMockApiUrl,
        resetMockApiUrl
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
