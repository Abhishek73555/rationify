import { getOwnerDashboardData } from "@/lib/actions/owner"
import OwnerDashboardClient from "./client"

export default async function OwnerDashboardPage() {
  const data = await getOwnerDashboardData()
  return <OwnerDashboardClient initialData={data} />
}
