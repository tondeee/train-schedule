import { Module } from '@nestjs/common';
import { StationRepository } from '../station.repository';
import { StationRelationalRepository } from './repositories/station.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationEntity } from './entities/station.entity';
import { StopEntity } from 'src/stops/infrastructure/persistence/relational/entities/stop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StationEntity, StopEntity])],
  providers: [
    {
      provide: StationRepository,
      useClass: StationRelationalRepository,
    },
  ],
  exports: [StationRepository],
})
export class RelationalStationPersistenceModule {}
