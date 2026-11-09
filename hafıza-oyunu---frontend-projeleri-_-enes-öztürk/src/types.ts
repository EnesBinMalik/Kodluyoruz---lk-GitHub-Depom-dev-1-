export interface CardItem {
  id: string; // unique card instance id (0 to 11)
  pairId: number; // 0 to 5
  name: string;
  icon: string;
  color: string;
  bgGradient: string;
  isFlipped: boolean;
  isMatched: boolean; // when true, card is removed from screen
}

export type CardTheme = 'frontend' | 'tech_emoji' | 'arcade';

export interface ProjectItem {
  id: string;
  title: string;
  level: 1 | 2 | 3;
  status: 'completed' | 'active' | 'locked';
  description?: string;
}
