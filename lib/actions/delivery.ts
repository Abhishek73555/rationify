"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

async function verifyAgent() {
  const user = await prisma.user.findFirst({ where: { role: "DELIVERY_AGENT" } })
  if (!user) throw new Error("No agent found")
  return { user }
}

export async function getAgentData() {
  await verifyAgent()
  const pendingDeliveries = await prisma.deliveryRequest.findMany({
    where: {
      status: { in: ["APPROVED", "IN_TRANSIT"] }
    },
    include: {
      user: { select: { name: true, phone: true } }
    },
    orderBy: { createdAt: "desc" }
  })

  return { pendingDeliveries }
}

export async function verifyAndCompleteDelivery(id: string, otp: string) {
  await verifyAgent()

  const req = await prisma.deliveryRequest.findUnique({ where: { id } })
  if (!req) return { error: "Not found" }

  if (req.otp !== otp) return { error: "Invalid OTP" }

  await prisma.deliveryRequest.update({
    where: { id },
    data: { status: "DELIVERED" }
  })

  // update distribution log
  const today = new Date()
  today.setHours(0,0,0,0)
  try {
    const existingLog = await prisma.distributionLog.findFirst({
      where: { date: today }
    })
    if (existingLog) {
      await prisma.distributionLog.update({
        where: { id: existingLog.id },
        data: { totalDelivered: { increment: 1 } }
      })
    } else {
      await prisma.distributionLog.create({
        data: { totalDelivered: 1, date: today }
      })
    }
  } catch(e) {
    // optional failure in logging
  }

  revalidatePath("/delivery")
  return { success: true }
}
