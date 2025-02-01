import { CreateStopDto } from 'src/stops/dto/create-stop.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';

import { Stop } from '../../domain/stop';

export abstract class StopRepository {
  abstract create(
    data: Omit<Stop, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Stop>;

  abstract findManyWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Stop[]>;

  abstract findById(id: Stop['id']): Promise<NullableType<Stop>>;

  abstract findByIds(ids: Stop['id'][]): Promise<Stop[]>;

  abstract update(
    id: Stop['id'],
    payload: DeepPartial<Stop>,
  ): Promise<Stop | null>;

  abstract remove(id: Stop['id']): Promise<void>;

  abstract findByRouteId(routeId: number): Promise<Stop[]>;

  abstract findByStationId(stationId: number): Promise<Stop[]>;

  
}
