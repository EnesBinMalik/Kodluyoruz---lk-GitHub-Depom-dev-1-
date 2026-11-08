export type Gender = 'female' | 'male';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

export type BmiCategoryKey = 
  | 'underweight' 
  | 'normal' 
  | 'overweight' 
  | 'obese1' 
  | 'obese2' 
  | 'obese3';

export interface BmiCategoryInfo {
  key: BmiCategoryKey;
  name: string;
  shortLabel: string;
  rangeText: string;
  min: number;
  max: number;
  color: string;
  bgColor: string;
  borderColor: string;
  badgeClass: string;
  healthRisk: string;
  summary: string;
}

export interface MealItem {
  mealTime: string; // e.g. "08:00 - 09:00"
  mealName: string; // e.g. "Kahvaltı"
  description: string;
  caloriesEstimate: number;
  options: string[];
  tips?: string;
}

export interface DietDayPlan {
  dayName: string; // e.g. "Pazartesi"
  focus: string;
  targetCalories: number;
  meals: MealItem[];
}

export interface FoodSwap {
  avoid: string;
  prefer: string;
  reason: string;
}

export interface CategoryDietPlan {
  categoryKey: BmiCategoryKey;
  title: string;
  subtitle: string;
  dailyCalorieRange: string;
  waterFormulaPerKg: number; // e.g. 35 ml per kg
  macronutrientRatio: {
    protein: number; // percentage
    carbs: number;
    fat: number;
  };
  principles: string[];
  sampleDays: DietDayPlan[];
  healthySwaps: FoodSwap[];
  recommendedDrinks: string[];
  lifestyleAdvice: string[];
}

export interface BmiCalculationRecord {
  id: string;
  timestamp: number;
  dateStr: string;
  heightCm: number;
  weightKg: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  bmi: number;
  categoryKey: BmiCategoryKey;
  categoryName: string;
  idealWeightMin: number;
  idealWeightMax: number;
  targetCalorieBmr: number;
  targetCalorieTdee: number;
  dailyWaterLiters: number;
}
