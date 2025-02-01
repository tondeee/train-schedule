import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Route } from 'src/routes/domain/route';
import { RouteDto } from 'src/routes/dto/route.dto';

export class CreateTrainDto {
  @ApiProperty({
    example: 'Express Train 123',
    description: 'Name of the train',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string | null;

  @ApiPropertyOptional({ type: () => RouteDto })
  @IsOptional()
  @Type(() => RouteDto)
  route?: RouteDto;

  @ApiProperty({
    example: 127,
    description: 'Days of the week the train runs',
    type: Number,
  })
  @IsNotEmpty()
  scheduleDays: number | null;
}
