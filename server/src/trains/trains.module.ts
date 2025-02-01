import { Module } from '@nestjs/common';
import { TrainsService } from './trains.service';
import { TrainsController } from './trains.controller';
import { RoutesModule } from '../routes/routes.module';
import { RelationalTrainPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = RelationalTrainPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, RoutesModule],
  controllers: [TrainsController],
  providers: [TrainsService],
  exports: [TrainsService, infrastructurePersistenceModule],
})
export class TrainsModule {}
