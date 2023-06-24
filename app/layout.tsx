import Link from 'next/link'
import Image from 'next/image'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LuptiMap',
  description: 'Navega el Valle de Guadalupe, siguiendo tu corazón',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen flex flex-col">
          <h1 className="text-center text-pink-500 text-3xl font-bold py-5 flex flex-col justify-center">
            LuptiMapa
          </h1>
          <div className="grow px-3">
            {children}
          </div>
          <nav>
            <ul>
              <li className="flex py-5 justify-around items-center">
                <Link href="/profile"><Image src="/icons/profile.svg" alt="profile" width="40" height="40"/></Link>
                <Link href="/likes"><Image src="/icons/likes.svg" alt="likes" width="40" height="40" /></Link>
              </li>
            </ul>
          </nav>
        </div>
      </body>
    </html>
  )
}
