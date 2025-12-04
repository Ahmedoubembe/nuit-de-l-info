'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Zap, Shield, User, BookOpen, Trophy, Save, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { GameState, Enemy, Scene, Distribution } from '@/types/nird-quest';
import { initialCompanions, initialAchievements, distributions } from '@/data/nird-quest-data';

type GameScreen = 'menu' | 'story' | 'combat' | 'victory' | 'gameover' | 'stats' | 'achievements';

export default function NirdQuestPage() {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('menu');
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [currentStoryText, setCurrentStoryText] = useState('');
  const [currentChoices, setCurrentChoices] = useState<any[]>([]);

  // Initialize new game
  const startNewGame = () => {
    const newState: GameState = {
      player: {
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
        hp: 100,
        maxHp: 100,
        attack: 10,
        defense: 5,
        distribution: 'ubuntu',
      },
      resources: {
        budget: 1000,
        time: 100,
        moral: 50,
      },
      companions: initialCompanions,
      currentChapter: 1,
      currentScene: 0,
      achievements: initialAchievements,
      inventory: [],
      completedQuests: [],
      choices: {},
    };
    setGameState(newState);
    saveGame(newState);
    startChapter1();
  };

  // Save game to localStorage
  const saveGame = (state: GameState) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nird-quest-save', JSON.stringify(state));
    }
  };

  // Load game from localStorage
  const loadGame = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nird-quest-save');
      if (saved) {
        const state = JSON.parse(saved);
        setGameState(state);
        continueStory(state);
      }
    }
  };

  // Check if save exists
  const hasSave = () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('nird-quest-save') !== null;
  };

  // Calculate damage with companion bonuses
  const calculateDamage = (baseDamage: number, isPlayer: boolean) => {
    let damage = baseDamage;
    if (isPlayer && gameState) {
      const technicianRecruited = gameState.companions.find(c => c.id === 'technician')?.recruited;
      if (technicianRecruited) {
        damage = Math.floor(damage * 1.15); // +15% damage
      }
    }
    return Math.max(1, damage);
  };

  // Player attacks
  const playerAttack = (attackType: 'normal' | 'special') => {
    if (!gameState || !currentEnemy || !playerTurn) return;

    let damage = gameState.player.attack;
    let cost = 0;

    if (attackType === 'special') {
      damage = Math.floor(damage * 1.8);
      cost = 10;

      if (gameState.resources.time < cost) {
        setCombatLog(prev => [...prev, '⚠️ Pas assez de temps pour cette attaque !']);
        return;
      }
    }

    damage = calculateDamage(damage, true);
    const actualDamage = Math.max(1, damage - currentEnemy.defense);

    const newEnemyHp = Math.max(0, currentEnemy.hp - actualDamage);
    setCurrentEnemy({ ...currentEnemy, hp: newEnemyHp });

    setCombatLog(prev => [
      ...prev,
      `⚔️ Tu utilises ${attackType === 'special' ? 'sudo rm -rf' : 'apt remove'} !`,
      `💥 ${actualDamage} dégâts infligés !`,
    ]);

    if (cost > 0) {
      setGameState(prev => prev ? {
        ...prev,
        resources: { ...prev.resources, time: prev.resources.time - cost }
      } : prev);
    }

    if (newEnemyHp <= 0) {
      // Victory!
      setTimeout(() => handleVictory(), 1000);
    } else {
      // Enemy turn
      setPlayerTurn(false);
      setTimeout(() => enemyAttack(), 1500);
    }
  };

  // Player defends
  const playerDefend = () => {
    if (!gameState || !playerTurn) return;

    setCombatLog(prev => [...prev, '🛡️ Tu actives ton firewall !']);

    // Temporarily increase defense
    setGameState(prev => prev ? {
      ...prev,
      player: { ...prev.player, defense: prev.player.defense + 5 }
    } : prev);

    setPlayerTurn(false);
    setTimeout(() => {
      enemyAttack();
      // Reset defense after enemy attack
      setGameState(prev => prev ? {
        ...prev,
        player: { ...prev.player, defense: prev.player.defense - 5 }
      } : prev);
    }, 1500);
  };

  // Player heals
  const playerHeal = () => {
    if (!gameState || !playerTurn) return;

    const cost = 20;
    if (gameState.resources.budget < cost) {
      setCombatLog(prev => [...prev, '⚠️ Pas assez de budget !']);
      return;
    }

    const healAmount = Math.floor(gameState.player.maxHp * 0.3);
    const newHp = Math.min(gameState.player.maxHp, gameState.player.hp + healAmount);

    setGameState(prev => prev ? {
      ...prev,
      player: { ...prev.player, hp: newHp },
      resources: { ...prev.resources, budget: prev.resources.budget - cost }
    } : prev);

    setCombatLog(prev => [
      ...prev,
      `💊 Tu utilises apt update && apt upgrade !`,
      `❤️ +${healAmount} HP !`,
    ]);

    setPlayerTurn(false);
    setTimeout(() => enemyAttack(), 1500);
  };

  // Enemy attacks
  const enemyAttack = () => {
    if (!gameState || !currentEnemy) return;

    const damage = Math.max(1, currentEnemy.attack - gameState.player.defense);
    const newHp = Math.max(0, gameState.player.hp - damage);

    setGameState(prev => prev ? {
      ...prev,
      player: { ...prev.player, hp: newHp }
    } : prev);

    setCombatLog(prev => [
      ...prev,
      `👾 ${currentEnemy.name} attaque !`,
      `💔 Tu perds ${damage} HP !`,
    ]);

    if (newHp <= 0) {
      setTimeout(() => setCurrentScreen('gameover'), 1000);
    } else {
      setPlayerTurn(true);
    }
  };

  // Handle victory
  const handleVictory = () => {
    if (!gameState || !currentEnemy) return;

    const xpGain = currentEnemy.xpReward;
    const budgetGain = currentEnemy.budgetReward;

    // Apply XP bonus from teacher
    const teacherRecruited = gameState.companions.find(c => c.id === 'teacher')?.recruited;
    const actualXpGain = teacherRecruited ? Math.floor(xpGain * 1.2) : xpGain;

    let newState = { ...gameState };
    newState.player.xp += actualXpGain;
    newState.resources.budget += budgetGain;

    // Check level up
    while (newState.player.xp >= newState.player.xpToNextLevel) {
      newState.player.xp -= newState.player.xpToNextLevel;
      newState.player.level += 1;
      newState.player.xpToNextLevel = Math.floor(newState.player.xpToNextLevel * 1.5);
      newState.player.maxHp += 20;
      newState.player.hp = newState.player.maxHp;
      newState.player.attack += 3;
      newState.player.defense += 2;

      // Achievement: Level 5
      if (newState.player.level === 5) {
        const achievement = newState.achievements.find(a => a.id === 'level_5');
        if (achievement) achievement.unlocked = true;
      }
    }

    // Achievement: First Blood
    const firstBlood = newState.achievements.find(a => a.id === 'first_blood');
    if (firstBlood && !firstBlood.unlocked) {
      firstBlood.unlocked = true;
    }

    // Achievement: Rich
    if (newState.resources.budget >= 5000) {
      const richAchievement = newState.achievements.find(a => a.id === 'rich');
      if (richAchievement) richAchievement.unlocked = true;
    }

    setGameState(newState);
    saveGame(newState);
    setCurrentScreen('victory');
  };

  // CHAPTER 1: L'ÉVEIL
  const startChapter1 = () => {
    setCurrentScreen('story');
    setCurrentStoryText(
      "Tu es élève dans un lycée ordinaire. Aujourd'hui, ton prof de technologie, M. Martin, a l'air particulièrement énervé..."
    );

    setTimeout(() => {
      setCurrentStoryText(
        "📚 Prof Martin : 'Vous savez combien notre école dépense chaque année pour les licences Windows et Office ? 10 000€ ! Et la moitié des PC sont trop lents pour fonctionner correctement...'"
      );

      setTimeout(() => {
        setCurrentStoryText(
          "📚 Prof Martin : 'J'ai une solution : LINUX. C'est gratuit, plus rapide, et on peut faire revivre nos vieux PC. Mais j'ai besoin d'aide. Es-tu prêt(e) à rejoindre la résistance NIRD ?'"
        );

        setCurrentChoices([
          {
            text: "✅ J'accepte ! Révolutionnons cette école !",
            action: () => acceptMission(),
          },
          {
            text: "🤔 C'est quoi Linux exactement ?",
            action: () => explainLinux(),
          },
          {
            text: "❌ Non merci, ça a l'air compliqué...",
            action: () => refuseMission(),
          },
        ]);
      }, 3000);
    }, 2000);
  };

  const acceptMission = () => {
    if (!gameState) return;

    setCurrentChoices([]);
    setCurrentStoryText(
      "📚 Prof Martin : 'Excellent ! Bienvenue dans la résistance NIRD ! Première mission : installer Linux sur 5 vieux PC qui traînent dans la salle informatique.'"
    );

    const newState = { ...gameState };
    newState.resources.moral += 10;
    setGameState(newState);

    setTimeout(() => {
      setCurrentStoryText(
        "Tu te diriges vers la salle informatique. Soudain, un étrange phénomène se produit... Les PC se mettent à vibrer !"
      );

      setTimeout(() => {
        setCurrentStoryText(
          "💀 Un VIRUS WINDOWS apparaît ! Il semble protéger les vieux systèmes..."
        );

        setTimeout(() => {
          startCombat({
            name: 'Virus Windows XP',
            emoji: '💀',
            hp: 50,
            maxHp: 50,
            attack: 8,
            defense: 2,
            xpReward: 50,
            budgetReward: 100,
            description: 'Un ancien virus qui refuse de mourir',
          });
        }, 2000);
      }, 2500);
    }, 2500);
  };

  const explainLinux = () => {
    setCurrentChoices([]);
    setCurrentStoryText(
      "📚 Prof Martin : 'Linux est un système d'exploitation libre et gratuit, créé par une communauté mondiale. Il est plus sécurisé, plus rapide, et respecte ta vie privée. Et surtout : il est GRATUIT !'"
    );

    setTimeout(() => {
      setCurrentChoices([
        {
          text: "✅ Ok, je comprends ! Je suis partant(e) !",
          action: () => acceptMission(),
        },
        {
          text: "❌ Toujours pas convaincu(e)...",
          action: () => refuseMission(),
        },
      ]);
    }, 3000);
  };

  const refuseMission = () => {
    setCurrentChoices([]);
    setCurrentStoryText(
      "📚 Prof Martin : 'Je comprends... C'est un grand changement. Mais si tu changes d'avis, je serai là.'"
    );

    setTimeout(() => {
      setCurrentStoryText(
        "FIN - Tu es retourné(e) à ta vie normale. Mais parfois, tu te demandes ce qui se serait passé si tu avais accepté..."
      );

      setTimeout(() => {
        setCurrentScreen('menu');
      }, 3000);
    }, 2500);
  };

  // Start combat
  const startCombat = (enemy: Enemy) => {
    setCurrentEnemy(enemy);
    setCombatLog([`💀 ${enemy.name} apparaît !`]);
    setPlayerTurn(true);
    setCurrentScreen('combat');
  };

  // Continue after victory
  const continueAfterVictory = () => {
    if (!gameState) return;

    setCurrentScreen('story');
    setCurrentStoryText(
      "🎉 Victoire ! Tu as vaincu le virus ! Le Prof Martin est impressionné."
    );

    setTimeout(() => {
      setCurrentStoryText(
        "📚 Prof Martin : 'Incroyable ! Tu as un vrai talent ! Tiens, j'ai quelque chose pour toi...'"
      );

      setTimeout(() => {
        setCurrentStoryText(
          "🎁 Tu as reçu : Clé USB bootable Ubuntu ! Tu peux maintenant installer Linux sur n'importe quel PC."
        );

        const newState = { ...gameState };
        newState.inventory.push('Clé USB Ubuntu');
        setGameState(newState);
        saveGame(newState);

        setTimeout(() => {
          chapter1Part2();
        }, 2500);
      }, 2500);
    }, 2500);
  };

  const chapter1Part2 = () => {
    setCurrentStoryText(
      "Tu commences à installer Ubuntu sur les 5 vieux PC. Pendant l'installation, un élève s'approche..."
    );

    setTimeout(() => {
      setCurrentStoryText(
        "🧑‍💻 Élève : 'Waouh ! Tu installes Linux ? Je m'appelle Alex, je suis passionné d'informatique ! Je peux t'aider ?'"
      );

      setCurrentChoices([
        {
          text: "✅ Bien sûr ! Bienvenue dans l'équipe !",
          action: () => recruitAlex(),
        },
        {
          text: "🤷 Non merci, je préfère travailler seul(e)",
          action: () => refuseAlex(),
        },
      ]);
    }, 3000);
  };

  const recruitAlex = () => {
    if (!gameState) return;

    setCurrentChoices([]);
    const newState = { ...gameState };
    const alex = newState.companions.find(c => c.id === 'technician');
    if (alex) alex.recruited = true;
    newState.resources.moral += 15;
    setGameState(newState);
    saveGame(newState);

    setCurrentStoryText(
      "🎉 Alex rejoint ton équipe ! Bonus : +15% dégâts en combat !"
    );

    setTimeout(() => {
      continueChapter1();
    }, 2500);
  };

  const refuseAlex = () => {
    setCurrentChoices([]);
    setCurrentStoryText(
      "Alex semble déçu mais comprend. Il s'en va..."
    );

    setTimeout(() => {
      continueChapter1();
    }, 2500);
  };

  const continueChapter1 = () => {
    setCurrentStoryText(
      "Après plusieurs heures de travail, les 5 PC sont maintenant sous Ubuntu. Ils tournent parfaitement !"
    );

    setTimeout(() => {
      setCurrentStoryText(
        "📚 Prof Martin : 'Excellent travail ! Grâce à toi, nous avons économisé 2000€ et sauvé 5 PC de la poubelle !'"
      );

      setTimeout(() => {
        if (!gameState) return;
        const newState = { ...gameState };
        newState.resources.budget += 2000;
        newState.resources.moral += 20;
        newState.currentChapter = 2;
        setGameState(newState);
        saveGame(newState);

        setCurrentStoryText(
          "🎉 Chapitre 1 terminé ! Budget: +2000€ | Moral: +20"
        );

        setTimeout(() => {
          startChapter2();
        }, 3000);
      }, 2500);
    }, 2500);
  };

  // CHAPTER 2: LA FORMATION
  const startChapter2 = () => {
    setCurrentStoryText(
      "📖 CHAPITRE 2 : LA FORMATION"
    );

    setTimeout(() => {
      setCurrentStoryText(
        "Les jours passent. Ton succès commence à se répandre dans l'école. Mais tu as encore beaucoup à apprendre..."
      );

      setTimeout(() => {
        setCurrentStoryText(
          "📚 Prof Martin : 'Il est temps d'apprendre les vraies commandes Linux. Tu vas affronter des bugs réels !'"
        );

        setTimeout(() => {
          setCurrentStoryText(
            "💾 Un BUG SYSTÈME apparaît dans le réseau de l'école !"
          );

          setTimeout(() => {
            startCombat({
              name: 'Bug Système',
              emoji: '🐛',
              hp: 80,
              maxHp: 80,
              attack: 12,
              defense: 4,
              xpReward: 100,
              budgetReward: 200,
              description: 'Un bug qui fait planter les serveurs',
            });
          }, 2000);
        }, 2500);
      }, 2500);
    }, 2000);
  };

  const continueChapter2 = () => {
    setCurrentStoryText(
      "🎉 Bug éliminé ! Le réseau fonctionne à nouveau parfaitement !"
    );

    setTimeout(() => {
      setCurrentStoryText(
        "Une jeune fille s'approche de toi, c'est Luna, l'éco-déléguée..."
      );

      setTimeout(() => {
        setCurrentStoryText(
          "🌿 Luna : 'J'ai entendu parler de ton projet ! Tu sais que Linux consomme moins d'énergie et prolonge la vie des PC ? C'est génial pour la planète ! Je veux aider !'"
        );

        setCurrentChoices([
          {
            text: "✅ Parfait ! Ton expertise écolo sera précieuse !",
            action: () => recruitLuna(),
          },
          {
            text: "❌ Merci mais je gère",
            action: () => refuseLuna(),
          },
        ]);
      }, 2500);
    }, 2500);
  };

  const recruitLuna = () => {
    if (!gameState) return;

    setCurrentChoices([]);
    const newState = { ...gameState };
    const luna = newState.companions.find(c => c.id === 'eco');
    if (luna) luna.recruited = true;
    newState.resources.moral += 20;
    setGameState(newState);
    saveGame(newState);

    setCurrentStoryText(
      "🎉 Luna rejoint ton équipe ! Bonus : +10 moral permanent !"
    );

    setTimeout(() => {
      finishChapter2();
    }, 2500);
  };

  const refuseLuna = () => {
    setCurrentChoices([]);
    setCurrentStoryText(
      "Luna semble déçue mais respecte ta décision."
    );

    setTimeout(() => {
      finishChapter2();
    }, 2500);
  };

  const finishChapter2 = () => {
    if (!gameState) return;

    setCurrentStoryText(
      "Tu as appris de nombreuses commandes Linux et renforcé ton équipe. Il est temps de passer à l'action !"
    );

    const newState = { ...gameState };
    newState.currentChapter = 3;
    setGameState(newState);
    saveGame(newState);

    setTimeout(() => {
      startChapter3();
    }, 3000);
  };

  // CHAPTER 3: LA MOBILISATION
  const startChapter3 = () => {
    setCurrentStoryText(
      "📖 CHAPITRE 3 : LA MOBILISATION"
    );

    setTimeout(() => {
      setCurrentStoryText(
        "Ton projet a attiré l'attention. Le proviseur veut te rencontrer..."
      );

      setTimeout(() => {
        setCurrentStoryText(
          "👔 Proviseur : 'J'ai entendu parler de votre... projet Linux. Vous pensez vraiment pouvoir remplacer Windows dans TOUTE l'école ?'"
        );

        setCurrentChoices([
          {
            text: "💰 'Oui ! On économisera 10 000€ par an !'",
            action: () => convinceProvisionneur('budget'),
          },
          {
            text: "🌱 'C'est aussi pour l'écologie ! Moins de déchets électroniques !'",
            action: () => convinceProvisionneur('eco'),
          },
          {
            text: "⚡ 'Les PC seront plus rapides et plus sûrs !'",
            action: () => convinceProvisionneur('tech'),
          },
        ]);
      }, 2500);
    }, 2000);
  };

  const convinceProvisionneur = (argument: string) => {
    if (!gameState) return;

    setCurrentChoices([]);
    let response = '';
    let success = false;

    if (argument === 'budget') {
      response = "👔 Proviseur : '10 000€ par an... C'est vrai que c'est tentant. Ok, vous avez ma bénédiction ! Mais je veux des résultats !'";
      success = true;
    } else if (argument === 'eco' && gameState.companions.find(c => c.id === 'eco')?.recruited) {
      response = "👔 Proviseur : 'L'argument écologique est important. Et je vois que vous avez le soutien de notre éco-déléguée. Très bien, allez-y !'";
      success = true;
    } else if (argument === 'tech' && gameState.companions.find(c => c.id === 'technician')?.recruited) {
      response = "👔 Proviseur : 'La sécurité et la performance sont cruciales. Votre expertise technique me rassure. Feu vert !'";
      success = true;
    } else {
      response = "👔 Proviseur : 'Hmm... Je ne suis pas encore convaincu. Vous aurez besoin de plus d'arguments... et peut-être de soutien.'";
      success = false;
    }

    setCurrentStoryText(response);

    if (success) {
      const newState = { ...gameState };
      newState.resources.moral += 25;
      newState.resources.budget += 1000;
      setGameState(newState);
      saveGame(newState);

      setTimeout(() => {
        continueChapter3Success();
      }, 3000);
    } else {
      setTimeout(() => {
        setCurrentStoryText(
          "Le proviseur refuse ta demande. Tu devras trouver un autre moyen..."
        );

        setTimeout(() => {
          continueChapter3Fail();
        }, 2500);
      }, 2500);
    }
  };

  const continueChapter3Success = () => {
    setCurrentStoryText(
      "🎉 Le proviseur approuve le projet ! Tu as l'autorisation officielle de migrer toute l'école !"
    );

    setTimeout(() => {
      setCurrentStoryText(
        "Mais Microsoft n'est pas content... Un virus puissant attaque le réseau !"
      );

      setTimeout(() => {
        startCombat({
          name: 'Microsoft Defender (corrompu)',
          emoji: '🛡️💀',
          hp: 120,
          maxHp: 120,
          attack: 18,
          defense: 8,
          xpReward: 200,
          budgetReward: 500,
          description: 'Un antivirus devenu malveillant',
        });
      }, 2000);
    }, 2500);
  };

  const continueChapter3Fail = () => {
    setCurrentStoryText(
      "Sans l'approbation officielle, le projet stagne. Tu perds en moral et en temps..."
    );

    if (!gameState) return;
    const newState = { ...gameState };
    newState.resources.moral -= 20;
    newState.resources.time -= 30;
    setGameState(newState);
    saveGame(newState);

    setTimeout(() => {
      setCurrentStoryText(
        "Tu décides de continuer en secret. Mais les choses vont se compliquer..."
      );

      setTimeout(() => {
        finishChapter3();
      }, 2500);
    }, 2500);
  };

  const finishChapter3 = () => {
    if (!gameState) return;

    const newState = { ...gameState };
    newState.currentChapter = 4;
    setGameState(newState);
    saveGame(newState);

    setCurrentStoryText(
      "Chapitre 3 terminé ! La mobilisation continue..."
    );

    setTimeout(() => {
      startChapter4();
    }, 3000);
  };

  // CHAPTER 4: LA TRANSFORMATION
  const startChapter4 = () => {
    setCurrentStoryText(
      "📖 CHAPITRE 4 : LA TRANSFORMATION"
    );

    setTimeout(() => {
      setCurrentStoryText(
        "C'est le grand jour ! La migration de toute l'école commence. 100 PC à migrer vers Linux !"
      );

      setTimeout(() => {
        setCurrentStoryText(
          "Mais au milieu de l'installation, un MEGA-BUG apparaît ! Il menace de tout détruire !"
        );

        setTimeout(() => {
          startCombat({
            name: 'MEGA-BUG BLUESCREEN',
            emoji: '💀💻',
            hp: 200,
            maxHp: 200,
            attack: 25,
            defense: 10,
            xpReward: 500,
            budgetReward: 1000,
            description: 'Le boss de l\'écran bleu de la mort',
          });
        }, 2000);
      }, 2500);
    }, 2500);
  };

  const finishChapter4 = () => {
    if (!gameState) return;

    setCurrentStoryText(
      "🎉 VICTOIRE ÉPIQUE ! Le MEGA-BUG est vaincu ! Tous les PC sont maintenant sous Linux !"
    );

    setTimeout(() => {
      setCurrentStoryText(
        "📚 Prof Martin : 'Incroyable ! Tu as réussi ! Toute l'école tourne maintenant sur Linux ! Tu es un héros !'"
      );

      setTimeout(() => {
        const newState = { ...gameState };
        newState.resources.budget += 5000;
        newState.resources.moral = 100;
        newState.currentChapter = 5;

        // Recruit Prof Martin
        const prof = newState.companions.find(c => c.id === 'teacher');
        if (prof) prof.recruited = true;

        // Check all companions achievement
        const allRecruited = newState.companions.every(c => c.recruited);
        if (allRecruited) {
          const achievement = newState.achievements.find(a => a.id === 'all_companions');
          if (achievement) achievement.unlocked = true;
        }

        setGameState(newState);
        saveGame(newState);

        setCurrentStoryText(
          "🎉 Prof Martin rejoint officiellement ton équipe ! L'école a économisé 10 000€ !"
        );

        setTimeout(() => {
          startChapter5();
        }, 3000);
      }, 2500);
    }, 2500);
  };

  // CHAPTER 5: L'EXPANSION
  const startChapter5 = () => {
    setCurrentStoryText(
      "📖 CHAPITRE 5 : L'EXPANSION"
    );

    setTimeout(() => {
      setCurrentStoryText(
        "Ton succès fait le tour de la région. D'autres écoles veulent migrer vers Linux. Mais l'Empire Big Tech n'est pas content..."
      );

      setTimeout(() => {
        setCurrentStoryText(
          "☠️ Le CEO de BigTech Corp en personne vient t'affronter ! Il veut détruire ton projet et forcer les écoles à rester sur Windows !"
        );

        setTimeout(() => {
          setCurrentStoryText(
            "⚔️ BOSS FINAL : CEO de BigTech Corp !"
          );

          setTimeout(() => {
            startCombat({
              name: 'CEO BigTech',
              emoji: '👔💀',
              hp: 300,
              maxHp: 300,
              attack: 35,
              defense: 15,
              xpReward: 1000,
              budgetReward: 10000,
              description: 'Le boss final qui veut préserver son monopole',
            });
          }, 2000);
        }, 2500);
      }, 2500);
    }, 2500);
  };

  const finishGame = () => {
    if (!gameState) return;

    setCurrentStoryText(
      "🎉🎉🎉 VICTOIRE FINALE ! Le CEO de BigTech est vaincu ! Le monopole est brisé !"
    );

    setTimeout(() => {
      setCurrentStoryText(
        "Des dizaines d'écoles migrent maintenant vers Linux. Tu as créé un véritable mouvement ! La résistance NIRD a gagné !"
      );

      setTimeout(() => {
        const newState = { ...gameState };
        const heroAchievement = newState.achievements.find(a => a.id === 'hero');
        if (heroAchievement) heroAchievement.unlocked = true;

        setGameState(newState);
        saveGame(newState);

        setCurrentStoryText(
          "🏆 FIN - Tu es devenu(e) une légende de NIRD ! Merci d'avoir joué !"
        );

        setTimeout(() => {
          setCurrentScreen('achievements');
        }, 4000);
      }, 3000);
    }, 3000);
  };

  // Continue story based on chapter
  const continueStory = (state: GameState) => {
    if (state.currentChapter === 1) {
      startChapter1();
    } else if (state.currentChapter === 2) {
      startChapter2();
    } else if (state.currentChapter === 3) {
      startChapter3();
    } else if (state.currentChapter === 4) {
      startChapter4();
    } else if (state.currentChapter === 5) {
      startChapter5();
    }
  };

  // Handle victory screen based on chapter
  const handleVictoryScreenContinue = () => {
    if (!gameState) return;

    if (gameState.currentChapter === 1) {
      continueAfterVictory();
    } else if (gameState.currentChapter === 2) {
      continueChapter2();
    } else if (gameState.currentChapter === 3) {
      finishChapter3();
    } else if (gameState.currentChapter === 4) {
      finishChapter4();
    } else if (gameState.currentChapter === 5) {
      finishGame();
    }
  };

  // RENDER FUNCTIONS

  if (currentScreen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="bg-gray-900 border-4 border-yellow-500 rounded-2xl p-8 shadow-2xl">
            {/* Title */}
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-5xl md:text-6xl font-black mb-4 text-yellow-400 pixel-font">
                🐧 NIRD QUEST ⚔️
              </h1>
              <p className="text-xl text-gray-300">
                L&apos;Aventure RPG du Logiciel Libre
              </p>
            </motion.div>

            {/* Menu Buttons */}
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={startNewGame}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-xl text-lg border-2 border-green-400 shadow-lg"
              >
                ⚔️ Nouvelle Partie
              </motion.button>

              {hasSave() && (
                <motion.button
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={loadGame}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl text-lg border-2 border-blue-400 shadow-lg"
                >
                  💾 Continuer
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (hasSave()) {
                    loadGame();
                    setCurrentScreen('achievements');
                  }
                }}
                disabled={!hasSave()}
                className={`w-full ${
                  hasSave()
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 border-purple-400'
                    : 'bg-gray-700 border-gray-600 cursor-not-allowed'
                } text-white font-bold py-4 px-6 rounded-xl text-lg border-2 shadow-lg`}
              >
                🏆 Succès
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, x: -10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/jeux')}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-4 px-6 rounded-xl text-lg border-2 border-gray-400 shadow-lg"
              >
                ← Retour aux jeux
              </motion.button>
            </div>

            {/* Info */}
            <div className="mt-8 text-center text-gray-400 text-sm">
              <p>🎮 RPG narratif avec combats au tour par tour</p>
              <p>⏱️ Durée : 20-30 minutes</p>
              <p>💾 Sauvegarde automatique</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentScreen === 'story') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black p-4">
        <div className="container mx-auto max-w-4xl pt-8">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setCurrentScreen('menu')}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full border-2 border-gray-600 text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            Menu
          </motion.button>

          {/* Stats Bar */}
          {gameState && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-gray-900 border-2 border-yellow-500 rounded-xl p-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-yellow-400">Niv.{gameState.player.level}</div>
                  <div className="text-xs text-gray-400">Niveau</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-400">
                    {gameState.player.hp}/{gameState.player.maxHp}
                  </div>
                  <div className="text-xs text-gray-400">HP</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">{gameState.resources.budget}€</div>
                  <div className="text-xs text-gray-400">Budget</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">{gameState.resources.time}</div>
                  <div className="text-xs text-gray-400">Temps</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">{gameState.resources.moral}</div>
                  <div className="text-xs text-gray-400">Moral</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Story Text */}
          <motion.div
            key={currentStoryText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 border-4 border-blue-500 rounded-2xl p-8 mb-6 min-h-[300px]"
          >
            <p className="text-xl md:text-2xl text-white leading-relaxed whitespace-pre-wrap">
              {currentStoryText}
            </p>
          </motion.div>

          {/* Choices */}
          {currentChoices.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {currentChoices.map((choice, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={choice.action}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl text-left border-2 border-purple-400"
                >
                  {choice.text}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  if (currentScreen === 'combat' && gameState && currentEnemy) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-black p-4">
        <div className="container mx-auto max-w-4xl pt-8">
          {/* Combat Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h2 className="text-4xl font-black text-yellow-400 mb-2">⚔️ COMBAT ⚔️</h2>
          </motion.div>

          {/* Combatants */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Player */}
            <motion.div
              animate={{ scale: playerTurn ? 1.05 : 1 }}
              className="bg-blue-900 border-4 border-blue-400 rounded-2xl p-6"
            >
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">🐧</div>
                <h3 className="text-2xl font-bold text-white">TOI</h3>
                <div className="text-sm text-gray-300">Niveau {gameState.player.level}</div>
              </div>

              {/* Player HP Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-white mb-1">
                  <span>HP</span>
                  <span>{gameState.player.hp}/{gameState.player.maxHp}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <motion.div
                    initial={{ width: `${(gameState.player.hp / gameState.player.maxHp) * 100}%` }}
                    animate={{ width: `${(gameState.player.hp / gameState.player.maxHp) * 100}%` }}
                    className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full"
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-red-800 rounded px-2 py-1">
                  <span className="text-gray-300">⚔️ ATK:</span>{' '}
                  <span className="text-white font-bold">{gameState.player.attack}</span>
                </div>
                <div className="bg-blue-800 rounded px-2 py-1">
                  <span className="text-gray-300">🛡️ DEF:</span>{' '}
                  <span className="text-white font-bold">{gameState.player.defense}</span>
                </div>
              </div>
            </motion.div>

            {/* Enemy */}
            <motion.div
              animate={{ scale: !playerTurn ? 1.05 : 1 }}
              className="bg-red-900 border-4 border-red-400 rounded-2xl p-6"
            >
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">{currentEnemy.emoji}</div>
                <h3 className="text-2xl font-bold text-white">{currentEnemy.name}</h3>
                <div className="text-sm text-gray-300">{currentEnemy.description}</div>
              </div>

              {/* Enemy HP Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-white mb-1">
                  <span>HP</span>
                  <span>{currentEnemy.hp}/{currentEnemy.maxHp}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <motion.div
                    initial={{ width: `${(currentEnemy.hp / currentEnemy.maxHp) * 100}%` }}
                    animate={{ width: `${(currentEnemy.hp / currentEnemy.maxHp) * 100}%` }}
                    className="bg-gradient-to-r from-red-500 to-red-600 h-4 rounded-full"
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-red-800 rounded px-2 py-1">
                  <span className="text-gray-300">⚔️ ATK:</span>{' '}
                  <span className="text-white font-bold">{currentEnemy.attack}</span>
                </div>
                <div className="bg-blue-800 rounded px-2 py-1">
                  <span className="text-gray-300">🛡️ DEF:</span>{' '}
                  <span className="text-white font-bold">{currentEnemy.defense}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Combat Log */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 border-2 border-gray-600 rounded-xl p-4 mb-6 h-32 overflow-y-auto"
          >
            {combatLog.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-white text-sm mb-1"
              >
                {log}
              </motion.div>
            ))}
          </motion.div>

          {/* Actions */}
          {playerTurn && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => playerAttack('normal')}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-xl border-2 border-red-400"
              >
                ⚔️ apt remove
                <div className="text-xs mt-1">Attaque normale</div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => playerAttack('special')}
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-4 px-6 rounded-xl border-2 border-orange-400"
              >
                💥 sudo rm -rf
                <div className="text-xs mt-1">Attaque puissante (-10 temps)</div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={playerDefend}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl border-2 border-blue-400"
              >
                🛡️ firewall
                <div className="text-xs mt-1">Augmente défense</div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={playerHeal}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-xl border-2 border-green-400"
              >
                💊 apt update
                <div className="text-xs mt-1">Soigne 30% HP (-20€)</div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentScreen('stats')}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 px-6 rounded-xl border-2 border-purple-400"
              >
                📊 Stats
                <div className="text-xs mt-1">Voir infos</div>
              </motion.button>
            </motion.div>
          )}

          {!playerTurn && (
            <div className="text-center text-yellow-400 text-xl font-bold animate-pulse">
              ⏳ Tour de l&apos;ennemi...
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentScreen === 'victory' && gameState && currentEnemy) {
    const xpGain = currentEnemy.xpReward;
    const budgetGain = currentEnemy.budgetReward;
    const teacherRecruited = gameState.companions.find(c => c.id === 'teacher')?.recruited;
    const actualXpGain = teacherRecruited ? Math.floor(xpGain * 1.2) : xpGain;

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-green-900 to-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="bg-gray-900 border-4 border-yellow-400 rounded-2xl p-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring' }}
              className="text-center mb-6"
            >
              <div className="text-8xl mb-4">🎉</div>
              <h2 className="text-5xl font-black text-yellow-400 mb-4">VICTOIRE !</h2>
            </motion.div>

            <div className="bg-gray-800 rounded-xl p-6 mb-6">
              <div className="text-center text-white space-y-3">
                <div className="text-2xl">
                  ✅ {currentEnemy.name} vaincu !
                </div>
                <div className="text-xl text-green-400">
                  +{actualXpGain} XP {teacherRecruited && '(+20% bonus Prof)'}
                </div>
                <div className="text-xl text-yellow-400">
                  +{budgetGain}€
                </div>
                {gameState.player.level > 1 && (
                  <div className="text-xl text-purple-400">
                    🎉 Niveau {gameState.player.level} atteint !
                  </div>
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVictoryScreenContinue}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-xl text-xl border-2 border-green-400"
            >
              → Continuer l&apos;aventure
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentScreen === 'gameover') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="bg-gray-900 border-4 border-red-500 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">💀</div>
              <h2 className="text-5xl font-black text-red-500 mb-4">GAME OVER</h2>
              <p className="text-xl text-gray-300">
                Tu as été vaincu... Mais tu peux réessayer !
              </p>
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startNewGame}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-xl border-2 border-green-400"
              >
                <RotateCcw className="inline mr-2" />
                Recommencer
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentScreen('menu')}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-4 px-6 rounded-xl border-2 border-gray-400"
              >
                Menu principal
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentScreen === 'stats' && gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black p-4">
        <div className="container mx-auto max-w-4xl pt-8">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setCurrentScreen('combat')}
            className="mb-6 px-4 py-2 bg-gray-800 rounded-full border-2 border-gray-600 text-white"
          >
            ← Retour au combat
          </motion.button>

          <div className="bg-gray-900 border-4 border-purple-500 rounded-2xl p-8">
            <h2 className="text-4xl font-black text-yellow-400 mb-6 text-center">📊 Statistiques</h2>

            {/* Player Stats */}
            <div className="mb-6 bg-gray-800 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">🐧 Héros</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-400">Niveau</div>
                  <div className="text-2xl font-bold text-yellow-400">{gameState.player.level}</div>
                </div>
                <div>
                  <div className="text-gray-400">XP</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {gameState.player.xp}/{gameState.player.xpToNextLevel}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">HP</div>
                  <div className="text-2xl font-bold text-red-400">
                    {gameState.player.hp}/{gameState.player.maxHp}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Distribution</div>
                  <div className="text-2xl font-bold text-green-400">
                    {distributions[gameState.player.distribution].emoji}{' '}
                    {distributions[gameState.player.distribution].name}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Attaque</div>
                  <div className="text-2xl font-bold text-orange-400">⚔️ {gameState.player.attack}</div>
                </div>
                <div>
                  <div className="text-gray-400">Défense</div>
                  <div className="text-2xl font-bold text-blue-400">🛡️ {gameState.player.defense}</div>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="mb-6 bg-gray-800 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">💼 Ressources</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-gray-400">Budget</div>
                  <div className="text-2xl font-bold text-green-400">{gameState.resources.budget}€</div>
                </div>
                <div>
                  <div className="text-gray-400">Temps</div>
                  <div className="text-2xl font-bold text-blue-400">{gameState.resources.time}</div>
                </div>
                <div>
                  <div className="text-gray-400">Moral</div>
                  <div className="text-2xl font-bold text-purple-400">{gameState.resources.moral}</div>
                </div>
              </div>
            </div>

            {/* Companions */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">👥 Compagnons</h3>
              <div className="space-y-3">
                {gameState.companions.map(companion => (
                  <div
                    key={companion.id}
                    className={`p-4 rounded-lg ${
                      companion.recruited
                        ? 'bg-green-900 border-2 border-green-500'
                        : 'bg-gray-700 border-2 border-gray-600 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{companion.emoji}</div>
                      <div className="flex-1">
                        <div className="font-bold text-white">{companion.name}</div>
                        <div className="text-sm text-gray-300">{companion.description}</div>
                        <div className="text-sm text-yellow-400">{companion.bonus}</div>
                      </div>
                      {companion.recruited ? (
                        <div className="text-green-400 font-bold">✓ Recruté</div>
                      ) : (
                        <div className="text-gray-500">Pas recruté</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'achievements' && gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-purple-900 to-black p-4">
        <div className="container mx-auto max-w-4xl pt-8">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setCurrentScreen('menu')}
            className="mb-6 px-4 py-2 bg-gray-800 rounded-full border-2 border-gray-600 text-white"
          >
            ← Menu
          </motion.button>

          <div className="bg-gray-900 border-4 border-yellow-500 rounded-2xl p-8">
            <h2 className="text-4xl font-black text-yellow-400 mb-6 text-center">🏆 Succès</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {gameState.achievements.map(achievement => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-6 rounded-xl border-2 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-yellow-900 to-orange-900 border-yellow-500'
                      : 'bg-gray-800 border-gray-600 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{achievement.emoji}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{achievement.title}</h3>
                      <p className="text-sm text-gray-300">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <div className="text-green-400 font-bold text-2xl">✓</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="text-2xl text-yellow-400 font-bold">
                {gameState.achievements.filter(a => a.unlocked).length} /{' '}
                {gameState.achievements.length} Débloqués
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
