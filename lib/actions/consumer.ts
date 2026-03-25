"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

async function verifyConsumer() {
  const user = await prisma.user.findFirst({ where: { role: "CONSUMER" } })
  if (!user) throw new Error("No consumer found")
  return { user }
}

export async function getConsumerData() {
  const session = await verifyConsumer()
  const userId = session.user.id

  const [tokens, deliveryRequests, complaints] = await Promise.all([
    prisma.token.findMany({ where: { userId }, orderBy: { createdAt: "desc" } }),
    prisma.deliveryRequest.findMany({ where: { userId }, orderBy: { createdAt: "desc" } }),
    prisma.complaint.findMany({ where: { userId }, orderBy: { createdAt: "desc" } }),
  ])
  return { tokens, deliveryRequests, complaints }
}

export async function requestToken(formData: FormData) {
  const session = await verifyConsumer()
  const date = formData.get("date") as string
  const timeSlot = formData.get("timeSlot") as string

  if (!date || !timeSlot) return { error: "Missing fields" }

  await prisma.token.create({
    data: {
      userId: session.user.id,
      date: new Date(date),
      timeSlot,
    }
  })
  revalidatePath("/consumer")
}

export async function requestDelivery(formData: FormData) {
  const session = await verifyConsumer()
  const address = formData.get("address") as string
  if (!address) return { error: "Address is required" }

  await prisma.deliveryRequest.create({
    data: {
      userId: session.user.id,
      address,
      otp: Math.floor(100000 + Math.random() * 900000).toString(), // Generate a 6-digit OTP
    }
  })
  revalidatePath("/consumer")
}

export async function submitComplaint(formData: FormData) {
  const session = await verifyConsumer()
  const type = formData.get("type") as any
  const message = formData.get("message") as string

  if (!type || !message) return { error: "Missing fields" }

  await prisma.complaint.create({
    data: {
      userId: session.user.id,
      type,
      message,
    }
  })
  revalidatePath("/consumer")
}
