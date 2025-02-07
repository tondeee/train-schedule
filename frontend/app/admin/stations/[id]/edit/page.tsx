import { StationForm } from "@/components/forms/StationForm"
import { getStationById, updateStation } from "@/actions/stationAction"

import { redirect } from "next/navigation"
import { UpdateStationDto } from "@/packages/types/api"

export default async function EditStationPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params
  const station = await getStationById(id)

  if (!station) {
    return <div>Station not found</div>
  }

  const handleSubmit = async (data: UpdateStationDto) => {
    'use server'
    await updateStation(id, data)
    redirect('/admin/stations')
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Station</h1>
      <StationForm 
        mode="edit"
        initialStation={station} 
        onSubmit={handleSubmit}
        title="Edit Station"
      />
    </div>
  )
}

