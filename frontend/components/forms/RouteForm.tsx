"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { CreateRouteDto, CreateStopDto, CreateStopWithoutRouteDto, Station, UpdateRouteDto } from "@/packages/types/api"
import { StationSelect } from "@/components/shared/StationSelect"
import { getAllStations } from "@/actions/stationAction"
import { createRoute, updateRoute } from "@/actions/routeAction"
import { formatTimeFromServer, formatTimeToServer, sanitizeDescription } from "@/lib/utils"

interface FormStop {
  id: number
  station: {
    id: number
    name: string
    location?: string
  }
  arrivalTime: string
  departureTime: string
}

interface Route {
  id?: number
  name: string
  description: string
  stops: FormStop[]
}

interface RouteFormProps {
  initialData?: Route
  isEditing?: boolean
}

export function RouteForm({ initialData, isEditing = false }: RouteFormProps) {
  const router = useRouter()
  const [stations, setStations] = useState<Station[]>([])
  const [route, setRoute] = useState<Route>(() => {
    if (initialData) {
      return {
        ...initialData,
        stops: initialData.stops.map(stop => ({
          id: stop.id,
          station: {
            id: stop.station.id,
            name: stop.station.name,
            location: stop.station.location
          },
          arrivalTime: stop.arrivalTime,
          departureTime: stop.departureTime
        }))
      }
    }
    return {
      name: "",
      description: "",
      stops: []
    }
  })

  useEffect(() => {
    const fetchStations = async () => {
      const result = await getAllStations()
      if (result?.data) {
        setStations(result.data)
      }
    }
    fetchStations()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setRoute((prev) => ({
      ...prev,
      [name]: name === 'description' ? sanitizeDescription(value) : value
    }))
  }

  const handleStopChange = (id: number, field: string, value: string) => {
    setRoute((prev) => ({
      ...prev,
      stops: prev.stops.map((stop) => {
        if (stop.id === id) {
          if (field === "station") {
            const selectedStation = stations.find(s => s.id === parseInt(value))
            return selectedStation ? {
              ...stop,
              station: {
                id: selectedStation.id,
                name: selectedStation.name,
                location: selectedStation.location
              }
            } : stop
          }
          
          if (field === "arrivalTime" || field === "departureTime") {
            return { ...stop, [field]: formatTimeToServer(value) }
          }
          
          return { ...stop, [field]: value }
        }
        return stop
      })
    }))
  }

  const addStop = () => {
    const newStop: FormStop = {
      id: Date.now(), // Use timestamp as local ID
      station: {
        id: 0,
        name: ""
      },
      arrivalTime: new Date().toISOString(),
      departureTime: new Date(Date.now() + 3600000).toISOString(), // Default to 1 hour after arrival
    }
    setRoute((prev) => ({
      ...prev,
      stops: [...prev.stops, newStop]
    }))
  }

  const removeStop = (id: number) => {
    setRoute((prev) => ({
      ...prev,
      stops: prev.stops.filter((stop) => stop.id !== id),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formattedStops = route.stops.map(stop => ({
      station: { id: stop.station.id },
      arrivalTime: stop.arrivalTime,
      departureTime: stop.departureTime
    }))

    const data = {
      name: route.name.trim(),
      description: sanitizeDescription(route.description),
      stops: formattedStops
    }

    try {
      if (isEditing && initialData?.id) {
        await updateRoute(initialData.id.toString(), data)
      } else {
        await createRoute(data)
      }
      router.push('/admin/routes')
      router.refresh()
    } catch (err) {
      console.error('Failed to save route:', err)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Route" : "Create New Route"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
     
            <div className="space-y-2">
              <Label htmlFor="name">Route Name</Label>
              <Input id="name" name="name" value={route.name} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={route.description} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label>Stops</Label>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sequence</TableHead>
                    <TableHead>Station</TableHead>
                    <TableHead>Arrival Time</TableHead>
                    <TableHead>Departure Time</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {route.stops.map((stop) => (
                    <TableRow key={stop.id}>
                      {/* <TableCell>{stop.sequence}</TableCell> */}
                      <TableCell>
                        <StationSelect
                          stations={stations}
                          value={stop.station.id.toString()}
                          onChange={(value) => handleStopChange(stop.id, "station", value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="time"
                          value={formatTimeFromServer(stop.arrivalTime)}
                          onChange={(e) => handleStopChange(stop.id, "arrivalTime", e.target.value)}
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="time"
                          value={formatTimeFromServer(stop.departureTime)}
                          onChange={(e) => handleStopChange(stop.id, "departureTime", e.target.value)}
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => removeStop(stop.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button variant="outline" onClick={addStop}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Stop
              </Button>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Save Route</Button>
            </div>
         
        </form>
      </CardContent>
    </Card>
  )
}
