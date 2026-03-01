import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AC Circuits Exam Prep',
  description: 'Study app for AC Circuits Test 1 — Mechatronics Engineering Technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-bg text-gray-200 antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
