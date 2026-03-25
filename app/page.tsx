"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ShieldAlert, Users, Truck, ArrowRight } from "lucide-react"

export default function HomePage() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])
  
  return (
    <div className="min-h-screen flex flex-col items-center overflow-x-hidden bg-[#0A0A0B] text-white relative font-sans selection:bg-emerald-500/30">
      {/* Intense Parallax Background / Glassmorphism Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div style={{ y: y1 }} className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-emerald-600/20 rounded-full blur-[120px] mix-blend-screen opacity-50" />
        <motion.div style={{ y: y2 }} className="absolute top-[40%] -right-[20%] w-[900px] h-[900px] bg-sky-600/20 rounded-full blur-[150px] mix-blend-screen opacity-40" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="w-full max-w-5xl z-10 flex flex-col items-center pt-24 pb-32 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="size-32 rounded-3xl bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(16,185,129,0.3)] backdrop-blur-3xl flex items-center justify-center p-4 mb-8">
            <Image src="/logo.png" alt="Rationify Logo" width={100} height={100} className="object-contain drop-shadow-md" priority />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent mb-4 drop-shadow-sm">
            Rationify Next-Gen
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-medium max-w-2xl text-balance">
            A decentralized, ultra-secure Public Distribution System. Enter the portal below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {[
            {
              role: "Consumer",
              desc: "Book slots, track deliveries, and file complaints",
              icon: Users,
              href: "/consumer",
              themeGroup: "group-hover:text-emerald-400 border-emerald-500/30 bg-emerald-500/20 text-emerald-400 text-emerald-500",
              buttonColor: "text-emerald-400"
            },
            {
              role: "Delivery",
              desc: "Manage active shipments and verify OTPs",
              icon: Truck,
              href: "/delivery",
              themeGroup: "group-hover:text-sky-400 border-sky-500/30 bg-sky-500/20 text-sky-400 text-sky-500",
              buttonColor: "text-sky-400"
            },
            {
              role: "Owner",
              desc: "Monitor analytics and approve distributions",
              icon: ShieldAlert,
              href: "/owner",
              themeGroup: "group-hover:text-orange-400 border-orange-500/30 bg-orange-500/20 text-orange-400 text-orange-500",
              buttonColor: "text-orange-400"
            }
          ].map((item, i) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
            >
              <Link href={item.href} className="block group h-full">
                <div className="relative h-full flex flex-col overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-2xl transition-all duration-500 hover:bg-white/[0.08] hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
                  {/* Glass highlight */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className={`size-14 rounded-2xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${item.themeGroup.split(' ').slice(1).join(' ')}`}>
                    <item.icon className="size-7" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{item.role}</h3>
                  <p className="text-zinc-400 font-medium flex-1 mb-6 leading-relaxed">
                    {item.desc}
                  </p>
                  
                  <div className={`flex items-center text-sm font-semibold mt-auto ${item.buttonColor}`}>
                    Explore Portal <ArrowRight className="ml-2 size-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
