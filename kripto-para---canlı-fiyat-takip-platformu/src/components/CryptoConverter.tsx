import React, { useState } from 'react';
import { ArrowRightLeft, X, RefreshCw } from 'lucide-react';
import { CryptoCoin, Currency } from '../types/crypto';
import { formatCurrency } from '../services/api';

interface CryptoConverterProps {
  coins: CryptoCoin[];
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
}

export const CryptoConverter: React.FC<CryptoConverterProps> = ({
  coins,
  isOpen,
  onClose,
  currency,
}) => {
  const [amount, setAmount] = useState<string>('1');
  const [fromCoinId, setFromCoinId] = useState<string>('bitcoin');
  const [targetType, setTargetType] = useState<'currency' | 'coin'>('currency');
  const [toCoinId, setToCoinId] = useState<string>('ethereum');

  if (!isOpen) return null;

  const fromCoin = coins.find((c) => c.id === fromCoinId) || coins[0];
  const toCoin = coins.find((c) => c.id === toCoinId) || coins[1];

  const parsedAmount = parseFloat(amount) || 0;

  // Calculation:
  // If target is currency: amount * fromCoin.current_price
  // If target is coin: (amount * fromCoin.current_price) / toCoin.current_price
  const calculatedResult =
    targetType === 'currency'
      ? fromCoin
        ? parsedAmount * fromCoin.current_price
        : 0
      : fromCoin && toCoin && toCoin.current_price > 0
      ? (parsedAmount * fromCoin.current_price) / toCoin.current_price
      : 0;

  const handleSwap = () => {
    if (targetType === 'coin') {
      const temp = fromCoinId;
      setFromCoinId(toCoinId);
      setToCoinId(temp);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Kripto Para Dönüştürücü</h3>
              <p className="text-[11px] text-slate-400">Canlı kurlarla anlık çeviri ve hesaplama</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 space-y-4">
          {/* Amount input & From Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Dönüştürülecek Varlık
            </label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-2.5">
              <input
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-transparent text-slate-100 font-mono text-base font-semibold focus:outline-none px-2"
              />
              <select
                value={fromCoinId}
                onChange={(e) => setFromCoinId(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none"
              >
                {coins.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.symbol.toUpperCase()} - {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap or Target Selector */}
          <div className="flex items-center justify-between px-2">
            <div className="inline-flex p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setTargetType('currency')}
                className={`px-3 py-1 rounded transition-colors ${
                  targetType === 'currency'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                İtibari Para ({currency.toUpperCase()})
              </button>
              <button
                type="button"
                onClick={() => setTargetType('coin')}
                className={`px-3 py-1 rounded transition-colors ${
                  targetType === 'coin'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Kripto Para
              </button>
            </div>

            {targetType === 'coin' && (
              <button
                type="button"
                onClick={handleSwap}
                className="p-2 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-slate-800 transition-colors"
                title="Varlıkları Değiştir"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Target Output */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Karşılığı
            </label>
            <div className="flex items-center justify-between gap-2 bg-slate-950 border border-slate-800 rounded-xl p-3">
              <div className="px-2 truncate">
                <span className="font-mono text-xl font-bold text-amber-400" data-tabular="true">
                  {targetType === 'currency'
                    ? formatCurrency(calculatedResult, currency)
                    : `${calculatedResult.toLocaleString('tr-TR', { maximumFractionDigits: 6 })} ${toCoin?.symbol.toUpperCase()}`}
                </span>
              </div>

              {targetType === 'coin' && (
                <select
                  value={toCoinId}
                  onChange={(e) => setToCoinId(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none"
                >
                  {coins.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.symbol.toUpperCase()} - {c.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        <div className="pt-2 text-center">
          <p className="text-[11px] text-slate-500 font-mono">
            1 {fromCoin?.symbol.toUpperCase()} = {formatCurrency(fromCoin?.current_price || 0, currency)}
          </p>
        </div>
      </div>
    </div>
  );
};
