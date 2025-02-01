import { IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StopReferenceDto {
  @IsNotEmpty()
  id: number;
}

export class CreateStopDto {
  @ApiProperty()
  @IsNotEmpty()
  route: StopReferenceDto;

  @ApiProperty()
  @IsNotEmpty()
  station: StopReferenceDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  arrivalTime: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  departureTime: string;
}
