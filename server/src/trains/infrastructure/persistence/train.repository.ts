import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { Train } from '../../domain/train';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { SortTrainDto } from '../../dto/find-all-trains.dto';

export abstract class TrainRepository {
  abstract create(
    data: Omit<Train, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Train>;

  abstract findManyWithPagination(params: {
    startStation?: number;
    endStation?: number;
    date?: Date;
    sortOptions?: SortTrainDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Train[]>;

  abstract findById(id: Train['id']): Promise<NullableType<Train>>;
  abstract findByIds(ids: Train['id'][]): Promise<Train[]>;

  abstract update(
    id: Train['id'],
    payload: DeepPartial<Train>,
  ): Promise<Train | null>;

  abstract remove(id: Train['id']): Promise<void>;

  abstract findTrainsByStationsAndDate(
    data: {
      startStationId: number;
      endStationId: number;
      date: Date;
    },
    paginationOptions: IPaginationOptions,
  ): Promise<Train[]>;
}

// Implementation suggestion for TypeORM:
/*
  Sample query structure:
  SELECT DISTINCT t.*
  FROM trains t
  INNER JOIN train_stops origin_stop 
    ON t.id = origin_stop.train_id 
    AND origin_stop.station_id = :startStationId
  INNER JOIN train_stops destination_stop 
    ON t.id = destination_stop.train_id 
    AND destination_stop.station_id = :endStationId
  WHERE DATE(t.departure_date) = DATE(:date)
    AND origin_stop.stop_order < destination_stop.stop_order
*/
