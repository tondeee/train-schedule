import { Module, forwardRef } from '@nestjs/common';
import { StopsService } from './stops.service';
import { StopsController } from './stops.controller';
import { RoutesModule } from '../routes/routes.module';
import { StationsModule } from '../stations/stations.module';
import { RelationalStopPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = RelationalStopPersistenceModule;

@Module({
  imports: [
    infrastructurePersistenceModule,
    forwardRef(() => RoutesModule),
    StationsModule,
  ],
  controllers: [StopsController],
  providers: [StopsService],
  exports: [StopsService, infrastructurePersistenceModule],
})
export class StopsModule {}
