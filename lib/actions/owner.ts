"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

async function verifyOwner() {
  // Mock verification, just returns true
  return true
}

export async function getOwnerDashboardData() {
  await verifyOwner()

  const [consumers, tokens, deliveryRequests, complaints, summary] = await Promise.all([
    prisma.user.findMany({
      where: { role: "CONSUMER" },
      select: { id: true, name: true, phone: true, aadhaar: true, createdAt: true }
    }),
    prisma.token.findMany({
      include: { user: { select: { name: true, phone: true } } },
      orderBy: { createdAt: "desc" }
    }),
    prisma.deliveryRequest.findMany({
      include: { user: { select: { name: true, phone: true } } },
      orderBy: { createdAt: "desc" }
    }),
    prisma.complaint.findMany({
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" }
    }),
    prisma.distributionLog.aggregate({
      _sum: { totalTokens: true, totalDelivered: true }
    })
  ])

  return { consumers, tokens, deliveryRequests, complaints, summary }
}

export async function approveToken(id: string, approve: boolean) {
  await verifyOwner()
  await prisma.token.update({
    where: { id },
    data: { status: approve ? "APPROVED" : "REJECTED" }
  })
  
  if (approve) {
    const today = new Date()
    today.setHours(0,0,0,0)
    await prisma.distributionLog.upsert({
      where: { id: `log-${today.toISOString()}` },
      update: { totalTokens: { increment: 1 } },
      create: { totalTokens: 1, date: today }
    })
  }
  revalidatePath("/owner")
}

export async function handleDeliveryRequest(id: string, approve: boolean) {
  await verifyOwner()
  await prisma.deliveryRequest.update({
    where: { id },
    data: { status: approve ? "APPROVED" : "REJECTED" }
  })
  revalidatePath("/owner")
}

export async function deleteConsumer(id: string) {
  await verifyOwner()
  await prisma.user.delete({ where: { id } })
  revalidatePath("/owner")
}

export async function addConsumer(data: any) {
  try {
    await verifyOwner()
    await prisma.user.create({
      data: {
        name: data.name,
        phone: data.phone,
        aadhaar: data.aadhaar,
        role: "CONSUMER",
      }
    })
    revalidatePath("/owner")
    return { success: true }
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" }
  }
}
