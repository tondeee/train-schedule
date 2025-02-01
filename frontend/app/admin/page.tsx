
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { Building2, MapPin, Train, Users } from "lucide-react"

const adminRoutes = [
  
  {
    title: 'Trains',
    description: 'Manage trains and their details',
    href: '/admin/trains',
    icon: Train
  },
  {
    title: 'Routes',
    description: 'Manage train routes and their stops',
    href: '/admin/routes',
    icon: MapPin
  },
  {
    title: 'Stations',
    description: 'Manage train stations and their details',
    href: '/admin/stations',
    icon: Building2
  },
 
]

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the train schedule management system
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {adminRoutes.map((route) => {
          const Icon = route.icon
          return (
            <Card key={route.href} className="hover:bg-accent/50 transition-colors">
              <Link href={route.href}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon className="h-6 w-6" />
                    <CardTitle>{route.title}</CardTitle>
                  </div>
                  <CardDescription>{route.description}</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          )
        })}
      </div>
    </div>
  )
}