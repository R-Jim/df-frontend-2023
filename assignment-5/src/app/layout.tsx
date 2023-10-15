import './globals.css'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import Header from '../components/header/Header'
import SessionProvider from '../components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Book store',
    description: 'Book store app',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession()
    return (
        <html lang="en">
            <body suppressHydrationWarning className={inter.className}>
                <SessionProvider session={session}>
                    <Header />
                    {children}
                </SessionProvider>
            </body>
        </html>
    )
}
