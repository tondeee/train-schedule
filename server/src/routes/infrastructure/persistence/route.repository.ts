import { CreateStopDto } from 'src/stops/dto/create-stop.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Route } from '../../domain/route';
import { Train } from 'src/trains/domain/train';
import { Stop } from 'src/stops/domain/stop';

export interface RouteRepository {
  create(data: { name: string; description: string | null }): Promise<Route>;

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Route[]>;

  findById(id: Route['id']): Promise<NullableType<Route>>;

  findByIds(ids: Route['id'][]): Promise<Route[]>;
  findByName(name: string): Promise<Route | null>;

  update(
    id: Route['id'],
    payload: {
      name?: string;
      description?: string | null;
    },
  ): Promise<Route | null>;

  remove(id: Route['id']): Promise<void>;
}
