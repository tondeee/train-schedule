"use client"

import { StationForm } from "@/components/forms/StationForm"
import { useRouter } from "next/navigation"
import { createStation } from "@/actions/stationAction"
import { useToast } from "@/hooks/use-toast"
import { CreateStationDto } from "@/packages/types/api"

export default function StationCreatePage() {
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (formData: CreateStationDto) => {
    try {
      const response = await createStation(formData)
      
      toast({
        title: "Success",
        description: "Station created successfully",
      })
      router.push("/admin/stations")
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create station: " + (error instanceof Error ? error.message : "Unknown error"),
      })
      console.error("Error creating station:", error)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <StationForm 
        mode="create"
        onSubmit={handleSubmit} 
        title="Create New Station"
        initialStation={{ name: "", location: "" }}
      />
    </div>
  )
}

