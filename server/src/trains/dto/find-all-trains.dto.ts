import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsDate,
  IsString,
  ValidateNested,
  IsIn,
  IsISO8601,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';

const ALLOWED_SORT_ORDERS = ['asc', 'desc'];
const ALLOWED_SORT_FIELDS = ['departureTime', 'arrivalTime', 'sequence']; // Add valid fields

export class SortTrainDto {
  @ApiProperty({
    example: 'departureTime',
    enum: ALLOWED_SORT_FIELDS,
  })
  @IsIn(ALLOWED_SORT_FIELDS)
  orderBy: string;

  @ApiProperty({
    example: 'asc',
    enum: ALLOWED_SORT_ORDERS,
  })
  @IsIn(ALLOWED_SORT_ORDERS)
  order: 'asc' | 'desc';
}

export class FilterTrainDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Filter trains by departure station ID',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  startStationId?: number;

  @ApiPropertyOptional({
    example: 2,
    description: 'Filter trains by destination station ID',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  endStationId?: number;

  @ApiPropertyOptional({
    example: '2023-10-01',
    description: 'Filter trains by date (YYYY-MM-DD)',
  })
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  date?: Date;
}

export class StationDateFilterDto extends FilterTrainDto {
  @ApiPropertyOptional({
    default: 1,
    description: 'Page number for pagination',
  })
  @Transform(({ value }) => Math.max(Number(value || 1), 1))
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    default: 10,
    description: 'Number of items per page (max 100)',
  })
  @Transform(({ value }) => Math.min(Math.max(Number(value || 10), 1), 100))
  @IsNumber()
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({
    type: String,
    description: 'Sort criteria array in JSON string format',
  })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(SortTrainDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested({ each: true })
  @Type(() => SortTrainDto)
  sort?: SortTrainDto[];
}
