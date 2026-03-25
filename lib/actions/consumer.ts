"use server"

import { getMockDb } from "./owner"

export async function getConsumerData() {
  const mockDb = getMockDb()
  const user = mockDb.users.find(u => u.role === "CONSUMER")
  if (!user) return null

  const tokens = mockDb.tokens.filter(t => t.userId === user.id)
  const deliveryRequests = mockDb.deliveryRequests.filter(d => d.userId === user.id)
  const complaints = mockDb.complaints.filter(c => c.userId === user.id)

  return { user, tokens, deliveryRequests, complaints }
}

export async function requestToken(formData: FormData) {
  const mockDb = getMockDb()
  const user = mockDb.users.find(u => u.role === "CONSUMER")
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
  const mockDb = getMockDb()
  const user = mockDb.users.find(u => u.role === "CONSUMER")
  if (!user) return { error: "Consumer not found" }

  const address = formData.get("address") as string

  mockDb.deliveryRequests.push({
    id: `d_${Date.now()}`,
    userId: user.id,
    address,
    status: "PENDING",
    otp: Math.floor(100000 + Math.random() * 900000).toString(),
    agentId: null
  })

  return { success: true }
}

export async function submitComplaint(formData: FormData) {
  const mockDb = getMockDb()
  const user = mockDb.users.find(u => u.role === "CONSUMER")
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
