import { getTrain } from "@/actions/trainAction"
import { getAllRoutes } from "@/actions/routeAction"
import { TrainForm } from "@/components/forms/TrainForm"
import { notFound } from "next/navigation"

export default async function TrainEditPage({ params }: { params: { id: string } }) {
  try {
    const [trainResult, routesResult] = await Promise.all([
      getTrain(params.id),
      getAllRoutes(1, 100) 
    ])
    
    if (!trainResult || !routesResult) {
      notFound()
    }

    return (
      <div className="container mx-auto py-10">
        <TrainForm 
          initialTrain={trainResult}
          routes={routesResult.data}
          title="Edit Train" 
          mode="edit"
        />
      </div>
    )
  } catch (error) {
    throw error
  }
}

