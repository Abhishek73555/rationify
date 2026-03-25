"use server"

import { mockDb } from "../mockDb"

export async function getOwnerDashboardData() {
  // Join references
  const consumers = mockDb.users.filter(u => u.role === "CONSUMER")
  const tokens = mockDb.tokens.map(t => ({ ...t, user: mockDb.users.find(u => u.id === t.userId) }))
  const deliveryRequests = mockDb.deliveryRequests.map(d => ({ ...d, user: mockDb.users.find(u => u.id === d.userId) }))
  const complaints = mockDb.complaints.map(c => ({ ...c, user: mockDb.users.find(u => u.id === c.userId) }))

  return { consumers, tokens, deliveryRequests, complaints }
}

export async function approveToken(id: string, approved: boolean) {
  const token = mockDb.tokens.find(t => t.id === id)
  if (token) token.status = approved ? "APPROVED" : "REJECTED"
}

export async function deleteConsumer(userId: string) {
  mockDb.users = mockDb.users.filter(u => u.id !== userId)
}

export async function handleDeliveryRequest(id: string, approve: boolean) {
  const req = mockDb.deliveryRequests.find(r => r.id === id)
  if (req) {
    req.status = approve ? "IN_TRANSIT" : "REJECTED"
    if (approve) req.agentId = "agent1"
  }
}

export async function addConsumer(data: any) {
  const exists = mockDb.users.find(u => u.phone === data.phone || u.aadhaar === data.aadhaar)
  if (exists) return { error: "Consumer already exists" }
  mockDb.users.push({ id: `user_${Date.now()}`, ...data })
  return { success: true }
}
