import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DocuHero - HIPAA-Compliant Healthcare Documentation',
  description: 'Secure healthcare documentation platform with AI and blockchain integration',
  keywords: ['healthcare', 'documentation', 'HIPAA', 'compliance', 'AI', 'blockchain'],
  authors: [{ name: 'DocuHero Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'noindex, nofollow', // Remove in production
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
