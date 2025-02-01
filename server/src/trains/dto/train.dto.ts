import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TrainDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
