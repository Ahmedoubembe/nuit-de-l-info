# 🎬 Guide des Animations Astérix

## Vue d'ensemble

Ce guide présente le système d'animations spectaculaires implémenté pour NIRD. Toutes les animations sont optimisées, réutilisables et thématiques Astérix !

## 📦 Installation

Les animations sont déjà installées ! Dépendances :
- `framer-motion` - Animations fluides
- `react-confetti` - Célébrations

## 🎨 Composants Disponibles

### 1. **ScrollReveal** - Animations au scroll

Révèle les éléments quand ils deviennent visibles.

```tsx
import { ScrollReveal } from '@/components/animations';

// Utilisation basique
<ScrollReveal animation="fadeInUp">
  <div>Mon contenu</div>
</ScrollReveal>

// Avec options
<ScrollReveal
  animation="scaleIn"
  delay={0.2}
  duration={0.8}
  threshold={0.2}
  once={true}
>
  <div>Mon contenu</div>
</ScrollReveal>
```

**Animations disponibles:**
- `fadeInUp` - Monte en fondu
- `fadeInLeft` - Vient de la gauche
- `fadeInRight` - Vient de la droite
- `scaleIn` - Zoom progressif
- `rotateIn` - Rotation entrée
- `staggerContainer` / `staggerItem` - Animation en cascade

---

### 2. **AnimatedButton** - Boutons avec effets

Boutons avec hover, tap et effet ripple au clic.

```tsx
import { AnimatedButton } from '@/components/animations';

// Bouton primaire
<AnimatedButton variant="primary" onClick={() => console.log('Cliqué!')}>
  Cliquez-moi !
</AnimatedButton>

// Bouton bouclier (thème Astérix)
<AnimatedButton variant="shield" withRipple={true}>
  Par Toutatis !
</AnimatedButton>

// Bouton secondaire
<AnimatedButton variant="secondary">
  Action secondaire
</AnimatedButton>
```

**Variantes:**
- `primary` - Gradient bleu-vert
- `secondary` - Parchemin jaune
- `shield` - Style bouclier gaulois

---

### 3. **AnimatedCard** - Cards avec effet 3D

Cards qui suivent la souris et s'inclinent en 3D.

```tsx
import { AnimatedCard } from '@/components/animations';

<AnimatedCard
  enable3D={true}
  className="p-6 bg-white rounded-xl"
  onClick={() => console.log('Card cliquée!')}
>
  <h3>Titre de la card</h3>
  <p>Contenu avec effet 3D magique !</p>
</AnimatedCard>
```

---

### 4. **LoadingSpinner** - Chargements thématiques

États de chargement avec plusieurs variantes Astérix.

```tsx
import { LoadingSpinner } from '@/components/animations';

// Menhir qui tourne
<LoadingSpinner variant="menhir" size="lg" />

// Potion qui bouillonne
<LoadingSpinner
  variant="potion"
  size="md"
  message="Panoramix prépare la potion..."
/>

// Chaudron
<LoadingSpinner variant="cauldron" />

// Dots simples
<LoadingSpinner variant="dots" />
```

**Variantes:**
- `menhir` - Menhir qui tourne
- `potion` - Potion qui bouillonne
- `cauldron` - Chaudron animé
- `dots` - Points pulsants

**Tailles:** `sm`, `md`, `lg`

---

### 5. **SuccessAnimation** - Célébrations

Animation de succès avec confetti et étoiles.

```tsx
import { SuccessAnimation } from '@/components/animations';
import { useState } from 'react';

function MyComponent() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setShowSuccess(true);
  };

  return (
    <>
      <button onClick={handleSuccess}>Terminer</button>

      <SuccessAnimation
        show={showSuccess}
        message="Par Toutatis ! Succès !"
        withConfetti={true}
        onComplete={() => setShowSuccess(false)}
      />
    </>
  );
}
```

---

### 6. **AnimatedBackground** - Arrière-plans vivants

Arrière-plans animés avec particules, gradient ou étoiles.

```tsx
import { AnimatedBackground } from '@/components/animations';

// Particules flottantes
<div className="relative">
  <AnimatedBackground variant="particles" particleCount={20} />
  <div className="relative z-10">Mon contenu</div>
</div>

// Gradient animé
<AnimatedBackground variant="gradient" />

// Étoiles scintillantes
<AnimatedBackground variant="stars" particleCount={30} />
```

**Variantes:**
- `particles` - Particules dorées flottantes
- `gradient` - Gradient qui se déplace
- `stars` - Étoiles qui scintillent

---

### 7. **PageTransition** - Transitions de pages

Transitions fluides entre les pages.

```tsx
// Dans un layout ou template
import { PageTransition } from '@/components/animations';

export default function Template({ children }) {
  return (
    <PageTransition variant="fadeScale">
      {children}
    </PageTransition>
  );
}
```

