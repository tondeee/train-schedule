import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StopEntity } from '../../../../../stops/infrastructure/persistence/relational/entities/stop.entity';
import { TrainEntity } from '../../../../../trains/infrastructure/persistence/relational/entities/train.entity';

@Entity('route')
export class RouteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => StopEntity, (stop) => stop.route)
  stops: StopEntity[];

  @OneToMany(() => TrainEntity, (train) => train.route)
  trains: TrainEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
