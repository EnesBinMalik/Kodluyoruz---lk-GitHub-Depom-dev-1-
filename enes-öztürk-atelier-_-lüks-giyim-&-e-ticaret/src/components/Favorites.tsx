import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import {
  StyledPrimaryButton,
  StyledSecondaryButton,
  StyledBackButton,
  StyledCartButton
} from './styled/Buttons';

export const Favorites: React.FC = () => {
  const { favorites, toggleFavorite, addToCart } = useShop();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      
      {/* Header Bar */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-stone-500">
                Kişisel İstek Listesi
              </div>
              <h1 className="text-3xl font-serif-brand font-semibold text-stone-900 mt-1">
                Favorilerim ({favorites.length})
              </h1>
            </div>
            
            <StyledBackButton onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4" /> Kataloğa Dön
            </StyledBackButton>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {favorites.length === 0 ? (
          <div className="bg-white rounded-lg border border-stone-200 p-12 text-center max-w-md mx-auto space-y-4 my-12 shadow-xs">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-serif-brand font-semibold text-stone-900">
              Favori Listeniz Henüz Boş
            </h2>
            <p className="text-xs text-stone-500 leading-relaxed">
              Beğendiğiniz kıyafetleri kalp ikonuna tıklayarak favorilerinize ekleyebilir, daha sonra kolayca inceleyip satın alabilirsiniz.
            </p>
            <div className="pt-2">
              <StyledPrimaryButton $size="md" onClick={() => navigate('/')}>
                Alışverişe Başla <ArrowRight className="w-4 h-4 ml-1" />
              </StyledPrimaryButton>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-xs text-stone-500">
              Favorilerinizdeki parçalar oturumunuz boyunca ve daha sonraki ziyaretleriniz için saklanmaktadır.
            </p>

            {/* Grid of favorited garments mapped with .map(...) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((product: Product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-md border border-stone-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="relative aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Remove from favorites button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product);
                      }}
                      className="absolute top-3 right-3 bg-white/90 text-rose-600 hover:bg-rose-50 p-2 rounded-full shadow-sm transition-colors"
                      title="Favorilerden Çıkar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider">
                        {product.category} · {product.gender}
                      </div>
                      <h3
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="text-sm font-semibold text-stone-900 truncate hover:text-stone-600 transition-colors cursor-pointer mt-0.5"
                      >
                        {product.name}
                      </h3>
                      <div className="text-base font-bold font-mono-num text-stone-900 mt-1">
                        ₺{product.price.toLocaleString('tr-TR')}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
                      <StyledPrimaryButton
                        $size="sm"
                        $fullWidth
                        onClick={() => {
                          addToCart(product, product.sizes[0] || 'M', product.colors[0]?.name || 'Standart');
                        }}
                      >
                        <ShoppingBag className="w-3.5 h-3.5 mr-1" /> Sepete Ekle
                      </StyledPrimaryButton>

                      <StyledSecondaryButton
                        $size="sm"
                        $fullWidth
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        Ürünü İncele
                      </StyledSecondaryButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
