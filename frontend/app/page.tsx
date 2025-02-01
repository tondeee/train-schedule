import { SearchTrainForm } from "@/components/forms/SearchTrainForm";
import { getAllStations } from "@/actions/stationAction";

export default async function Home() {
  const stationsResponse = await getAllStations();
  const stations = stationsResponse?.data || [];

  console.log(stations);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <SearchTrainForm stations={stations} />
      </main>
    </div>
  );
}
