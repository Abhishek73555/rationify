"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { verifyAndCompleteDelivery } from "@/lib/actions/delivery"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, Phone, CheckCircle2, Navigation, PackageSearch, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

export default function DeliveryDashboardClient({ initialData }: { initialData: any }) {
  const [deliveries, setDeliveries] = useState(initialData.pendingDeliveries)
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null)
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  async function handleVerify(id: string) {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP")
      return
    }

    setIsVerifying(true)
    const res = await verifyAndCompleteDelivery(id, otp)
    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success("Delivery marked as completed!")
      setDeliveries(deliveries.filter((d: any) => d.id !== id))
      setSelectedDelivery(null)
      setOtp("")
    }
    setIsVerifying(false)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemAnim = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header Section */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Agent Dashboard
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 font-medium">Manage logistics, navigate to destinations, and verify OTPs safely.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="px-3 py-1 bg-white/5 backdrop-blur-md border-blue-500/30 text-blue-500 font-semibold text-sm">
            {deliveries.length} Pending Actions
          </Badge>
        </div>
      </motion.div>

      {deliveries.length === 0 ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="border-dashed border-white/20 bg-white/10 dark:bg-white/5 backdrop-blur-md">
            <CardContent className="flex flex-col items-center justify-center h-[400px] text-zinc-500">
              <div className="size-24 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="size-12 text-emerald-500/80 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">You're all caught up!</p>
              <p className="mt-2 text-zinc-400 font-medium max-w-sm text-center">No active deliveries assigned to your routing queue right now. Great job!</p>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {deliveries.map((delivery: any) => (
              <motion.div
                key={delivery.id}
                variants={itemAnim}
                layout
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              >
                <Card className="h-full flex flex-col relative overflow-hidden group hover:border-blue-500/50 transition-colors bg-gradient-to-br from-white/40 to-white/10 dark:from-zinc-900/40 dark:to-zinc-900/10 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10">
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <CardHeader className="border-b border-white/10 bg-white/20 dark:bg-black/10">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-xl font-bold text-zinc-800 dark:text-zinc-200">
                          <PackageSearch className="size-5 text-blue-500" />
                          {delivery.user.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 pt-2 font-medium text-zinc-600 dark:text-zinc-300">
                          <Phone className="size-4" />
                          {delivery.user.phone}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">In Transit</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col justify-between gap-5 p-6">
                    <div className="flex items-start gap-3 bg-white/50 dark:bg-black/20 p-4 rounded-xl border border-white/20 shadow-inner">
                      <MapPin className="size-6 text-rose-500 shrink-0 mt-0.5" />
                      <p className="text-sm font-medium leading-relaxed text-zinc-700 dark:text-zinc-300">{delivery.address}</p>
                    </div>
                    
                    <Dialog open={selectedDelivery === delivery.id} onOpenChange={(open) => {
                      setSelectedDelivery(open ? delivery.id : null)
                      setOtp("")
                    }}>
                      <DialogTrigger asChild>
                        <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 py-6 font-bold rounded-xl text-md group-hover:scale-[1.02] transition-transform">
                          <Navigation className="size-5 mr-2" /> Verify & Complete Target
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="border-white/20 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-3xl shadow-2xl sm:rounded-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                            <ShieldCheck className="size-6 text-blue-600" /> Secure Handover
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                          <div className="space-y-4 text-center bg-white/50 dark:bg-black/20 border border-white/20 p-6 rounded-2xl shadow-inner">
                            <div>
                              <Label className="text-lg font-bold text-zinc-700 dark:text-zinc-300">Enter Security OTP</Label>
                              <p className="text-sm font-medium text-zinc-500 mt-1 mb-4">Ask <strong className="text-zinc-800 dark:text-zinc-200">{delivery.user.name}</strong> for their 6-digit confirmation code.</p>
                            </div>
                            <Input 
                              type="text" 
                              placeholder="000000" 
                              maxLength={6}
                              className="text-center text-4xl tracking-[0.5em] font-black font-mono h-20 bg-white dark:bg-zinc-900 border-2 border-blue-500/30 focus-visible:ring-blue-500 text-blue-600 dark:text-blue-400 placeholder:text-zinc-300 dark:placeholder:text-zinc-800 shadow-md"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            />
                          </div>
                          <Button 
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 text-lg font-bold rounded-xl shadow-lg shadow-emerald-500/20" 
                            disabled={otp.length !== 6 || isVerifying}
                            onClick={() => handleVerify(delivery.id)}
                          >
                            {isVerifying ? "Verifying Handshake..." : "Confirm Delivery Success"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
