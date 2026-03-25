"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { requestToken, requestDelivery, submitComplaint } from "@/lib/actions/consumer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, MapPin, AlertCircle, Home } from "lucide-react"
import { toast } from "sonner"

export default function ConsumerDashboardClient({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData)
  const [isPending, setIsPending] = useState(false)

  async function handleAction(action: typeof requestToken, formData: FormData, successMsg: string) {
    setIsPending(true)
    const res = await action(formData)
    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success(successMsg)
      window.location.reload()
    }
    setIsPending(false)
  }

  const container: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemAnim: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header Section */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
            Consumer Access
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 font-medium">Book tokens, track door-step deliveries, and manage your needs.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="px-3 py-1 bg-white/5 backdrop-blur-md border-emerald-500/30 text-emerald-500 font-semibold text-sm">Active Member</Badge>
        </div>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemAnim}>
          <Dialog>
            <DialogTrigger asChild>
              <Card className="h-full relative overflow-hidden group hover:border-emerald-500/50 transition-all cursor-pointer bg-gradient-to-br from-white/40 to-white/10 dark:from-zinc-900/40 dark:to-zinc-900/10 backdrop-blur-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10">
                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="pt-8 flex flex-col items-center justify-center gap-4 text-center">
                  <div className="size-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] text-emerald-500">
                    <CalendarIcon className="size-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-zinc-800 dark:text-zinc-200">Book Token</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Pick a date to collect ration seamlessly</p>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="border-white/20 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-3xl shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">Book Ration Token</DialogTitle>
              </DialogHeader>
              <form action={(f) => handleAction(requestToken, f, "Token booked!")} className="space-y-5 mt-4">
                <div className="space-y-2">
                  <Label className="font-semibold text-zinc-600 dark:text-zinc-300">Select Date</Label>
                  <Input type="date" name="date" required min={new Date().toISOString().split('T')[0]} className="bg-white/50 dark:bg-black/20 border-white/20" />
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold text-zinc-600 dark:text-zinc-300">Time Slot</Label>
                  <Select name="timeSlot" required>
                    <SelectTrigger className="bg-white/50 dark:bg-black/20 border-white/20"><SelectValue placeholder="Select Time Slot" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</SelectItem>
                      <SelectItem value="Afternoon (1PM - 4PM)">Afternoon (1PM - 4PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" disabled={isPending} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 py-6 text-lg font-bold rounded-xl mt-4">
                  {isPending ? "Booking..." : "Confirm Booking"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div variants={itemAnim}>
          <Dialog>
            <DialogTrigger asChild>
              <Card className="h-full relative overflow-hidden group hover:border-blue-500/50 transition-all cursor-pointer bg-gradient-to-br from-white/40 to-white/10 dark:from-zinc-900/40 dark:to-zinc-900/10 backdrop-blur-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="pt-8 flex flex-col items-center justify-center gap-4 text-center">
                  <div className="size-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] text-blue-500">
                    <Home className="size-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-zinc-800 dark:text-zinc-200">Home Delivery</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Request delivery right to your door</p>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="border-white/20 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-3xl shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">Request Home Delivery</DialogTitle>
              </DialogHeader>
              <form action={(f) => handleAction(requestDelivery, f, "Delivery requested!")} className="space-y-5 mt-4">
                <div className="space-y-2">
                  <Label className="font-semibold text-zinc-600 dark:text-zinc-300">Full Address</Label>
                  <Input name="address" required placeholder="House No, Street, Landmark..." className="bg-white/50 dark:bg-black/20 border-white/20" />
                </div>
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 backdrop-blur-md">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <span className="font-bold text-blue-900 dark:text-blue-200 block mb-1">Security Note:</span>
                    You will receive an OTP upon approval. Only share it with the verified agent at your door.
                  </p>
                </div>
                <Button type="submit" disabled={isPending} className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 py-6 text-lg font-bold rounded-xl mt-4">
                  Submit Request
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div variants={itemAnim}>
          <Dialog>
            <DialogTrigger asChild>
              <Card className="h-full relative overflow-hidden group hover:border-rose-500/50 transition-all cursor-pointer bg-gradient-to-br from-white/40 to-white/10 dark:from-zinc-900/40 dark:to-zinc-900/10 backdrop-blur-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-rose-500/10">
                <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="pt-8 flex flex-col items-center justify-center gap-4 text-center">
                  <div className="size-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] text-rose-500">
                    <AlertCircle className="size-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-zinc-800 dark:text-zinc-200">Raise Complaint</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Report issues privately to the admin</p>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="border-white/20 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-3xl shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">Submit Grievance</DialogTitle>
              </DialogHeader>
              <form action={(f) => handleAction(submitComplaint, f, "Complaint registered")} className="space-y-5 mt-4">
                <div className="space-y-2">
                  <Label className="font-semibold text-zinc-600 dark:text-zinc-300">Complaint Category</Label>
                  <Select name="type" required>
                    <SelectTrigger className="bg-white/50 dark:bg-black/20 border-white/20"><SelectValue placeholder="Select Issue" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MISBEHAVIOR">Misbehavior</SelectItem>
                      <SelectItem value="LESS_RATION">Less Ration</SelectItem>
                      <SelectItem value="OTHER">Other Issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold text-zinc-600 dark:text-zinc-300">Detailed Description</Label>
                  <textarea 
                    name="message" 
                    required 
                    rows={4} 
                    className="flex w-full rounded-xl border border-white/20 bg-white/50 dark:bg-black/20 px-4 py-3 text-sm shadow-sm placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:placeholder:text-zinc-500"
                    placeholder="Clearly explain what happened..."
                  />
                </div>
                <Button type="submit" disabled={isPending} className="w-full bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20 py-6 text-lg font-bold rounded-xl mt-4">
                  File Complaint
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Tabs defaultValue="history" className="mt-8 w-full">
          <TabsList className="bg-black/5 dark:bg-white/5 border border-white/10 flex overflow-x-auto h-14 p-1.5 rounded-xl backdrop-blur-md mb-6 shadow-inner w-full max-w-[400px]">
            <TabsTrigger value="history" className="text-sm font-bold flex-1 h-full rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-emerald-500 data-[state=active]:shadow-md transition-all">Token History</TabsTrigger>
            <TabsTrigger value="deliveries" className="text-sm font-bold flex-1 h-full rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-500 data-[state=active]:shadow-md transition-all">Deliveries</TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <Card className="border-white/20 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent border-b border-white/10 pb-6">
                <CardTitle className="text-xl">Your Token Bookings</CardTitle>
                <CardDescription>Track all previous and upcoming ration slots.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {data.tokens.length === 0 ? (
                  <div className="text-center py-12 text-zinc-500 font-medium">No history found. Book a token to begin!</div>
                ) : (
                  <div className="space-y-4">
                    {data.tokens.map((token: any) => (
                      <div key={token.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-white/20 bg-white/50 dark:bg-black/20 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl border border-white/10 ${token.status === "APPROVED" ? "bg-emerald-500/10 text-emerald-500" : token.status === "REJECTED" ? "bg-rose-500/10 text-rose-500" : "bg-black/5 dark:bg-white/10 text-zinc-500"}`}>
                            <CalendarIcon className="size-6" />
                          </div>
                          <div>
                            <p className="font-bold text-zinc-800 dark:text-zinc-200">{new Date(token.date).toLocaleDateString()}</p>
                            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mt-1"><Clock className="size-3.5" /> {token.timeSlot}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={`px-3 py-1 text-sm font-semibold
                          ${token.status === "PENDING" ? "border-zinc-400/50 text-zinc-600 bg-black/5" : ""}
                          ${token.status === "APPROVED" ? "border-emerald-500/50 text-emerald-600 bg-emerald-500/10" : ""}
                          ${token.status === "REJECTED" ? "border-rose-500/50 text-rose-600 bg-rose-500/10" : ""}
                        `}>
                          {token.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deliveries">
            <Card className="border-white/20 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-transparent border-b border-white/10 pb-6">
                <CardTitle className="text-xl">Home Deliveries</CardTitle>
                <CardDescription>Track status and secure OTPs for active requests.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {data.deliveryRequests.length === 0 ? (
                  <div className="text-center py-12 text-zinc-500 font-medium">No active delivery requests.</div>
                ) : (
                  <div className="space-y-4">
                    {data.deliveryRequests.map((req: any) => (
                      <div key={req.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-white/20 bg-white/50 dark:bg-black/20 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl border border-white/10 ${req.status === "DELIVERED" ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"}`}>
                            <Home className="size-6" />
                          </div>
                          <div>
                            <p className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2 max-w-xs truncate"><MapPin className="size-4 text-zinc-400" /> {req.address}</p>
                            {(req.status === "APPROVED" || req.status === "IN_TRANSIT") && (
                              <div className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Secure OTP:</span>
                                <span className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-300 tracking-widest">{req.otp}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Badge variant="outline" className={`px-3 py-1 text-sm font-semibold
                          ${req.status === "PENDING" ? "border-zinc-400/50 text-zinc-600 bg-black/5" : ""}
                          ${req.status === "APPROVED" ? "border-emerald-500/50 text-emerald-600 bg-emerald-500/10" : ""}
                          ${req.status === "IN_TRANSIT" ? "border-blue-500/50 text-blue-600 bg-blue-500/10" : ""}
                          ${req.status === "DELIVERED" ? "border-green-500/50 text-green-600 bg-green-500/10" : ""}
                        `}>
                          {req.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
