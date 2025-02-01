import { Train } from 'src/trains/domain/train';
import { Route } from '../../../../domain/route';

import { RouteEntity } from '../entities/route.entity';
import { TrainEntity } from 'src/trains/infrastructure/persistence/relational/entities/train.entity';
import { StopEntity } from 'src/stops/infrastructure/persistence/relational/entities/stop.entity';
import { StopMapper } from 'src/stops/infrastructure/persistence/relational/mappers/stop.mapper';
import { Stop } from 'src/stops/domain/stop';

export class RouteMapper {
  static toDomain(raw: RouteEntity): Route {
    const domainEntity = new Route();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;

    if (raw.stops) {
      domainEntity.stops = raw.stops.map((stop) => StopMapper.toDomain(stop));
    }

    if (raw.trains) {
      domainEntity.trains = raw.trains.map((train) => {
        const trainDomain = new Train();
        trainDomain.id = train.id;
        trainDomain.name = train.name;
        return trainDomain;
      });
    }

    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Route): RouteEntity {
    const persistenceEntity = new RouteEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.stops) {
      persistenceEntity.stops = domainEntity.stops.map((stop) =>
        StopMapper.toPersistence(stop),
      );
    }

    if (domainEntity.trains) {
      persistenceEntity.trains = domainEntity.trains.map((train) => {
        const trainEntity = new TrainEntity();
        trainEntity.id = Number(train.id);
        trainEntity.name = train.name;
        return trainEntity;
      });
    }

    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
