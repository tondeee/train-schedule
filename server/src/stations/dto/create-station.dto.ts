import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStationDto {
  @ApiProperty({
    type: String,
    example: 'Central Station',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: 'City Center',
  })
  @IsString()
  @IsNotEmpty()
  location: string;
}
