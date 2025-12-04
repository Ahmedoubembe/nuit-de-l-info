'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { MenhirIcon, ShieldIcon } from './AsterixIcons';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Le Village', icon: '🏘️' },
    { href: '/questionnaire', label: 'La Potion Magique', icon: '🧪' },
    { href: '/ecoles', label: 'La Carte des Tribus', icon: '🗺️' },
    { href: '/ressources', label: 'Le Druide', icon: '🧙' },
    { href: '/a-propos', label: 'Les Guerriers', icon: '⚔️' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname?.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-parchment-100/95 dark:bg-gray-900/95 backdrop-blur-sm border-b-4 border-menhir-yellow shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Menhir */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ y: -5, rotate: 5 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <MenhirIcon className="w-12 h-12" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-comic font-bold text-gaulois-blue group-hover:text-menhir-yellow transition-colors leading-tight">
                NIRD
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-body">
                La Résistance Numérique
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <motion.div key={item.href} whileHover={{ y: -2 }}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-body font-medium transition-all ${
                    isActive(item.href)
                      ? 'text-gaulois-blue bg-menhir-yellow/30 border-2 border-menhir-yellow shadow-md'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gaulois-blue hover:bg-parchment-200 dark:hover:bg-gray-800 border-2 border-transparent'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button - Bouclier */}
          <div className="hidden md:block">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link
                href="/questionnaire"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-gaulois-blue to-forest-green hover:from-forest-green hover:to-gaulois-blue text-white font-comic text-lg rounded-full shadow-xl hover:shadow-2xl transition-all border-3 border-menhir-yellow"
              >
                <ShieldIcon className="w-6 h-6" />
                Boire la Potion !
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-menhir-yellow/30 transition-colors border-2 border-transparent hover:border-menhir-yellow"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t-2 border-menhir-yellow/30 mt-2"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <motion.div
                    key={item.href}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-body font-medium transition-all ${
                        isActive(item.href)
                          ? 'text-gaulois-blue bg-menhir-yellow/30 border-2 border-menhir-yellow shadow-md'
                          : 'text-gray-700 dark:text-gray-300 hover:text-gaulois-blue hover:bg-parchment-200 dark:hover:bg-gray-800 border-2 border-transparent'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/questionnaire"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-4 bg-gradient-to-r from-gaulois-blue to-forest-green text-white font-comic text-lg rounded-xl shadow-lg border-2 border-menhir-yellow"
                  >
                    <ShieldIcon className="w-6 h-6" />
                    Boire la Potion !
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
