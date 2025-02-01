import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { StationRepository } from './infrastructure/persistence/station.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Station } from './domain/station';

@Injectable()
export class StationsService {
  constructor(private readonly stationRepository: StationRepository) {}

  async create(createStationDto: CreateStationDto) {
    if (!createStationDto.name || !createStationDto.location) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          station: 'nameAndLocationRequired',
        },
      });
    }

    return this.stationRepository.create({
      name: createStationDto.name,
      location: createStationDto.location,
      stops: [],
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Station[]> {
    return this.stationRepository.findAllWithPagination({
      paginationOptions,
    });
  }

  findById(id: Station['id']): Promise<Station | null> {
    return this.stationRepository.findById(id);
  }

  findByIds(ids: Station['id'][]): Promise<Station[]> {
    return this.stationRepository.findByIds(ids);
  }

  async update(
    id: Station['id'],
    updateStationDto: UpdateStationDto,
  ): Promise<Station | null> {
    const existingStation = await this.stationRepository.findById(id);
    if (!existingStation) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          station: 'stationNotFound',
        },
      });
    }

    return this.stationRepository.update(id, {
      name: updateStationDto.name,
      location: updateStationDto.location,
    });
  }

  async remove(id: Station['id']): Promise<void> {
    await this.stationRepository.remove(id);
  }
}
