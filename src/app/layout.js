import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Image Gallery - Rakibul Hasan',
  description: 'Create a responsive image gallery using React JS with the following features: reordering, deleting multiple images, and setting a feature image. The gallery should be visually appealing and provide a seamless user experience.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
