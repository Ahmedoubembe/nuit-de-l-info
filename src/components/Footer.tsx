'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: 'Accueil', href: '/' },
      { label: 'Calculatrice', href: '/questionnaire' },
      { label: 'Écoles', href: '/ecoles' },
      { label: 'Ressources', href: '/ressources' },
      { label: 'À propos', href: '/a-propos' },
    ],
    social: [
      { label: 'GitHub', href: 'https://github.com/nird', icon: Github },
      { label: 'Twitter', href: 'https://twitter.com/nird', icon: Twitter },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/nird', icon: Linkedin },
      { label: 'Contact', href: 'mailto:contact@nird.fr', icon: Mail },
    ],
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                N
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">NIRD</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Numérique Inclusif, Responsable et Durable. Accompagnement des écoles et
              établissements vers la souveraineté numérique avec des solutions libres.
            </p>
            <a
              href="https://nird.forge.apps.education.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              nird.forge.apps.education.fr →
            </a>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
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
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{social.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              © {currentYear} NIRD. Tous droits réservés. Licence libre{' '}
              <a
                href="https://www.gnu.org/licenses/agpl-3.0.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                AGPL-3.0
              </a>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
              Projet pour la{' '}
              <a
                href="https://www.nuitdelinfo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Nuit de l'Info {currentYear}
              </a>
              <Heart className="w-4 h-4 text-red-500 inline" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
