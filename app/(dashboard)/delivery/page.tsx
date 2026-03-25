import { getAgentData } from "@/lib/actions/delivery"
import DeliveryDashboardClient from "./client"

export default async function DeliveryDashboardPage() {
  const data = await getAgentData()
  return <DeliveryDashboardClient initialData={data} />
}
