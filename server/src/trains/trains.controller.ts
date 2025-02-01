import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
  SerializeOptions,
} from '@nestjs/common';
import { TrainsService } from './trains.service';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Train } from './domain/train';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { StationDateFilterDto } from './dto/find-all-trains.dto';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import { NullableType } from '../utils/types/nullable.type';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@ApiTags('Trains')
@Controller({
  path: 'trains',
  version: '1',
})
export class TrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @ApiCreatedResponse({
    type: Train,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrainDto: CreateTrainDto): Promise<Train> {
    return this.trainsService.create(createTrainDto);
  }

  @ApiOkResponse({
    type: InfinityPaginationResponse(Train),
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query() stationDateFilter: StationDateFilterDto,
  ): Promise<InfinityPaginationResponseDto<Train>> {
    if (
      stationDateFilter.startStationId &&
      stationDateFilter.endStationId &&
      stationDateFilter.date
    ) {
      const data = await this.trainsService.findTrainsByStationsAndDate(
        {
          startStationId: stationDateFilter.startStationId,
          endStationId: stationDateFilter.endStationId,
          date: stationDateFilter.date,
        },
        { page, limit },
      );

      return {
        data,
        hasNextPage: data.length === limit,
      };
    }

    const data = await this.trainsService.findManyWithPagination({
      startStation: stationDateFilter.startStationId,
      endStation: stationDateFilter.endStationId,
      date: stationDateFilter.date,
      paginationOptions: { page, limit },
    });

    return {
      data,
      hasNextPage: data.length === limit,
    };
  }

  @ApiOkResponse({
    type: Train,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: Train['id']): Promise<NullableType<Train>> {
    return this.trainsService.findById(id);
  }

  @ApiOkResponse({
    type: Train,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  update(
    @Param('id') id: Train['id'],
    @Body() updateTrainDto: UpdateTrainDto,
  ): Promise<Train | null> {
    return this.trainsService.update(id, updateTrainDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Train['id']): Promise<void> {
    return this.trainsService.remove(id);
  }
}
