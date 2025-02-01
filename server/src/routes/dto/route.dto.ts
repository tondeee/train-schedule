import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RouteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: number;
}
