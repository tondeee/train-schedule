import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StopEntity } from './entities/stop.entity';
import { StopRepository } from '../stop.repository';
import { StopRelationalRepository } from './repositories/stop.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StopEntity])],
  providers: [
    {
      provide: StopRepository,
      useClass: StopRelationalRepository,
    },
  ],
  exports: [StopRepository, TypeOrmModule],
})
export class RelationalStopPersistenceModule {}
