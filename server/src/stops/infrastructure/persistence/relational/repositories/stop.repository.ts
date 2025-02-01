import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, MoreThan } from 'typeorm';
import { StopEntity } from '../entities/stop.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Stop } from '../../../../domain/stop';
import { StopRepository } from '../../stop.repository';
import { StopMapper } from '../mappers/stop.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { CreateStopDto } from 'src/stops/dto/create-stop.dto';

@Injectable()
export class StopRelationalRepository implements StopRepository {
  constructor(
    @InjectRepository(StopEntity)
    private readonly stopRepository: Repository<StopEntity>,
  ) {}

  async create(data: Stop): Promise<Stop> {
    const persistenceModel = StopMapper.toPersistence(data);
    const newEntity = await this.stopRepository.save(
      this.stopRepository.create(persistenceModel),
    );

    const entityWithRelations = await this.stopRepository.findOne({
      where: { id: newEntity.id },
      relations: ['route', 'station'],
    });

    return StopMapper.toDomain(entityWithRelations!);
  }

  async findManyWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Stop[]> {
    const entities = await this.stopRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => StopMapper.toDomain(entity));
  }

  async findById(id: Stop['id']): Promise<NullableType<Stop>> {
    const entity = await this.stopRepository.findOne({
      where: { id },
    });

    return entity ? StopMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Stop['id'][]): Promise<Stop[]> {
    const entities = await this.stopRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => StopMapper.toDomain(entity));
  }

  async update(id: Stop['id'], payload: Partial<Stop>): Promise<Stop> {
    const entity = await this.stopRepository.findOne({
      where: { id },
      relations: ['train', 'station'],
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.stopRepository.save(
      this.stopRepository.create({
        ...entity,
        ...StopMapper.toPersistence({
          ...StopMapper.toDomain(entity),
          ...payload,
        }),
      }),
    );

    const entityWithRelations = await this.stopRepository.findOne({
      where: { id: updatedEntity.id },
      relations: ['train', 'station'],
    });

    return StopMapper.toDomain(entityWithRelations!);
  }

  async remove(id: Stop['id']): Promise<void> {
    await this.stopRepository.delete(id);
  }

  async findByTrainId(trainId: number): Promise<Stop[]> {
    const entities = await this.stopRepository
      .createQueryBuilder('stop')
      .innerJoinAndSelect('stop.route', 'route')
      .innerJoinAndSelect('route.trains', 'train')
      .innerJoinAndSelect('stop.station', 'station')
      .where('train.id = :trainId', { trainId })
      .orderBy('stop.arrivalTime', 'ASC')
      .getMany();

    return entities.map((entity) => StopMapper.toDomain(entity));
  }

  async findByTrainIdAndSequence(
    trainId: number,
    sequence: number,
    excludeStopId?: number,
  ): Promise<Stop | null> {
    const query = this.stopRepository
      .createQueryBuilder('stop')
      .innerJoinAndSelect('stop.route', 'route')
      .innerJoinAndSelect('route.trains', 'train')
      .innerJoinAndSelect('stop.station', 'station')
      .where('train.id = :trainId', { trainId })
      .andWhere('stop.sequence = :sequence', { sequence });

    if (excludeStopId) {
      query.andWhere('stop.id != :excludeStopId', { excludeStopId });
    }

    const entity = await query.getOne();
    return entity ? StopMapper.toDomain(entity) : null;
  }

  async findByStationId(stationId: number): Promise<Stop[]> {
    const entities = await this.stopRepository.find({
      where: { station: { id: stationId } },
      order: { arrivalTime: 'ASC' },
      relations: ['train', 'station'],
    });

    return entities.map((entity) => StopMapper.toDomain(entity));
  }

  async findByTimeRange(fromTime: Date, toTime: Date): Promise<Stop[]> {
    const entities = await this.stopRepository.find({
      where: {
        arrivalTime: MoreThan(fromTime),
        departureTime: MoreThan(fromTime),
      },
      order: { arrivalTime: 'ASC' },
      relations: ['train', 'station'],
    });

    return entities.map((entity) => StopMapper.toDomain(entity));
  }

  async findByRouteId(routeId: number): Promise<Stop[]> {
    const entities = await this.stopRepository.find({
      where: { route: { id: routeId } },
      relations: ['route', 'station'],
      order: { arrivalTime: 'ASC' },
    });

    return entities.map((entity) => StopMapper.toDomain(entity));
  }

  async findByTimeRangeAndStations(
    fromTime: Date,
    toTime: Date,
    departureStationId: number,
    arrivalStationId: number,
  ): Promise<Stop[]> {
    const entities = await this.stopRepository.find({
      where: {
        arrivalTime: MoreThan(fromTime),
        departureTime: MoreThan(fromTime),
        station: In([departureStationId, arrivalStationId]),
      },
      order: { arrivalTime: 'ASC' },
      relations: ['train', 'station'],
    });

    return entities.map((entity) => StopMapper.toDomain(entity));
  }
}
