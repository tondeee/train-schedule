import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
import { TrainRepository } from './infrastructure/persistence/train.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Train } from './domain/train';
import { SortTrainDto } from './dto/find-all-trains.dto';
import { NullableType } from '../utils/types/nullable.type';
import { RoutesService } from '../routes/routes.service';
import { Route } from 'src/routes/domain/route';
import { RouteReference } from 'src/stops/domain/stop';

@Injectable()
export class TrainsService {
  constructor(
    @Inject('TrainRepository')
    private readonly trainRepository: TrainRepository,
    private readonly routesService: RoutesService,
  ) {}

  async create(createTrainDto: CreateTrainDto): Promise<Train> {
    if (!createTrainDto.route?.id) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          route: 'routeRequired',
        },
      });
    }
    if (!createTrainDto.name) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          name: 'nameRequired',
        },
      });
    }

    let route: Route;
    if (createTrainDto.route?.id) {
      const routeObject = await this.routesService.findById(
        createTrainDto.route.id,
      );
      if (!routeObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            route: 'routeNotExists',
          },
        });
      }
      route = routeObject;
    } else {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          route: 'routeRequired',
        },
      });
    }
    if (!createTrainDto.scheduleDays) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          scheduleDays: 'scheduleDaysRequired',
        },
      });
    }

    return this.trainRepository.create({
      name: createTrainDto.name,
      route: route,
      scheduleDays: createTrainDto.scheduleDays,
    });
  }

  findManyWithPagination(params: {
    startStation?: number;
    endStation?: number;
    date?: Date;
    sortOptions?: SortTrainDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Train[]> {
    return this.trainRepository.findManyWithPagination(params);
  }

  findById(id: Train['id']): Promise<NullableType<Train>> {
    return this.trainRepository.findById(id);
  }

  findByIds(ids: Train['id'][]): Promise<Train[]> {
    return this.trainRepository.findByIds(ids);
  }

  async update(
    id: Train['id'],
    updateTrainDto: UpdateTrainDto,
  ): Promise<Train | null> {
    const train = await this.trainRepository.findById(id);
    if (!train) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          train: 'trainNotFound',
        },
      });
    }

    if (!updateTrainDto.name) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          name: 'nameRequired',
        },
      });
    }

    let route: RouteReference | undefined = undefined;

    if (updateTrainDto.route?.id) {
      const routeObject = await this.routesService.findById(
        updateTrainDto.route.id,
      );
      if (!routeObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            route: 'routeNotExists',
          },
        });
      }
      route = { id: updateTrainDto.route.id };
    }

    if (!updateTrainDto.scheduleDays) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          scheduleDays: 'scheduleDaysRequired',
        },
      });
    }
    return this.trainRepository.update(id, {
      // Do not remove comment below.
      // <updating-property />
      name: updateTrainDto.name,
      route: route,
      scheduleDays: updateTrainDto.scheduleDays,
    });
  }

  async remove(id: Train['id']): Promise<void> {
    const train = await this.trainRepository.findById(id);
    if (!train) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          train: 'trainNotFound',
        },
      });
    }

    await this.trainRepository.remove(id);
  }

  async findTrainsByStationsAndDate(
    data: {
      startStationId: number;
      endStationId: number;
      date: Date;
    },
    paginationOptions: IPaginationOptions,
  ) {
    const searchDate = new Date(data.date);
    if (isNaN(searchDate.getTime())) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          date: 'invalidDateFormat',
        },
      });
    }

    return this.trainRepository.findTrainsByStationsAndDate(
      {
        ...data,
        date: searchDate,
      },
      paginationOptions,
    );
  }
}
