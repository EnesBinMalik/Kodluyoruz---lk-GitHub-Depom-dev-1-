import { ActivityLevel, BmiCalculationRecord, Gender } from '../types/bmi';
import { getBmiCategory } from '../data/bmiCategories';

export const STORAGE_LAST_INPUT_KEY = 'vki_last_input_v1';
export const STORAGE_HISTORY_KEY = 'vki_calculation_history_v1';

export interface BmiInputParams {
  heightCm: number;
  weightKg: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
}

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, { label: string; multiplier: number; desc: string }> = {
  sedentary: { label: 'Hareketsiz / Masa Başı', multiplier: 1.2, desc: 'Neredeyse hiç egzersiz yok' },
  light: { label: 'Hafif Hareketli', multiplier: 1.375, desc: 'Haftada 1-3 gün hafif spor/yürüyüş' },
  moderate: { label: 'Orta Derece Aktif', multiplier: 1.55, desc: 'Haftada 3-5 gün düzenli egzersiz' },
  active: { label: 'Çok Aktif', multiplier: 1.725, desc: 'Haftada 6-7 gün yoğun egzersiz' },
  very_active: { label: 'Aşırı Aktif / Sporcu', multiplier: 1.9, desc: 'Günde 2 kez ağır antrenman veya fiziksel iş' },
};

/**
 * Calculates BMI and all derived health metrics
 */
export function calculateAllMetrics(params: BmiInputParams): BmiCalculationRecord {
  const { heightCm, weightKg, age, gender, activityLevel } = params;
  
  // Safe bounds
  const validHeight = Math.max(80, Math.min(250, heightCm));
  const validWeight = Math.max(25, Math.min(300, weightKg));
  const validAge = Math.max(10, Math.min(120, age));

  const heightInMeters = validHeight / 100;
  const rawBmi = validWeight / (heightInMeters * heightInMeters);
  const bmi = Math.round(rawBmi * 10) / 10;

  const category = getBmiCategory(bmi);

  // Ideal weight range based on normal BMI 18.5 - 24.9
  const idealWeightMin = Math.round(18.5 * (heightInMeters * heightInMeters) * 10) / 10;
  const idealWeightMax = Math.round(24.9 * (heightInMeters * heightInMeters) * 10) / 10;

  // BMR (Mifflin-St Jeor formula)
  let bmr: number;
  if (gender === 'male') {
    bmr = 10 * validWeight + 6.25 * validHeight - 5 * validAge + 5;
  } else {
    bmr = 10 * validWeight + 6.25 * validHeight - 5 * validAge - 161;
  }
  const targetCalorieBmr = Math.round(bmr);

  // TDEE (Total Daily Energy Expenditure)
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel]?.multiplier || 1.375;
  const targetCalorieTdee = Math.round(bmr * multiplier);

  // Daily water recommendation in Liters (approx 33-35 ml/kg)
  const rawWater = (validWeight * 0.033);
  const dailyWaterLiters = Math.round(rawWater * 10) / 10;

  const now = new Date();
  const dateStr = now.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return {
    id: 'calc_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    timestamp: Date.now(),
    dateStr,
    heightCm: validHeight,
    weightKg: validWeight,
    age: validAge,
    gender,
    activityLevel,
    bmi,
    categoryKey: category.key,
    categoryName: category.name,
    idealWeightMin,
    idealWeightMax,
    targetCalorieBmr,
    targetCalorieTdee,
    dailyWaterLiters,
  };
}

/**
 * LocalStorage helpers
 */
export function getStoredLastInput(): BmiInputParams {
  try {
    const raw = localStorage.getItem(STORAGE_LAST_INPUT_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading stored input from localStorage', e);
  }
  return {
    heightCm: 172,
    weightKg: 70,
    age: 26,
    gender: 'female',
    activityLevel: 'moderate',
  };
}

export function saveLastInput(params: BmiInputParams): void {
  try {
    localStorage.setItem(STORAGE_LAST_INPUT_KEY, JSON.stringify(params));
  } catch (e) {
    console.error('Error saving input to localStorage', e);
  }
}

export function getStoredHistory(): BmiCalculationRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_HISTORY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading history from localStorage', e);
  }
  return [];
}

export function saveRecordToHistory(record: BmiCalculationRecord): BmiCalculationRecord[] {
  try {
    const existing = getStoredHistory();
    // Prepend new record, keep up to 20 records
    const updated = [record, ...existing.filter((item) => item.id !== record.id)].slice(0, 20);
    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving record to history', e);
    return [];
  }
}

export function deleteRecordFromHistory(id: string): BmiCalculationRecord[] {
  try {
    const existing = getStoredHistory();
    const filtered = existing.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (e) {
    console.error('Error deleting record from history', e);
    return [];
  }
}

export function clearAllHistory(): void {
  try {
    localStorage.removeItem(STORAGE_HISTORY_KEY);
  } catch (e) {
    console.error('Error clearing history', e);
  }
}
