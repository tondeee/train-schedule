import { Stop } from 'src/stops/domain/stop';
import { Train } from '../../../../domain/train';
import { TrainEntity } from '../entities/train.entity';
import { RouteEntity } from 'src/routes/infrastructure/persistence/relational/entities/route.entity';

export class TrainMapper {
  static toDomain(raw: TrainEntity): Train {
    const domainEntity = new Train();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;

    if (raw.route) {
      domainEntity.route = {
        id: raw.route.id,
        name: raw.route.name,
        stops:
          raw.route.stops?.map(
            (stop) =>
              ({
                id: stop.id,
                station: stop.station
                  ? {
                      id: stop.station.id,
                      name: stop.station.name,
                      location: stop.station.location,
                      // Add any other required station properties
                    }
                  : null,
                route: { id: raw.route.id },
                arrivalTime: stop.arrivalTime,
                departureTime: stop.departureTime,
                createdAt: stop.createdAt,
                updatedAt: stop.updatedAt,
              }) as Stop,
          ) || [],
        trains: raw.route.trains || [],
        createdAt: raw.route.createdAt,
        updatedAt: raw.route.updatedAt,
      };
    }

    domainEntity.scheduleDays = raw.scheduleDays;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Train): TrainEntity {
    const route = new RouteEntity();
    route.id = Number(domainEntity.route.id);

    const persistenceEntity = new TrainEntity();
    if (domainEntity.id && typeof domainEntity.id === 'number') {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.scheduleDays = domainEntity.scheduleDays;
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.route = route;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
