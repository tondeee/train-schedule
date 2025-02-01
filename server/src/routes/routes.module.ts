import { Module, forwardRef } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { StopsModule } from '../stops/stops.module';
import { RelationalRoutePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = RelationalRoutePersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, forwardRef(() => StopsModule)],
  controllers: [RoutesController],
  providers: [RoutesService],
  exports: [RoutesService, infrastructurePersistenceModule],
})
export class RoutesModule {}
