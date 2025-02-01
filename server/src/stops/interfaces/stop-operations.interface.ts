import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Stop } from '../domain/stop';
import { CreateStopDto } from '../dto/create-stop.dto';
import { NullableType } from 'src/utils/types/nullable.type';
import { UpdateStopDto } from '../dto/update-stop.dto';

export interface IStopOperations {
  create(createStopDto: CreateStopDto): Promise<Stop>;
  findManyWithPagination(options: {
    paginationOptions: IPaginationOptions;
  }): Promise<Stop[]>;
  findById(id: Stop['id']): Promise<NullableType<Stop>>;
  findByIds(ids: Stop['id'][]): Promise<Stop[]>;
  update(id: Stop['id'], updateStopDto: UpdateStopDto): Promise<Stop>;
  delete(id: Stop['id']): Promise<Stop>;
}
