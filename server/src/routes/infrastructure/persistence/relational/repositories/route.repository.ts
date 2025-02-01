import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { RouteEntity } from '../entities/route.entity';
import { Route } from '../../../../domain/route';
import { RouteRepository } from '../../route.repository';
import { RouteMapper } from '../mappers/route.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { NullableType } from 'src/utils/types/nullable.type';
import { Train } from 'src/trains/domain/train';
import { TrainEntity } from 'src/trains/infrastructure/persistence/relational/entities/train.entity';
import { TrainMapper } from 'src/trains/infrastructure/persistence/relational/mappers/train.mapper';

@Injectable()
export class RouteRelationalRepository implements RouteRepository {
  constructor(
    @InjectRepository(RouteEntity)
    private readonly routeRepository: Repository<RouteEntity>,
  ) {}

  async create(data: {
    name: string;
    description: string | null;
  }): Promise<Route> {
    const routeEntity = this.routeRepository.create({
      name: data.name,
      description: data.description ?? undefined,
    });
    const savedRoute = await this.routeRepository.save(routeEntity);
    return RouteMapper.toDomain(savedRoute);
  }

  async update(
    id: Route['id'],
    payload: {
      name?: string;
      description?: string | null;
    },
  ): Promise<Route> {
    const entity = await this.routeRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Route not found');
    }

    if (payload.name) entity.name = payload.name;
    if (payload.description !== undefined)
      entity.description = payload.description ?? undefined;

    const updatedEntity = await this.routeRepository.save(entity);
    return RouteMapper.toDomain(updatedEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Route[]> {
    const entities = await this.routeRepository.find({
      relations: ['stops', 'stops.station'],
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      order: {
        stops: {
          arrivalTime: 'ASC',
        },
      },
    });

    return entities.map((entity) => RouteMapper.toDomain(entity));
  }

  async findById(id: Route['id']): Promise<Route> {
    const entity = await this.routeRepository.findOne({
      where: { id },
      relations: ['stops', 'stops.station'],
      order: {
        stops: {
          arrivalTime: 'ASC',
        },
      },
    });

    if (!entity) {
      throw new Error('Route not found');
    }

    return RouteMapper.toDomain(entity);
  }

  async findByIds(ids: Route['id'][]): Promise<Route[]> {
    const entities = await this.routeRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => RouteMapper.toDomain(entity));
  }

  async findByName(name: string): Promise<Route | null> {
    const entity = await this.routeRepository.findOne({
      where: { name },
      relations: ['stops', 'stops.station'],
    });

    if (!entity) {
      return null;
    }

    return RouteMapper.toDomain(entity);
  }

  async remove(id: Route['id']): Promise<void> {
    await this.routeRepository.delete(id);
  }
}
