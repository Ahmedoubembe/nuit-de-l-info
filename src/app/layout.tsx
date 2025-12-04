import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AsterixEasterEggs from '@/components/AsterixEasterEggs'
import { ScrollProgressBar } from '@/components/animations'

export const metadata: Metadata = {
  title: 'NIRD - Le Village Numérique Irréductible',
  description: 'Rejoignez la résistance gauloise contre l\'empire Big Tech ! Calculez vos économies avec la potion magique Linux.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <ScrollProgressBar />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <AsterixEasterEggs />
      </body>
    </html>
  )
}
