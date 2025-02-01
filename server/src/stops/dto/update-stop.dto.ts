import { IsOptional, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StopReferenceDto } from './create-stop.dto';

export class UpdateStopDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  route?: StopReferenceDto;

  @ApiProperty({ required: false })
  @IsOptional()
  station?: StopReferenceDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  arrivalTime?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  departureTime?: string;
}
