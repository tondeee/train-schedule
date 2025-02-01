import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository, In, DeepPartial } from 'typeorm';
import { TrainEntity } from '../entities/train.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Train } from '../../../../domain/train';
import { TrainRepository } from '../../train.repository';
import { TrainMapper } from '../mappers/train.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { SortTrainDto } from '../../../../dto/find-all-trains.dto';
import { RouteEntity } from 'src/routes/infrastructure/persistence/relational/entities/route.entity';

@Injectable()
export class TrainRelationalRepository implements TrainRepository {
  constructor(
    @InjectRepository(TrainEntity)
    private readonly trainRepository: Repository<TrainEntity>,
  ) {}

  async create(
    data: Omit<Train, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Train> {
    const persistenceModel = TrainMapper.toPersistence(data as Train);
    const newEntity = await this.trainRepository.save(
      this.trainRepository.create(persistenceModel),
    );
    return TrainMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    startStation,
    endStation,
    date,
    sortOptions,
    paginationOptions,
  }: {
    startStation?: number;
    endStation?: number;
    date?: Date;
    sortOptions?: SortTrainDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Train[]> {
    const query = this.trainRepository
      .createQueryBuilder('train')
      .leftJoinAndSelect('train.route', 'route')
      .leftJoinAndSelect('route.stops', 'stops')
      .leftJoinAndSelect('stops.station', 'station');

    if (startStation) {
      query.andWhere('train.startStationId = :startStation', { startStation });
    }

    if (endStation) {
      query.andWhere('train.endStationId = :endStation', { endStation });
    }

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      query.andWhere('stops.departureTime BETWEEN :startOfDay AND :endOfDay', {
        startOfDay,
        endOfDay,
      });
    }

    if (sortOptions?.length) {
      sortOptions.forEach((sort) => {
        query.addOrderBy(
          `train.${sort.orderBy}`,
          sort.order.toUpperCase() as 'ASC' | 'DESC',
        );
      });
    }

    query
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit);

    const entities = await query.getMany();
    return entities.map((train) => TrainMapper.toDomain(train));
  }

  async findById(id: Train['id']): Promise<NullableType<Train>> {
    const entity = await this.trainRepository.findOne({
      where: { id: Number(id) },
      relations: ['route'],
    });

    return entity ? TrainMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Train['id'][]): Promise<Train[]> {
    const entities = await this.trainRepository.find({
      where: { id: In(ids) },
      relations: ['route'],
    });

    return entities.map((train) => TrainMapper.toDomain(train));
  }

  async update(
    id: Train['id'],
    payload: {
      name?: string;
      routeId?: number;
      scheduleDays?: number;
    },
  ): Promise<Train> {
    const entity = await this.trainRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Train not found');
    }

    const updatedEntity = await this.trainRepository.save(entity);
    return TrainMapper.toDomain(updatedEntity);
  }

  async remove(id: Train['id']): Promise<void> {
    await this.trainRepository.delete(id);
  }

  async findTrainsByStationsAndDate(
    data: {
      startStationId: number;
      endStationId: number;
      date: Date;
    },
    paginationOptions: IPaginationOptions,
  ): Promise<Train[]> {
    const dayOfWeek = data.date.getDay();
    const bitmask = 1 << dayOfWeek;

    const query = this.trainRepository
      .createQueryBuilder('train')
      .innerJoinAndSelect('train.route', 'route')
      .innerJoinAndSelect('route.stops', 'stops')
      .innerJoinAndSelect('stops.station', 'station')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('1')
          .from('route_stop', 'origin')
          .where('origin.route_id = route.id')
          .andWhere('origin.station_id = :startStationId')
          .andWhere(
            'EXISTS (' +
              'SELECT 1 FROM route_stop destination ' +
              'WHERE destination.route_id = route.id ' +
              'AND destination.station_id = :endStationId ' +
              'AND destination.order > origin.order' +
              ')',
          )
          .getQuery();
        return 'EXISTS (' + subQuery + ')';
      })
      .where('train.scheduleDays & :bitmask = :bitmask', { bitmask })
      .setParameters({
        startStationId: data.startStationId,
        endStationId: data.endStationId,
      })
      .orderBy('train.id', 'ASC')
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit);

    const entities = await query.getMany();
    return entities.map((train) => TrainMapper.toDomain(train));
  }
}
