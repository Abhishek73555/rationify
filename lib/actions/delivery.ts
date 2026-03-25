"use server"

import { mockDb } from "../mockDb"

export async function getAgentData() {
  const agentId = "agent1" // Match mock agent

  // Deliveries strictly mapped to this agent or still pending globally
  const pendingDeliveries = mockDb.deliveryRequests
    .filter((req: any) => req.agentId === agentId || req.status === "PENDING" || req.status === "APPROVED" || req.status === "IN_TRANSIT")
    .map((req: any) => ({ ...req, user: mockDb.users.find((u: any) => u.id === req.userId) }))

  return { user: mockDb.users.find((u: any) => u.id === agentId), pendingDeliveries }
}

export async function verifyAndCompleteDelivery(deliveryId: string, otp: string) {
  const delivery = mockDb.deliveryRequests.find((d: any) => d.id === deliveryId)

  if (!delivery) return { error: "Delivery not found" }
  if (delivery.otp !== otp) return { error: "Invalid OTP provided" }

  delivery.status = "DELIVERED"
  return { success: true }
}