**Variantes:**
- `pageTurn` - Effet page qui tourne (style BD)
- `slideParallax` - Slide avec parallaxe
- `fadeScale` - Fondu avec zoom
- `bounceIn` - Entrée bondissante

---

### 8. **ScrollProgressBar** - Barre de progression

Barre de progression qui suit le scroll (déjà dans layout).

```tsx
import { ScrollProgressBar } from '@/components/animations';

// Dans le layout (déjà fait !)
<ScrollProgressBar />
```

---

### 9. **AnimatedCounter** - Compteurs animés

Compteurs qui s'animent jusqu'à une valeur.

```tsx
import { AnimatedCounter } from '@/components/animations';

<AnimatedCounter
  from={0}
  to={1500}
  duration={2}
  suffix="€"
  prefix="+ "
  decimals={2}
  className="text-4xl font-bold text-green-600"
/>
```

---

## 🎯 Configuration Centrale

Toutes les animations sont configurées dans `src/lib/animations.ts` :

```ts
import { pageTransitions, scrollAnimations, microInteractions } from '@/lib/animations';

// Utiliser une config existante
<motion.div variants={scrollAnimations.fadeInUp}>
  ...
</motion.div>
```

---

## 💡 Exemples d'utilisation

### Exemple 1: Section avec révélation au scroll

```tsx
import { ScrollReveal } from '@/components/animations';

function FeaturesSection() {
  const features = [...];

  return (
    <section className="py-20">
      <ScrollReveal animation="fadeInUp">
        <h2>Nos Fonctionnalités</h2>
      </ScrollReveal>

      <div className="grid grid-cols-3 gap-6 mt-8">
        {features.map((feature, index) => (
          <ScrollReveal
            key={feature.id}
            animation="scaleIn"
            delay={index * 0.1}
          >
            <div className="feature-card">
              {feature.content}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
```

### Exemple 2: Formulaire avec loading et success

```tsx
import { AnimatedButton, LoadingSpinner, SuccessAnimation } from '@/components/animations';
import { useState } from 'react';

function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    await submitForm();

    setIsLoading(false);
    setShowSuccess(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* ... champs du formulaire ... */}

        <AnimatedButton
          variant="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner variant="dots" size="sm" /> : 'Envoyer'}
        </AnimatedButton>
      </form>

      <SuccessAnimation
        show={showSuccess}
        message="Message envoyé !"
        onComplete={() => setShowSuccess(false)}
      />
    </>
  );
}
```

### Exemple 3: Hero avec background animé

```tsx
import { AnimatedBackground, ScrollReveal } from '@/components/animations';

function Hero() {
  return (
    <section className="relative min-h-screen">
      {/* Background animé */}
      <AnimatedBackground variant="particles" particleCount={30} />

      {/* Contenu */}
      <div className="relative z-10">
        <ScrollReveal animation="fadeInUp">
          <h1>Bienvenue au Village</h1>
        </ScrollReveal>

        <ScrollReveal animation="fadeInUp" delay={0.2}>
          <p>Rejoignez la résistance !</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

---

## 🎨 Personnalisation

### Créer des animations custom

```tsx
import { motion } from 'framer-motion';

const customVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15
    }
  }
};

<motion.div
  initial="hidden"
  animate="visible"
  variants={customVariants}
>
  Mon élément custom
</motion.div>
```

### Modifier les timings

```ts
// Dans src/lib/animations.ts
export const timing = {
  instant: 0.1,
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.2
};

// Utilisation
<motion.div
  transition={{ duration: timing.slow }}
>
  ...
</motion.div>
```

---

## 🚀 Performance

### Bonnes pratiques

1. **Utilisez ScrollReveal avec `once={true}`** pour les éléments qui n'ont besoin d'être animés qu'une fois
2. **Limitez le nombre de particules** dans AnimatedBackground (15-30 max)
3. **Utilisez `will-change: transform`** pour les animations complexes
4. **Préférez les transformations CSS** (transform, opacity) aux propriétés layout (width, height)

### Désactiver les animations sur mobile (optionnel)

```tsx
import { useReducedMotion } from 'framer-motion';

function MyComponent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { scale: 1.1 }}
    >
      ...
    </motion.div>
  );
}
```

---

## 📚 Ressources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Confetti](https://github.com/alampros/react-confetti)
- [Animations Config](/src/lib/animations.ts)
- [Composants](/src/components/animations/)

---

## 🎭 Easter Eggs Existants

N'oubliez pas les easter eggs déjà implémentés :
- **5 clics rapides** = Étoiles "Par Toutatis!"
- **Konami code** (↑↑↓↓←→←→BA) = Obélix apparaît

---

**Par Toutatis, que les animations soient avec vous ! 🛡️✨**
