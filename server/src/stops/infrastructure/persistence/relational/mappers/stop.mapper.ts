import { RouteEntity } from 'src/routes/infrastructure/persistence/relational/entities/route.entity';
import { Stop } from '../../../../domain/stop';
import { StopEntity } from '../entities/stop.entity';
import { StationEntity } from 'src/stations/infrastructure/persistence/relational/entities/station.entity';
import { Station } from 'src/stations/domain/station';
import { Route } from 'src/routes/domain/route';

export class StopMapper {
  static toDomain(raw: StopEntity): Stop {
    const domainEntity = new Stop();
    domainEntity.id = raw.id;

    if (raw.station) {
      const station = new Station();
      station.id = raw.station.id;
      station.name = raw.station.name;
      domainEntity.station = station;
    }

    if (raw.route) {
      const route = new Route();
      route.id = raw.route.id;
      route.name = raw.route.name;
      domainEntity.route = route;
    }

    domainEntity.arrivalTime = raw.arrivalTime;
    domainEntity.departureTime = raw.departureTime;

    return domainEntity;
  }

  static toPersistence(domainEntity: Stop): StopEntity {
    const persistenceEntity = new StopEntity();
    if (domainEntity.id) {
      persistenceEntity.id = Number(domainEntity.id);
    }

    if (domainEntity.station) {
      const station = new StationEntity();
      station.id = Number(domainEntity.station.id);
      station.name = domainEntity.station.name;
      persistenceEntity.station = station;
    }

    if (domainEntity.route) {
      const route = new RouteEntity();
      route.id = Number(domainEntity.route.id);
      route.name = domainEntity.route.name;
      persistenceEntity.route = route;
    }

    persistenceEntity.arrivalTime = domainEntity.arrivalTime;
    persistenceEntity.departureTime = domainEntity.departureTime;

    return persistenceEntity;
  }
}
