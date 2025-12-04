/**
 * Configuration centrale des animations Astérix
 * Animations spectaculaires pour une expérience "wow" garantie !
 */

import { Variants } from 'framer-motion';

// ==========================================
// PAGE TRANSITIONS
// ==========================================

export const pageTransitions = {
  // Effet "page turn" style BD
  pageTurn: {
    initial: { rotateY: -90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: 90, opacity: 0 },
    transition: { duration: 0.6, ease: 'easeInOut' }
  },

  // Slide avec parallaxe
  slideParallax: {
    initial: { x: 100, opacity: 0, scale: 0.95 },
    animate: { x: 0, opacity: 1, scale: 1 },
    exit: { x: -100, opacity: 0, scale: 0.95 },
    transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }
  },

  // Fade avec scale
  fadeScale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
    transition: { duration: 0.4 }
  },

  // Bounce entrée (style gaulois !)
  bounceIn: {
    initial: { y: -100, opacity: 0, rotate: -10 },
    animate: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 200, damping: 15 }
    },
    exit: { y: 100, opacity: 0, rotate: 10 }
  }
};

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

export const scrollAnimations: Record<string, Variants> = {
  // Fade in up (classique mais efficace)
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  },

  // Fade in from left
  fadeInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  },

  // Fade in from right
  fadeInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  },

  // Scale in (zoom)
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  },

  // Rotation entrance
  rotateIn: {
    hidden: { opacity: 0, rotate: -180, scale: 0 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  },

  // Stagger children (pour listes)
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }
};

// ==========================================
// MICRO-INTERACTIONS
// ==========================================

export const microInteractions = {
  // Bouton avec effet ripple
  button: {
    tap: { scale: 0.95 },
    hover: { scale: 1.05, y: -2 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  },

  // Card avec élévation
  card: {
    rest: { y: 0, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    hover: {
      y: -8,
      boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.98 }
  },

  // Card 3D tilt (suit la souris)
  card3D: {
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  },

  // Input focus
  input: {
    focus: { scale: 1.02, borderColor: '#FBBF24' },
    blur: { scale: 1, borderColor: '#D1D5DB' }
  },

  // Icon bounce
  iconBounce: {
    rest: { y: 0, rotate: 0 },
    hover: {
      y: [0, -10, 0],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.6,
        times: [0, 0.3, 0.6, 1]
      }
    }
  },

  // Icon spin
  iconSpin: {
    hover: {
      rotate: 360,
      transition: { duration: 0.6, ease: 'easeInOut' }
    }
  }
};

// ==========================================
// LOADING ANIMATIONS
// ==========================================

export const loadingAnimations = {
  // Menhir qui tourne
  menhirSpin: {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  },

  // Potion qui bouillonne
  potionBubble: {
    animate: {
      scale: [1, 1.1, 1],
      y: [0, -5, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },

  // Dots pulsing
  dotsPulse: {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.5, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },

  // Skeleton shimmer
  skeleton: {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  }
};

// ==========================================
// SUCCESS ANIMATIONS
// ==========================================

export const successAnimations = {
  // Badge pop
  badgePop: {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    }
  },

  // Checkmark draw
  checkmarkDraw: {
    initial: { pathLength: 0 },
    animate: {
      pathLength: 1,
      transition: {
        duration: 0.8,
        ease: 'easeInOut'
      }
    }
  },

  // Celebration bounce
  celebration: {
    animate: {
      y: [0, -20, 0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 1,
        times: [0, 0.2, 0.4, 0.6, 1]
      }
    }
  }
};

// ==========================================
// BACKGROUND EFFECTS
// ==========================================

export const backgroundEffects = {
  // Gradient animé
  gradientShift: {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  },

  // Particules flottantes
  floatingParticle: {
    animate: {
      y: [0, -30, 0],
      x: [0, 15, -15, 0],
      rotate: [0, 360],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },

  // Stars scintillantes
  twinkleStar: {
    animate: {
      opacity: [0.3, 1, 0.3],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }
};

// ==========================================
// CUSTOM EASINGS
// ==========================================

export const customEasings = {
  // Elastic bounce (style BD)
  elastic: [0.68, -0.55, 0.265, 1.55],

  // Smooth acceleration
  smooth: [0.43, 0.13, 0.23, 0.96],

  // Quick snap
  snap: [0.85, 0, 0.15, 1],

  // Slow start
  slowStart: [0.33, 0, 0.67, 1]
};

// ==========================================
// TIMING CONSTANTS
// ==========================================

export const timing = {
  instant: 0.1,
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.2
};

// ==========================================
// HELPER: Generate stagger delay
// ==========================================

export const generateStagger = (index: number, baseDelay = 0.1) => {
  return index * baseDelay;
};
