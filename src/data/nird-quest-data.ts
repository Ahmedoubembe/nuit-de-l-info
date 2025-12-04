import { Chapter, Companion, Achievement } from '@/types/nird-quest';

export const initialCompanions: Companion[] = [
  {
    id: 'technician',
    name: 'Alex le Technicien',
    emoji: '🧑‍💻',
    bonus: '+15% dégâts',
    recruited: false,
    description: 'Expert en réparation et optimisation système',
  },
  {
    id: 'eco',
    name: 'Luna l\'Éco-déléguée',
    emoji: '🌿',
    bonus: '+10 moral',
    recruited: false,
    description: 'Passionnée par l\'écologie et la durabilité',
  },
  {
    id: 'teacher',
    name: 'Prof Martin',
    emoji: '📚',
    bonus: '+20% XP',
    recruited: false,
    description: 'Enseignant visionnaire et mentor',
  },
];

export const initialAchievements: Achievement[] = [
  {
    id: 'first_blood',
    title: 'Premier Sang',
    description: 'Remporte ton premier combat',
    emoji: '⚔️',
    unlocked: false,
  },
  {
    id: 'level_5',
    title: 'Apprenti Linux',
    description: 'Atteins le niveau 5',
    emoji: '🎓',
    unlocked: false,
  },
  {
    id: 'all_companions',
    title: 'L\'Union Fait la Force',
    description: 'Recrute tous les compagnons',
    emoji: '👥',
    unlocked: false,
  },
  {
    id: 'rich',
    title: 'Économe',
    description: 'Accumule 5000€ de budget',
    emoji: '💰',
    unlocked: false,
  },
  {
    id: 'hero',
    title: 'Héros de NIRD',
    description: 'Termine l\'aventure',
    emoji: '🏆',
    unlocked: false,
  },
  {
    id: 'pacifist',
    title: 'Diplomate',
    description: 'Évite 3 combats par la négociation',
    emoji: '🕊️',
    unlocked: false,
  },
];

export const distributions = {
  ubuntu: {
    name: 'Ubuntu',
    emoji: '🟠',
    attack: 10,
    defense: 8,
    hp: 120,
    description: 'Distribution équilibrée, parfaite pour débuter',
  },
  debian: {
    name: 'Debian',
    emoji: '🔴',
    attack: 8,
    defense: 12,
    hp: 140,
    description: 'Distribution stable et sécurisée',
  },
  arch: {
    name: 'Arch Linux',
    emoji: '🔵',
    attack: 15,
    defense: 5,
    hp: 100,
    description: 'Distribution puissante pour experts',
  },
};
