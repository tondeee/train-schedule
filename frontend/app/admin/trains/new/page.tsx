import { TrainForm } from "@/components/forms/TrainForm"
import { getAllRoutes } from "@/actions/routeAction"
import { Route } from "@/packages/types/api/models/Route"

export default async function TrainCreatePage() {
  const routes = await getAllRoutes(1, 100)
  const routeData = routes?.data ?? []

  return (
    <div className="container mx-auto py-10">
      <TrainForm routes={routeData} title="Create New Train" />
    </div>
  )
}

