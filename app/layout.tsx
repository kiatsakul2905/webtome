import React from "react"
import type { Metadata } from 'next'
import { Inter, Noto_Sans_Thai } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ["latin"] });
const notoSansThai = Noto_Sans_Thai({ subsets: ["thai"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: 'Kiatsakul | Full Stack Developer',
  description: 'Personal portfolio showcasing my work and skills as a Full Stack Developer',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${notoSansThai.className} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
