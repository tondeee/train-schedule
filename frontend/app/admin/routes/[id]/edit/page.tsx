import { getRouteById } from "@/actions/routeAction"
import { RouteForm } from "@/components/forms/RouteForm"
import { notFound } from "next/navigation"

export default async function RouteEditPage({ params }: { params: Promise<{ id: string }>}) {

  const { id } = await params

  const route = await getRouteById(id)

  if (!route) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <RouteForm initialData={route} isEditing={true} />
    </div>
  )
}

