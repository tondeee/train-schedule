import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Route } from '../../routes/domain/route';

@Entity()
export class Train {
  @ApiProperty({
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column()
  name: string;
  @ApiProperty({ type: () => Route })
  @ManyToOne(() => Route)
  @JoinColumn()
  route: Route;

  @ApiProperty()
  @Column({ default: 127 })
  scheduleDays: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
