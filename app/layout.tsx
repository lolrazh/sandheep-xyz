import { Inter, Playfair_Display, Lexend_Deca } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

const lexendDeca = Lexend_Deca({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-lexend',
})

export const metadata = {
  title: 'Sandheep Thakur',
  description: 'Personal website and blog of Sandheep Thakur',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${playfairDisplay.variable} ${lexendDeca.variable}`}>
        {children}
      </body>
    </html>
  )
}