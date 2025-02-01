"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { CreateStationDto, Station, UpdateStationDto } from "@/packages/types/api"

type StationFormProps = {
  title: string;
} & (
  | {
      mode: "create";
      initialStation?: CreateStationDto;
      onSubmit: (station: CreateStationDto) => void | Promise<void>;
    }
  | {
      mode: "edit";
      initialStation: Station;
      onSubmit: (station: UpdateStationDto) => void | Promise<void>;
    }
);

export function StationForm({ initialStation, onSubmit, title, mode }: StationFormProps) {
  const [station, setStation] = useState<CreateStationDto>({
    name: initialStation?.name || "",
    location: initialStation?.location || "",
  })

  useEffect(() => {
    if (initialStation) {
      setStation({
        name: initialStation.name || "",
        location: initialStation.location || "",
      })
    }
  }, [initialStation])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setStation((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(station)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Station Name</Label>
            <Input id="name" name="name" value={station.name} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" value={station.location} onChange={handleInputChange} required />
          </div>
          <div className="flex justify-end space-x-2">
            <Link href="/admin/stations">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit">Save Station</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

