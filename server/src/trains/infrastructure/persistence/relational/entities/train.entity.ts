import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

import { RouteEntity } from '../../../../../routes/infrastructure/persistence/relational/entities/route.entity';

@Entity({
  name: 'train',
})
export class TrainEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => RouteEntity, (route) => route.trains)
  route: RouteEntity;

  @Column({ default: 127 })
  scheduleDays: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
