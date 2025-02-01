import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Station } from '../../domain/station';

export abstract class StationRepository {
  abstract create(
    data: Omit<Station, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Station>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Station[]>;

  abstract findById(id: Station['id']): Promise<NullableType<Station>>;

  abstract findByIds(ids: Station['id'][]): Promise<Station[]>;

  abstract update(
    id: Station['id'],
    payload: DeepPartial<Station>,
  ): Promise<Station | null>;

  abstract remove(id: Station['id']): Promise<void>;
}
