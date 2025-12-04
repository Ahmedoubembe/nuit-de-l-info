'use client';

import React from 'react';

// Menhir Icon
export const MenhirIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M30 95 L25 20 Q25 5, 50 5 Q75 5, 75 20 L70 95 Z"
      fill="#9CA3AF"
      stroke="#6B7280"
      strokeWidth="2"
    />
    <ellipse cx="50" cy="10" rx="20" ry="5" fill="#D1D5DB" />
    <path d="M35 30 L65 30" stroke="#6B7280" strokeWidth="1" opacity="0.5" />
    <path d="M33 50 L67 50" stroke="#6B7280" strokeWidth="1" opacity="0.5" />
    <path d="M32 70 L68 70" stroke="#6B7280" strokeWidth="1" opacity="0.5" />
  </svg>
);

// Potion magique Icon
export const PotionIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M35 40 L30 80 Q30 90, 50 90 Q70 90, 70 80 L65 40 Z"
      fill="#10B981"
      stroke="#059669"
      strokeWidth="2"
    />
    <rect x="40" y="35" width="20" height="8" fill="#6B7280" stroke="#4B5563" strokeWidth="1" />
    <circle cx="45" cy="60" r="3" fill="#34D399" opacity="0.7" />
    <circle cx="55" cy="55" r="2" fill="#34D399" opacity="0.7" />
    <circle cx="50" cy="70" r="2.5" fill="#34D399" opacity="0.7" />
    <path d="M35 45 Q50 50, 65 45" stroke="#34D399" strokeWidth="1" opacity="0.5" />
  </svg>
);

// Bouclier gaulois Icon
export const ShieldIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 5 L80 25 L80 50 Q80 85, 50 95 Q20 85, 20 50 L20 25 Z"
      fill="#2563EB"
      stroke="#1E40AF"
      strokeWidth="3"
    />
    <circle cx="50" cy="50" r="15" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
    <circle cx="50" cy="50" r="8" fill="#2563EB" />
    <path d="M50 15 L50 35" stroke="#FBBF24" strokeWidth="2" />
    <path d="M50 65 L50 85" stroke="#FBBF24" strokeWidth="2" />
    <path d="M30 50 L42 50" stroke="#FBBF24" strokeWidth="2" />
    <path d="M58 50 L70 50" stroke="#FBBF24" strokeWidth="2" />
  </svg>
);

// Casque romain Icon
export const RomanHelmetIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="45" rx="30" ry="25" fill="#EF4444" stroke="#DC2626" strokeWidth="2" />
    <path d="M50 25 L50 15 Q50 10, 55 10 L60 15" stroke="#DC2626" strokeWidth="2" fill="#FCA5A5" />
    <rect x="20" y="55" width="15" height="25" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
    <rect x="65" y="55" width="15" height="25" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
    <circle cx="42" cy="40" r="3" fill="#991B1B" />
    <circle cx="58" cy="40" r="3" fill="#991B1B" />
    <path d="M35 50 L65 50" stroke="#991B1B" strokeWidth="2" />
  </svg>
);

// Sanglier Icon
export const BoarIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="55" rx="35" ry="25" fill="#78350F" stroke="#451A03" strokeWidth="2" />
    <circle cx="25" cy="55" r="12" fill="#78350F" stroke="#451A03" strokeWidth="2" />
    <circle cx="33" cy="48" r="2" fill="#1F2937" />
    <path d="M40 60 L45 65 L50 60" stroke="#451A03" strokeWidth="2" fill="none" />
    <rect x="48" y="35" width="4" height="15" fill="#78350F" stroke="#451A03" strokeWidth="1" transform="rotate(-20 50 35)" />
    <rect x="48" y="35" width="4" height="15" fill="#78350F" stroke="#451A03" strokeWidth="1" transform="rotate(20 50 35)" />
    <path d="M70 55 Q85 50, 90 52" stroke="#451A03" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// Village gaulois Icon
export const VillageIcon = ({ className = "w-24 h-24" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Sol */}
    <rect x="0" y="140" width="200" height="60" fill="#10B981" opacity="0.3" />

    {/* Maison 1 */}
    <path d="M30 120 L70 120 L70 160 L30 160 Z" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
    <path d="M25 120 L50 90 L75 120 Z" fill="#EF4444" stroke="#DC2626" strokeWidth="2" />
    <rect x="40" y="135" width="10" height="15" fill="#78350F" />

    {/* Maison 2 */}
    <path d="M90 110 L130 110 L130 160 L90 160 Z" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
    <path d="M85 110 L110 75 L135 110 Z" fill="#EF4444" stroke="#DC2626" strokeWidth="2" />
    <rect x="105" y="130" width="10" height="15" fill="#78350F" />

    {/* Maison 3 */}
    <path d="M150 125 L180 125 L180 160 L150 160 Z" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
    <path d="M145 125 L165 95 L185 125 Z" fill="#EF4444" stroke="#DC2626" strokeWidth="2" />
    <rect x="160" y="135" width="10" height="15" fill="#78350F" />

    {/* Palissade */}
    <path d="M10 155 L10 170 M20 155 L20 170 M30 155 L30 170" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
    <path d="M170 155 L170 170 M180 155 L180 170 M190 155 L190 170" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// Étoile "Par Toutatis!" Icon
export const ToutatisStarIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 10 L60 40 L90 45 L65 65 L70 95 L50 80 L30 95 L35 65 L10 45 L40 40 Z"
      fill="#FBBF24"
      stroke="#F59E0B"
      strokeWidth="3"
    />
    <circle cx="50" cy="50" r="12" fill="#FEF3C7" opacity="0.8" />
  </svg>
);

// Chaudron bouillonnant Icon
export const CauldronIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="75" rx="35" ry="15" fill="#1F2937" />
    <path d="M15 75 L20 50 Q20 40, 50 40 Q80 40, 80 50 L85 75" fill="#374151" stroke="#1F2937" strokeWidth="2" />
    <rect x="10" y="35" width="10" height="8" fill="#6B7280" stroke="#4B5563" strokeWidth="1" />
    <rect x="80" y="35" width="10" height="8" fill="#6B7280" stroke="#4B5563" strokeWidth="1" />
    <circle cx="40" cy="55" r="3" fill="#10B981" opacity="0.7" className="animate-bounce" />
    <circle cx="50" cy="50" r="4" fill="#10B981" opacity="0.7" className="animate-bounce" style={{ animationDelay: '0.2s' }} />
    <circle cx="60" cy="53" r="3" fill="#10B981" opacity="0.7" className="animate-bounce" style={{ animationDelay: '0.4s' }} />
  </svg>
);
