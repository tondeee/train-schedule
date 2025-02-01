import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainEntity } from './entities/train.entity';
import { TrainRelationalRepository } from './repositories/train.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TrainEntity])],
  providers: [
    {
      provide: 'TrainRepository',
      useClass: TrainRelationalRepository,
    },
  ],
  exports: ['TrainRepository'],
})
export class RelationalTrainPersistenceModule {}
