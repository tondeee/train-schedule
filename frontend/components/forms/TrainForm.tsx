"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Route } from "@/packages/types/api/models/Route"
import { Train } from "@/packages/types/api/models/Train"
import { useRouter } from "next/navigation"
import { createTrain, updateTrain } from "@/actions/trainAction"
import { CreateTrainDto, UpdateTrainDto } from "@/packages/types/api"
import { Checkbox } from "@/components/ui/checkbox"
import { DAYS } from "@/lib/utils"


interface TrainFormProps {
  initialTrain?: Train
  routes: Route[]
  title: string
  mode?: 'create' | 'edit'
  trainId?: string  
}

export function TrainForm({ initialTrain, routes, title, mode = 'create', trainId }: TrainFormProps) {
  const router = useRouter()
  const [train, setTrain] = useState<CreateTrainDto | UpdateTrainDto>({
    name: initialTrain?.name || "",
    route: initialTrain?.route,
    scheduleDays: initialTrain?.scheduleDays || 0
  })

  useEffect(() => {
    if (initialTrain) {
      setTrain({
        name: initialTrain.name,
        route: initialTrain.route,
        scheduleDays: initialTrain.scheduleDays
      })
    }
  }, [initialTrain])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTrain((prev) => ({ ...prev, [name]: value }))
  }

  const handleRouteChange = (value: string) => {
    const selectedRoute = routes.find(r => r.id.toString() === value)
    if (selectedRoute) {
      setTrain((prev) => ({ 
        ...prev, 
        route: selectedRoute
      }))
    }
  }

  const handleDayToggle = (dayValue: number) => {
    setTrain(prev => ({
      ...prev,
      scheduleDays: prev.scheduleDays! ^ dayValue 
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (mode === 'edit' && trainId) {
        await updateTrain(trainId, train as UpdateTrainDto)
      } else {
        await createTrain(train as CreateTrainDto)
      }
      router.push('/admin/trains')
      router.refresh()
    } catch (error) {
      console.error('Failed to save train:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Train Name</Label>
            <Input id="name" name="name" value={train.name} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="route">Assigned Route</Label>
            <Select 
              value={train.route?.id?.toString()} 
              onValueChange={handleRouteChange} 
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a route" />
              </SelectTrigger>
              <SelectContent>
                {routes.map((route) => (
                  <SelectItem key={route.id} value={route.id.toString()}>
                    {route.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Schedule Days</Label>
            <div className="grid grid-cols-2 gap-4">
              {DAYS.map((day) => (
                <div key={day.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`day-${day.value}`}
                    checked={(train.scheduleDays! & day.value) !== 0}
                    onCheckedChange={() => handleDayToggle(day.value)}
                  />
                  <Label htmlFor={`day-${day.value}`}>{day.label}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Link href="/trains">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit">Save Train</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

