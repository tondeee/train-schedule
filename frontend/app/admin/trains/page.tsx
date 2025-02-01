'use client'

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, ArrowUpDown, Pencil, Trash } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { deleteTrain, getTrains } from "@/actions/trainAction"
import { Train } from "@/packages/types/api"
import { useToast } from "@/hooks/use-toast"

export default function TrainsListPage() {
  const [trains, setTrains] = useState<Train[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadTrains()
  }, [])

  const loadTrains = async () => {
    try {
      const response = await getTrains(undefined, undefined, undefined, 1, 10)
      if (response) {
        setTrains(response.data)
      }
      setIsLoading(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load trains"
      })
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteTrain(id.toString())
      toast({
        title: "Success",
        description: "Train deleted successfully"
      })
      await loadTrains()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete train"
      })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trains</h1>
        <Link href="/admin/trains/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Train
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
                Assigned Route <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trains.map((train) => (
            <TableRow key={train.id}>
              <TableCell className="font-medium">{train.name}</TableCell>
              <TableCell>{train.route.name}</TableCell>
              <TableCell className="text-right">
                <Link href={`/admin/trains/${train.id}/edit`}>
                  <Button variant="ghost" size="sm" className="mr-2">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive"
                  onClick={() => handleDelete(train.id)}
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

