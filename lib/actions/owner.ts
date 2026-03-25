"use server"

// In-Memory mock database for Vercel Serverless deployment
let mockDb = {
  users: [
    { id: "owner1", name: "PDS Shop Admin", phone: "9999999999", aadhaar: "123412341234", role: "OWNER" },
    { id: "agent1", name: "Ramu Delivery", phone: "8888888888", aadhaar: "432143214321", role: "DELIVERY_AGENT" },
    { id: "user1", name: "Arjun Kumar", phone: "7777777777", aadhaar: "111122223333", role: "CONSUMER" },
    { id: "user2", name: "Priya Verma", phone: "6666666666", aadhaar: "222233334444", role: "CONSUMER" }
  ],
  tokens: [
    { id: "t1", userId: "user1", date: new Date(new Date().setDate(new Date().getDate() + 1)), timeSlot: "Morning (9AM - 12PM)", status: "APPROVED" },
    { id: "t2", userId: "user2", date: new Date(new Date().setDate(new Date().getDate() + 2)), timeSlot: "Afternoon (1PM - 4PM)", status: "PENDING" }
  ],
  deliveryRequests: [
    { id: "d1", userId: "user1", address: "House 42, Green Street, City", otp: "123456", status: "APPROVED", agentId: "agent1" },
    { id: "d2", userId: "user2", address: "Flat 5B, Blue Apartments, City", otp: "654321", status: "PENDING", agentId: null }
  ],
  complaints: [
    { id: "c1", userId: "user1", type: "LESS_RATION", message: "Received 4kg rice instead of 5kg.", status: "OPEN" }
  ]
}

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

export function getMockDb() {
  return mockDb;
}
