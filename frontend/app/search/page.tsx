import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTrains } from "@/actions/trainAction"
import { Loader2 } from "lucide-react"
import { Suspense } from "react"

type SearchPageProps = {
  searchParams: Promise<{
    from?: string
    to?: string
    date?: string
  }>
}

async function TrainResults({ searchParams }: { searchParams: SearchPageProps['searchParams'] }) {
  const params = await searchParams
  const formattedDate = params.date ? new Date(params.date).toISOString() : undefined;
  
  const trains = await getTrains(
    params.from ? parseInt(params.from) : undefined,
    params.to ? parseInt(params.to) : undefined,
    formattedDate
  )

  const renderMessage = (message: string) => (
    <Card>
      <CardContent className="py-8">
        <p className="text-center text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  )

  if (!trains) {
    return renderMessage("Failed to fetch train data. Please try again later.")
  }

  if (!trains.data.length) {
    return renderMessage("No trains found for your search criteria")
  }
  
  return (
    <>
      {trains.data.map((train, index) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{train.name}</span>
              <Badge>{train.route.name}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{train.route.description}</p>
            <div className="relative">
              <div className="absolute top-4 left-4 w-[2px] h-[calc(100%-32px)] bg-primary"></div>
              {train.route.stops.map((stop, index) => (
                <div key={stop.id} className="flex items-start mb-4 relative">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm mr-4 relative z-10">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{stop.station.name}</h3>
                    <p className="text-sm text-muted-foreground">{stop.station.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

export default async function TrainSearchResults({ searchParams }: SearchPageProps) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Train Search Results</h1>
      
      <div className="space-y-4">
        <Suspense fallback={
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        }>
          <TrainResults searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  )
}

