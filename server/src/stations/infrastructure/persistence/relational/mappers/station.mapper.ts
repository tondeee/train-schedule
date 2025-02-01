import { StopEntity } from 'src/stops/infrastructure/persistence/relational/entities/stop.entity';
import { Station } from '../../../../domain/station';
import { StationEntity } from '../entities/station.entity';

export class StationMapper {
  static toDomain(raw: StationEntity): Station {
    const domainEntity = new Station();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.location = raw.location;

    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Station): StationEntity {
    if (!domainEntity.name || !domainEntity.location) {
      throw new Error('Name and location are required for Station');
    }

    const stops: StopEntity[] = [];

    const persistenceEntity = new StationEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.stops = stops;
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.location = domainEntity.location;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
