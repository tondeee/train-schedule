import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RouteEntity } from '../../../../../routes/infrastructure/persistence/relational/entities/route.entity';
import { StationEntity } from '../../../../../stations/infrastructure/persistence/relational/entities/station.entity';

@Entity('stops')
export class StopEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RouteEntity, {
    lazy: true,
  })
  @JoinColumn({ name: 'route_id' })
  route: RouteEntity;

  @ManyToOne(() => StationEntity)
  @JoinColumn({ name: 'station_id' })
  station: StationEntity;

  @Column({ type: 'time' })
  arrivalTime: Date;

  @Column({ type: 'time' })
  departureTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
