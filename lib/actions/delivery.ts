"use server"

import { getMockDb } from "./owner"

export async function getAgentData() {
  const mockDb = getMockDb()
  const agentId = "agent1" // Match mock agent

  // Deliveries strictly mapped to this agent or still pending globally
  const pendingDeliveries = mockDb.deliveryRequests
    .filter(req => req.agentId === agentId || req.status === "PENDING" || req.status === "APPROVED" || req.status === "IN_TRANSIT")
    .map(req => ({ ...req, user: mockDb.users.find(u => u.id === req.userId) }))

  return { user: mockDb.users.find(u => u.id === agentId), pendingDeliveries }
}

export async function verifyAndCompleteDelivery(deliveryId: string, otp: string) {
  const mockDb = getMockDb()
  const delivery = mockDb.deliveryRequests.find(d => d.id === deliveryId)

  if (!delivery) return { error: "Delivery not found" }
  if (delivery.otp !== otp) return { error: "Invalid OTP provided" }

  delivery.status = "DELIVERED"
  return { success: true }
}
