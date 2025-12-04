import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Palette Astérix
        'gaulois-blue': '#2563EB',
        'menhir-yellow': '#FBBF24',
        'forest-green': '#10B981',
        'roman-red': '#EF4444',
        'parchment': {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
        },
      },
      fontFamily: {
        'comic': ['Bangers', 'Comic Sans MS', 'cursive'],
        'body': ['Poppins', 'Inter', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'star-burst': 'starBurst 0.6s ease-out',
        'menhir-fall': 'menhirFall 1s ease-in',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        starBurst: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'scale(2) rotate(180deg)', opacity: '0' },
        },
        menhirFall: {
          '0%': { transform: 'translateY(-100%) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(0) rotate(15deg)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
