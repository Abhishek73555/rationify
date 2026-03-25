import { getConsumerData } from "@/lib/actions/consumer"
import ConsumerDashboardClient from "./client"

export default async function ConsumerDashboardPage() {
  const data = await getConsumerData()
  return <ConsumerDashboardClient initialData={data} />
}
