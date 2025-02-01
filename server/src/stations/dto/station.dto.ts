import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: number;
}
