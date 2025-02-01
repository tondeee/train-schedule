import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteEntity } from './entities/route.entity';
import { StopEntity } from '../../../../stops/infrastructure/persistence/relational/entities/stop.entity';
import { RouteRelationalRepository } from './repositories/route.repository';
import { StopsModule } from '../../../../stops/stops.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RouteEntity, StopEntity]),
    forwardRef(() => StopsModule), // Handle circular dependency
  ],
  providers: [
    {
      provide: 'RouteRepository',
      useClass: RouteRelationalRepository,
    },
  ],
  exports: ['RouteRepository'],
})
export class RelationalRoutePersistenceModule {}
