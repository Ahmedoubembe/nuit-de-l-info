'use client';

import { Suspense } from 'react';
import ResultatContent from './ResultatContent';
import { LoadingSpinner } from '@/components/animations';

export default function ResultatPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-parchment-50 via-parchment-100 to-forest-green/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <LoadingSpinner variant="menhir" size="lg" message="Calcul des résultats en cours..." />
      </div>
    }>
      <ResultatContent />
    </Suspense>
  );
}
