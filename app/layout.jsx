import { Inter } from "next/font/google"
import "./globals.css"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Urban Air Quality Companion",
  description: "AI-powered mobile app for real-time air quality insights",
}

export default function RootLayout({
  children
}) {
  return (
    (<html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">

          <main className="flex-1 overflow-y-auto bg-background">{children}</main>
        </div>
      </body>
    </html>)
  );
}

