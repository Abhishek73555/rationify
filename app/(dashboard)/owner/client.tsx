"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { approveToken, deleteConsumer, handleDeliveryRequest, addConsumer } from "@/lib/actions/owner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Users, Truck, FileText, AlertTriangle, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"

export default function OwnerDashboardClient({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData)
  const [isAdding, setIsAdding] = useState(false)
  
  async function actionWithToast(action: () => Promise<void>, successMsg: string) {
    try {
      await action()
      toast.success(successMsg)
      window.location.reload()
    } catch {
      toast.error("An error occurred")
    }
  }

  const container: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header Section */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Admin Overview
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 font-medium">Manage consumers, approve distributions, and monitor platform health.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="px-3 py-1 bg-white/5 backdrop-blur-md border-orange-500/30 text-orange-500 font-semibold text-sm">Owner Privileges</Badge>
        </div>
      </motion.div>

      {/* Overview Cards */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <motion.div variants={item}>
          <Card className="relative overflow-hidden group hover:border-emerald-500/50 transition-colors bg-gradient-to-br from-white/40 to-white/10 dark:from-zinc-900/40 dark:to-zinc-900/10 backdrop-blur-xl">
            <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Total Consumers</CardTitle>
              <div className="size-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                <Users className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400">{data.consumers.length}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="relative overflow-hidden group hover:border-blue-500/50 transition-colors bg-gradient-to-br from-white/40 to-white/10 dark:from-zinc-900/40 dark:to-zinc-900/10 backdrop-blur-xl">
            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Pending Tokens</CardTitle>
              <div className="size-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
                <FileText className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-blue-600 dark:text-blue-400">
                {data.tokens.filter((t: any) => t.status === "PENDING").length}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="relative overflow-hidden group hover:border-amber-500/50 transition-colors bg-gradient-to-br from-white/40 to-white/10 dark:from-zinc-900/40 dark:to-zinc-900/10 backdrop-blur-xl">
            <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Active Deliveries</CardTitle>
              <div className="size-8 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center">
                <Truck className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-amber-600 dark:text-amber-400">
                {data.deliveryRequests.filter((r: any) => r.status === "PENDING").length}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="relative overflow-hidden group hover:border-rose-500/50 transition-colors bg-gradient-to-br from-white/40 to-white/10 dark:from-zinc-900/40 dark:to-zinc-900/10 backdrop-blur-xl">
            <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Complaints</CardTitle>
              <div className="size-8 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center">
                <AlertTriangle className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-rose-600 dark:text-rose-400">{data.complaints.length}</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Main Action Tabs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Tabs defaultValue="tokens" className="w-full">
          <TabsList className="bg-black/5 dark:bg-white/5 border border-white/10 flex overflow-x-auto h-14 p-1.5 rounded-xl backdrop-blur-md mb-6 shadow-inner w-full max-w-[600px]">
            <TabsTrigger value="tokens" className="text-sm font-bold flex-1 h-full rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-500 data-[state=active]:shadow-md transition-all">Tokens</TabsTrigger>
            <TabsTrigger value="deliveries" className="text-sm font-bold flex-1 h-full rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-amber-500 data-[state=active]:shadow-md transition-all">Deliveries</TabsTrigger>
            <TabsTrigger value="consumers" className="text-sm font-bold flex-1 h-full rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-emerald-500 data-[state=active]:shadow-md transition-all">Consumers</TabsTrigger>
            <TabsTrigger value="complaints" className="text-sm font-bold flex-1 h-full rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-rose-500 data-[state=active]:shadow-md transition-all">Complaints</TabsTrigger>
          </TabsList>

          <TabsContent value="tokens">
            <Card className="border-white/20 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-transparent border-b border-white/10 pb-6">
                <CardTitle className="text-xl">Token Approvals</CardTitle>
                <CardDescription>Review and manage requested ration time slots.</CardDescription>
              </CardHeader>
              <div className="p-0">
                <Table>
                  <TableHeader className="bg-white/30 dark:bg-black/20">
                    <TableRow>
                      <TableHead className="font-bold">Consumer</TableHead>
                      <TableHead className="font-bold">Phone</TableHead>
                      <TableHead className="font-bold">Date & Time</TableHead>
                      <TableHead className="font-bold">Status</TableHead>
                      <TableHead className="text-right font-bold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.tokens.map((token: any) => (
                      <TableRow key={token.id} className="hover:bg-white/20 dark:hover:bg-white/5 transition-colors group">
                        <TableCell className="font-medium">{token.user.name}</TableCell>
                        <TableCell className="text-zinc-500 dark:text-zinc-400">{token.user.phone}</TableCell>
                        <TableCell className="font-medium">{new Date(token.date).toLocaleDateString()} at {token.timeSlot}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`
                            ${token.status === 'PENDING' ? 'border-amber-500/50 text-amber-600 bg-amber-500/10' : ''}
                            ${token.status === 'APPROVED' ? 'border-emerald-500/50 text-emerald-600 bg-emerald-500/10' : ''}
                            ${token.status === 'REJECTED' ? 'border-rose-500/50 text-rose-600 bg-rose-500/10' : ''}
                          `}>
                            {token.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {token.status === "PENDING" && (
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20" onClick={() => actionWithToast(() => approveToken(token.id, true), "Token approved")}>
                                <CheckCircle className="size-4 mr-2" /> Approve
                              </Button>
                              <Button size="sm" variant="destructive" className="shadow-lg shadow-red-500/20" onClick={() => actionWithToast(() => approveToken(token.id, false), "Token rejected")}>
                                <XCircle className="size-4 mr-2" /> Reject
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="deliveries">
            <Card className="border-white/20 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-amber-500/10 to-transparent border-b border-white/10 pb-6">
                <CardTitle className="text-xl">Delivery Queue</CardTitle>
                <CardDescription>Assign and manage requested home deliveries.</CardDescription>
              </CardHeader>
              <div className="p-0">
                <Table>
                  <TableHeader className="bg-white/30 dark:bg-black/20">
                    <TableRow>
                      <TableHead className="font-bold">Consumer</TableHead>
                      <TableHead className="font-bold">Address</TableHead>
                      <TableHead className="font-bold">Status</TableHead>
                      <TableHead className="text-right font-bold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.deliveryRequests.map((req: any) => (
                      <TableRow key={req.id} className="hover:bg-white/20 dark:hover:bg-white/5 transition-colors group">
                        <TableCell className="font-medium">{req.user.name}</TableCell>
                        <TableCell className="text-zinc-500 dark:text-zinc-400 max-w-[250px] truncate">{req.address}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`
                            ${req.status === 'PENDING' ? 'border-amber-500/50 text-amber-600 bg-amber-500/10' : ''}
                            ${req.status === 'APPROVED' ? 'border-emerald-500/50 text-emerald-600 bg-emerald-500/10' : ''}
                            ${req.status === 'IN_TRANSIT' ? 'border-blue-500/50 text-blue-600 bg-blue-500/10' : ''}
                            ${req.status === 'REJECTED' ? 'border-rose-500/50 text-rose-600 bg-rose-500/10' : ''}
                          `}>
                            {req.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {req.status === "PENDING" && (
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white" onClick={() => actionWithToast(() => handleDeliveryRequest(req.id, true), "Delivery approved")}>
                                <CheckCircle className="size-4 mr-2" /> Approve
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => actionWithToast(() => handleDeliveryRequest(req.id, false), "Delivery rejected")}>
                                <XCircle className="size-4 mr-2" /> Reject
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="consumers">
            <Card className="border-white/20 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-lg overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-emerald-500/10 to-transparent border-b border-white/10 pb-6">
                <div>
                  <CardTitle className="text-xl">Network Consumers</CardTitle>
                  <CardDescription>Manage user accounts and identity links.</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/30 rounded-xl px-4 py-2">
                      <Plus className="size-4 mr-2" /> Add Consumer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="border-white/20 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-3xl shadow-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">Onboard New Consumer</DialogTitle>
                    </DialogHeader>
                    <form action={async (formData) => {
                      setIsAdding(true)
                      const res = await addConsumer({
                        name: formData.get('name') as string,
                        phone: formData.get('phone') as string,
                        aadhaar: formData.get('aadhaar') as string,
                        role: "CONSUMER",
                        otp: "123456",
                      })
                      if (res?.error) toast.error(res.error)
                      else {
                        toast.success("Consumer added")
                        window.location.reload()
                      }
                      setIsAdding(false)
                    }} className="space-y-5 mt-4">
                      <div className="space-y-2">
                        <Label className="font-semibold text-zinc-600 dark:text-zinc-300">Full Name</Label>
                        <Input name="name" required className="bg-white/50 dark:bg-black/20 border-white/20" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold text-zinc-600 dark:text-zinc-300">Contact Number</Label>
                        <Input name="phone" required maxLength={10} className="bg-white/50 dark:bg-black/20 border-white/20" placeholder="9876543210" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold text-zinc-600 dark:text-zinc-300">Aadhaar Identity</Label>
                        <Input name="aadhaar" required maxLength={12} className="bg-white/50 dark:bg-black/20 border-white/20" placeholder="123412341234" />
                      </div>
                      <Button type="submit" disabled={isAdding} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-600/20 py-6 text-lg font-bold mt-4">
                        {isAdding ? "Registering..." : "Create Account"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <div className="p-0">
                <Table>
                  <TableHeader className="bg-white/30 dark:bg-black/20">
                    <TableRow>
                      <TableHead className="font-bold">Name</TableHead>
                      <TableHead className="font-bold">Phone</TableHead>
                      <TableHead className="font-bold">Aadhaar (Masked)</TableHead>
                      <TableHead className="text-right font-bold w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.consumers.map((u: any) => (
                      <TableRow key={u.id} className="hover:bg-white/20 dark:hover:bg-white/5 transition-colors group relative">
                        <TableCell className="font-bold text-zinc-800 dark:text-zinc-200">{u.name}</TableCell>
                        <TableCell className="text-zinc-600 dark:text-zinc-400">{u.phone}</TableCell>
                        <TableCell className="font-mono text-zinc-500 tracking-wider">
                          **** **** {u.aadhaar.substring(8)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="icon" variant="ghost" className="text-rose-500 hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-all rounded-full" onClick={() => actionWithToast(() => deleteConsumer(u.id), "Consumer deleted")}>
                            <Trash2 className="size-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="complaints">
            <Card className="border-white/20 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-rose-500/10 to-transparent border-b border-white/10 pb-6">
                <CardTitle className="text-xl">System Complaints</CardTitle>
                <CardDescription>Review grievances filed by consumers.</CardDescription>
              </CardHeader>
              <div className="p-0">
                <Table>
                  <TableHeader className="bg-white/30 dark:bg-black/20">
                    <TableRow>
                      <TableHead className="font-bold">Consumer</TableHead>
                      <TableHead className="font-bold">Category</TableHead>
                      <TableHead className="font-bold">Message Info</TableHead>
                      <TableHead className="font-bold">Status Tracker</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.complaints.map((c: any) => (
                      <TableRow key={c.id} className="hover:bg-white/20 dark:hover:bg-white/5">
                        <TableCell className="font-semibold">{c.user.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-rose-500/30 text-rose-500 bg-rose-500/5">{c.type}</Badge>
                        </TableCell>
                        <TableCell className="max-w-[300px] truncate text-zinc-600 dark:text-zinc-400 font-medium">{c.message}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                             <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                            </span>
                            <span className="font-semibold text-rose-600">{c.status}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
