import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateStopDto } from 'src/stops/dto/update-stop.dto';

export class UpdateRouteDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: [UpdateStopDto], required: false })
  @IsOptional()
  @IsArray()
  @Type(() => UpdateStopDto)
  stops?: UpdateStopDto[];
}
