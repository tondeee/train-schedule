'use client'

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, ArrowUpDown, Pencil, Trash } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { deleteRoute, getAllRoutes } from "@/actions/routeAction"
import { Route } from "@/packages/types/api/models/Route"
import { useToast } from "@/hooks/use-toast"

export default function RoutesListPage() {
  const [routes, setRoutes] = useState<Route[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadRoutes()
  }, [])

  const loadRoutes = async () => {
    try {
      const response = await getAllRoutes()
      if (response) {
        setRoutes(response.data)
      }
      setIsLoading(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load routes"
      })
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteRoute(id.toString())
      toast({
        title: "Success",
        description: "Route deleted successfully"
      })
      await loadRoutes()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete route"
      })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Routes</h1>
        <Link href="/admin/routes/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Route
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
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routes.map((route) => (
            <TableRow key={route.id}>
              <TableCell className="font-medium">{route.name}</TableCell>
              <TableCell>{route.description}</TableCell>
              <TableCell className="text-right">
                <Link href={`/admin/routes/${route.id}/edit`}>
                  <Button variant="ghost" size="sm" className="mr-2">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive"
                  onClick={() => handleDelete(route.id)}
                >
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

