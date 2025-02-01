"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowUpDown, Pencil, PlusCircle, Trash } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAllStations, deleteStation } from "@/actions/stationAction"
import type { Station } from "@/packages/types/api/models/Station"

export default function StationsListPage() {
  const [stations, setStations] = useState<Station[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchStations = async () => {
      const response = await getAllStations(1, 100)
      if (response) {
        setStations(response.data)
      }
      setLoading(false)
    }
    fetchStations()
  }, [])

  const handleEdit = (id: number) => {
    router.push(`/admin/stations/${id}/edit`)
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteStation(id.toString())
      setStations(stations.filter((station) => station.id !== id))
    } catch (error) {
      console.error('Failed to delete station:', error)
    }
  }

  if (loading) {
    return <div>Loading stations...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Stations</h1>
        <Link href="/admin/stations/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Station
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">
              <Button variant="ghost" className="flex items-center">
                Name <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="flex items-center">
                Location <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stations.map((station) => (
            <TableRow key={station.id}>
              <TableCell className="font-medium">{station.name}</TableCell>
              <TableCell>{station.location}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="mr-2" onClick={() => handleEdit(station.id)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(station.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

