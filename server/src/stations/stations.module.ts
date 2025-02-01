import { Module } from '@nestjs/common';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { RelationalStationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalStationPersistenceModule,
  ],
  controllers: [StationsController],
  providers: [StationsService],
  exports: [StationsService, RelationalStationPersistenceModule],
})
export class StationsModule {}
