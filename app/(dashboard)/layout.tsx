"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"
import { usePathname } from "next/navigation"

import Image from "next/image"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  const segments = pathname.split('/')
  const role = segments[1] || "Guest"
  
  let roleDisplay = "Guest"
  if (role === 'owner') roleDisplay = "Fair Shop Owner"
  if (role === 'consumer') roleDisplay = "Consumer"
  if (role === 'delivery') roleDisplay = "Delivery Agent"

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-zinc-50 dark:bg-[#0A0A0B] text-zinc-900 dark:text-zinc-100 selection:bg-emerald-500/30">
      {/* Background glassmorphism elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-600/10 rounded-full blur-[100px] mix-blend-screen opacity-50" />
        <div className="absolute bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-sky-500/10 dark:bg-sky-600/10 rounded-full blur-[120px] mix-blend-screen opacity-50" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay dark:opacity-[0.04]" />
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 dark:border-white/10 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
            <div className="size-9 rounded-lg bg-white/80 dark:bg-white/5 p-1 flex items-center justify-center shadow-md border border-zinc-200 dark:border-white/10">
              <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" priority />
            </div>
            <span className="font-bold tracking-tight text-xl text-zinc-900 dark:text-zinc-100 hidden sm:inline-block">Rationify</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end pr-4 border-r border-zinc-200 dark:border-zinc-800">
              <span className="text-sm font-medium leading-none capitalize">{role} Account</span>
              <span className="text-xs text-zinc-500 mt-1">{roleDisplay} Mode</span>
            </div>
            <Link href="/" title="Switch Role" className="p-2 flex items-center gap-2 text-zinc-500 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-colors group relative">
              <LogOut className="size-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-sm font-medium hidden sm:inline-block">Exit Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 container mx-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  )
}
