"use server"

import { mockDb } from "../mockDb"

export async function getConsumerData() {
  const user = mockDb.users.find((u: any) => u.role === "CONSUMER")
  if (!user) return null

  const tokens = mockDb.tokens.filter((t: any) => t.userId === user.id)
  const deliveryRequests = mockDb.deliveryRequests.filter((d: any) => d.userId === user.id)
  const complaints = mockDb.complaints.filter((c: any) => c.userId === user.id)

  return { user, tokens, deliveryRequests, complaints }
}

export async function requestToken(formData: FormData) {
  const user = mockDb.users.find((u: any) => u.role === "CONSUMER")
  if (!user) return { error: "Consumer not found" }

  const dateStr = formData.get("date") as string
  const timeSlot = formData.get("timeSlot") as string

  mockDb.tokens.push({
    id: `t_${Date.now()}`,
    userId: user.id,
    date: new Date(dateStr) as any, // Mock Date
    timeSlot,
    status: "PENDING"
  })

  return { success: true }
}

export async function requestDelivery(formData: FormData) {
  const user = mockDb.users.find((u: any) => u.role === "CONSUMER")
  if (!user) return { error: "Consumer not found" }

  const address = formData.get("address") as string

  mockDb.deliveryRequests.push({
    id: `d_${Date.now()}`,
    userId: user.id,
    address,
    status: "PENDING",
    otp: Math.floor(100000 + Math.random() * 900000).toString(),
    agentId: null as string | null
  })

  return { success: true }
}

export async function submitComplaint(formData: FormData) {
  const user = mockDb.users.find((u: any) => u.role === "CONSUMER")
  if (!user) return { error: "Consumer not found" }

  const type = formData.get("type") as string
  const message = formData.get("message") as string

  mockDb.complaints.push({
    id: `c_${Date.now()}`,
    userId: user.id,
    type,
    message,
    status: "OPEN"
  })

  return { success: true }
}
