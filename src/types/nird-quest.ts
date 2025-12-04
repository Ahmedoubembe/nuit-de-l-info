// Types pour NIRD Quest

export type Distribution = 'ubuntu' | 'debian' | 'arch';

export interface PlayerStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  distribution: Distribution;
}

export interface Resources {
  budget: number;
  time: number;
  moral: number;
}

export interface Companion {
  id: string;
  name: string;
  emoji: string;
  bonus: string;
  recruited: boolean;
  description: string;
}

export interface Enemy {
  name: string;
  emoji: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  xpReward: number;
  budgetReward: number;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
}

export interface GameState {
  player: PlayerStats;
  resources: Resources;
  companions: Companion[];
  currentChapter: number;
  currentScene: number;
  achievements: Achievement[];
  inventory: string[];
  completedQuests: string[];
  choices: Record<string, string>;
}

export interface Choice {
  text: string;
  action: () => void;
  requirements?: {
    budget?: number;
    time?: number;
    moral?: number;
    level?: number;
  };
}

export interface Scene {
  id: string;
  speaker: string;
  emoji: string;
  text: string;
  choices?: Choice[];
  combat?: Enemy;
  rewards?: {
    xp?: number;
    budget?: number;
    time?: number;
    moral?: number;
    item?: string;
  };
  unlockCompanion?: string;
  nextScene?: number;
  nextChapter?: number;
}

export interface Chapter {
  id: number;
  title: string;
  description: string;
  scenes: Scene[];
}
