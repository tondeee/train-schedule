import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Station } from "@/packages/types/api"

interface StationSelectProps {
  stations: Station[]
  value: string
  onChange: (value: string) => void
}

export function StationSelect({ stations, value, onChange }: StationSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select station" />
      </SelectTrigger>
      <SelectContent>
        {stations.map((station) => (
          <SelectItem key={station.id} value={station.id.toString()}>
            {station.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
