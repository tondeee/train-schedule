import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { StationEntity } from '../entities/station.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Station } from '../../../../domain/station';
import { StationRepository } from '../../station.repository';
import { StationMapper } from '../mappers/station.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class StationRelationalRepository implements StationRepository {
  private readonly logger = new Logger(StationRelationalRepository.name);

  constructor(
    @InjectRepository(StationEntity)
    private readonly stationRepository: Repository<StationEntity>,
  ) {}

  async create(data: Station): Promise<Station> {
    if (!data.name || !data.location) {
      throw new Error('Station name and location are required');
    }

    const persistenceModel = StationMapper.toPersistence(data);

    this.logger.debug(
      `Creating station with data: ${JSON.stringify(persistenceModel)}`,
    );

    const newEntity = await this.stationRepository.save(persistenceModel);
    return StationMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Station[]> {
    const entities = await this.stationRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => StationMapper.toDomain(entity));
  }

  async findById(id: Station['id']): Promise<NullableType<Station>> {
    const entity = await this.stationRepository.findOne({
      where: { id },
    });

    return entity ? StationMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Station['id'][]): Promise<Station[]> {
    const entities = await this.stationRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => StationMapper.toDomain(entity));
  }

  async update(id: Station['id'], payload: Partial<Station>): Promise<Station> {
    const entity = await this.stationRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updateData = StationMapper.toPersistence({
      ...StationMapper.toDomain(entity),
      ...payload,
    });

    const updatedEntity = await this.stationRepository.save(updateData);
    return StationMapper.toDomain(updatedEntity);
  }

  async remove(id: Station['id']): Promise<void> {
    await this.stationRepository.delete(id);
  }
}
