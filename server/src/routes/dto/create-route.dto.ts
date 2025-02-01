import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, IsOptional, IsString } from 'class-validator';
import { CreateStopDto } from 'src/stops/dto/create-stop.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateStopWithoutRouteDto extends OmitType(CreateStopDto, [
  'route',
] as const) {}

export class CreateRouteDto {
  @ApiProperty({ example: 'Route 1', description: 'Name of the route' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'Main route through city center',
    description: 'Route description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: [CreateStopWithoutRouteDto],
    description: 'List of stops in the route',
  })
  @IsArray()
  @IsNotEmpty()
  stops: CreateStopWithoutRouteDto[];
}
