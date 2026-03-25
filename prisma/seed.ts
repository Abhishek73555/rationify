import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clean old data (using deleteMany for cascading)
  await prisma.distributionLog.deleteMany()
  await prisma.complaint.deleteMany()
  await prisma.deliveryRequest.deleteMany()
  await prisma.token.deleteMany()
  await prisma.user.deleteMany()

  // 1. Create Owner
  const owner = await prisma.user.create({
    data: {
      name: 'PDS Shop Admin',
      phone: '9999999999',
      aadhaar: '123412341234',
      role: 'OWNER',
    },
  })

  // 2. Create Delivery Agent
  const agent = await prisma.user.create({
    data: {
      name: 'Ramu Delivery',
      phone: '8888888888',
      aadhaar: '432143214321',
      role: 'DELIVERY_AGENT',
    },
  })

  // 3. Create Consumers
  const c1 = await prisma.user.create({
    data: {
      name: 'Arjun Kumar',
      phone: '7777777777',
      aadhaar: '111122223333',
      role: 'CONSUMER',
    },
  })

  const c2 = await prisma.user.create({
    data: {
      name: 'Priya Verma',
      phone: '6666666666',
      aadhaar: '222233334444',
      role: 'CONSUMER',
    },
  })

  // 4. Create Tokens
  await prisma.token.create({
    data: {
      userId: c1.id,
      date: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
      timeSlot: 'Morning (9AM - 12PM)',
      status: 'APPROVED',
    },
  })
  
  await prisma.token.create({
    data: {
      userId: c2.id,
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      timeSlot: 'Afternoon (1PM - 4PM)',
      status: 'PENDING',
    },
  })

  // 5. Create Delivery Requests
  await prisma.deliveryRequest.create({
    data: {
      userId: c1.id,
      address: 'House 42, Green Street, City',
      otp: '123456',
      status: 'APPROVED',
      agentId: agent.id,
    },
  })

  await prisma.deliveryRequest.create({
    data: {
      userId: c2.id,
      address: 'Flat 5B, Blue Apartments, City',
      otp: '654321',
      status: 'PENDING',
    },
  })

  // 6. Create Complaints
  await prisma.complaint.create({
    data: {
      userId: c1.id,
      type: 'LESS_RATION',
      message: 'Received 4kg rice instead of 5kg.',
      status: 'OPEN',
    },
  })

  // 7. Create Logs
  await prisma.distributionLog.create({
    data: {
      date: new Date(),
      totalTokens: 45,
      totalDelivered: 12,
    },
  })

  console.log('Seeding finished.')
  console.log('--------------------------------')
  console.log('Test Accounts (OTP is always 123456 unless explicitly mocked inside DB for deliveries):')
  console.log(`OWNER: Phone: ${owner.phone}`)
  console.log(`DELIVERY: Phone: ${agent.phone}`)
  console.log(`CONSUMER: Phone: ${c1.phone}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
