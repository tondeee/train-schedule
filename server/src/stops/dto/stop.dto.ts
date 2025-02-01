import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RouteDto } from 'src/routes/dto/route.dto';
import { StationDto } from 'src/stations/dto/station.dto';

export class StopDto {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional({ type: StationDto })
  @IsOptional()
  @Type(() => StationDto)
  station?: StationDto | null;

  @ApiPropertyOptional({ type: RouteDto })
  @IsOptional()
  @Type(() => RouteDto)
  route?: RouteDto;

  @ApiProperty()
  arrivalTime: Date;

  @ApiProperty()
  departureTime: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
