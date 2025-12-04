'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { MenhirIcon, ShieldIcon } from './AsterixIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: 'Le Village', href: '/', icon: '🏘️' },
      { label: 'La Potion Magique', href: '/questionnaire', icon: '🧪' },
      { label: 'La Carte des Tribus', href: '/ecoles', icon: '🗺️' },
      { label: 'Le Druide', href: '/ressources', icon: '🧙' },
      { label: 'Les Guerriers', href: '/a-propos', icon: '⚔️' },
    ],
    social: [
      { label: 'GitHub', href: 'https://github.com/nird', icon: Github },
      { label: 'Twitter', href: 'https://twitter.com/nird', icon: Twitter },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/nird', icon: Linkedin },
      { label: 'Contact', href: 'mailto:contact@nird.fr', icon: Mail },
    ],
  };

  return (
    <footer className="bg-parchment-100 dark:bg-gray-900 border-t-4 border-menhir-yellow mt-20 celtic-pattern relative">
      {/* Motif décoratif en haut */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gaulois-blue via-menhir-yellow to-forest-green" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description - Style Astérix */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <MenhirIcon className="w-12 h-12" />
              <div>
                <span className="text-2xl font-comic font-bold text-gaulois-blue block leading-tight">NIRD</span>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-body">La Résistance Numérique</span>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-400 mb-4 max-w-md font-body">
              <span className="font-semibold text-gaulois-blue">Numérique Inclusif, Responsable et Durable.</span>
              {' '}Comme un village gaulois, nous résistons à l'empire Big Tech et accompagnons les écoles vers la souveraineté numérique !
            </p>
            <a
              href="https://nird.forge.apps.education.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gaulois-blue hover:text-menhir-yellow font-body font-semibold transition-colors group"
            >
              <ShieldIcon className="w-5 h-5 group-hover:animate-wiggle" />
              <span>nird.forge.apps.education.fr →</span>
            </a>
          </div>

          {/* Navigation Links - Style gaulois */}
          <div>
            <h3 className="text-sm font-comic font-bold text-gaulois-blue uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>🗺️</span>
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-400 hover:text-menhir-yellow dark:hover:text-menhir-yellow transition-colors font-body group"
                  >
                    <span className="group-hover:scale-125 transition-transform">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links - Style gaulois */}
          <div>
            <h3 className="text-sm font-comic font-bold text-gaulois-blue uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>📯</span>
              Suivez-nous
            </h3>
            <div className="flex flex-col gap-3">
              {footerLinks.social.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-400 hover:text-menhir-yellow dark:hover:text-menhir-yellow transition-colors font-body group"
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{social.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar - Style parchemin */}
        <div className="mt-12 pt-8 border-t-2 border-menhir-yellow/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-700 dark:text-gray-400 text-center md:text-left font-body">
              © {currentYear} NIRD - Village Numérique Irréductible. Licence libre{' '}
              <a
                href="https://www.gnu.org/licenses/agpl-3.0.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gaulois-blue hover:text-menhir-yellow font-semibold transition-colors"
              >
                AGPL-3.0
              </a>
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400 font-body">
              <span>Projet pour la</span>
              <a
                href="https://www.nuitdelinfo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gaulois-blue hover:text-menhir-yellow font-semibold transition-colors"
              >
                Nuit de l'Info {currentYear}
              </a>
              <Heart className="w-4 h-4 text-roman-red inline animate-pulse" />
            </div>
          </div>

          {/* Citation Astérix */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-500 font-body italic">
              "Par Toutatis ! La résistance numérique ne fait que commencer !" 🛡️
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
