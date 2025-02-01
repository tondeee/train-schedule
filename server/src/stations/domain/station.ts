import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Stop } from 'src/stops/domain/stop';

export class Station {
  @ApiProperty({
    type: Number,
  })
  id: number;
  @ApiProperty({
    type: String,
  })
  name: string;
  @ApiProperty({
    type: String,
  })
  location: string;
  @Exclude()
  stops: Stop[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
