import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Migration Linux - Calculateur d\'Impact',
  description: 'Calculez les économies et l\'impact écologique d\'une migration vers Linux',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
