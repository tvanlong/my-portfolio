import type React from 'react'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'

import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-manrope'
})

export const metadata: Metadata = {
  title: 'Long Van | Web Developer',
  description: 'Portfolio of Long Van',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning className={manrope.variable}>
      <body className='font-sans'>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
