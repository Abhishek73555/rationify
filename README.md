# Rationify Next-Gen Portal 🌾

A beautifully designed, ultra-modern Public Distribution System (PDS) portal crafted with Next.js 14, Framer Motion, and Tailwind CSS. The application features a fully responsive Glassmorphic aesthetic, parallax backgrounds, and mock offline database functionality via SQLite.

## ✨ Features
- **Premium Glassmorphic UI:** Built with backdrop-blur cards, fluid gradients, and Framer Motion spring animations.
- **Offline Mock DB:** Uses Prisma ORM with SQLite, so no complex PostgreSQL setups or external database dependencies are required. Just run it!
- **Role-Based Portals:**
  - **Admin / Owner Dashboard:** Manage consumers, verify active token queues, and check real-time complaints statistics.
  - **Consumer Dashboard:** Let verified users safely request tokens, ask for home drops, and track delivery status.
  - **Delivery Agent Navigation:** Verify home deliveries securely using 6-Digit OTPs.
- **Zero Authentication Wall:** Removed NextAuth layers for immediate demo and testing accessibility!

## 🚀 Getting Started

1. **Install Dependencies:**
```bash
npm install
```

2. **Run the Development Server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Test Accounts (Default Seed)
After running the seed script, log into any portal. The data interacts with these default mock accounts:

- **Admin/Owner Phone No:** `9999999999`
- **Delivery Agent Phone No:** `8888888888`
- **Consumer Phone No:** `7777777777`

*Note: Any delivery OTPs generated natively inside the portal default to `123456` during testing scenarios.*

## 🛠️ Built With
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS & shadcn/ui**
- **Framer Motion** (Spring Animations & Parallax)
- **Prisma & SQLite**
