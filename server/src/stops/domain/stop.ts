import { ApiProperty } from '@nestjs/swagger';
import { Route } from '../../routes/domain/route';
import { Station } from '../../stations/domain/station';

export interface RouteReference {
  id: number;
}

export interface StationReference {
  id: number;
}

export class Stop {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: () => Route })
  route: Route;

  @ApiProperty({ type: () => Station })
  station: Station;

  @ApiProperty()
  arrivalTime: Date;

  @ApiProperty()
  departureTime: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
