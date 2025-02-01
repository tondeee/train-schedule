import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Stop } from 'src/stops/domain/stop';

import { Train } from 'src/trains/domain/train';

export class Route {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty({
    type: [Stop],
  })
  stops: Stop[];
  @Exclude()
  trains: Train[] | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
