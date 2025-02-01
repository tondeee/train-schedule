import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { RouteRepository } from './infrastructure/persistence/route.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Route } from './domain/route';
import { Stop } from 'src/stops/domain/stop';
import { StopsService } from 'src/stops/stops.service';
import { CreateStopDto } from 'src/stops/dto/create-stop.dto';
import { Train } from 'src/trains/domain/train';
import { UpdateStopDto } from 'src/stops/dto/update-stop.dto';

@Injectable()
export class RoutesService {
  constructor(
    @Inject('RouteRepository')
    private readonly routeRepository: RouteRepository,
    @Inject(forwardRef(() => StopsService))
    private readonly stopsService: StopsService,
  ) {}

  async create(createRouteDto: CreateRouteDto): Promise<Route> {
    // Do not remove comment below.
    // <creating-property />
    const name: string | undefined = undefined;

    if (createRouteDto.name) {
      const RouteObject = await this.routeRepository.findByName(
        createRouteDto.name,
      );
      if (RouteObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            name: 'nameAlreadyExists',
          },
        });
      }
    }

    if (createRouteDto.stops.length < 2) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          stops: 'stopsRequired',
        },
      });
    }

    if (!createRouteDto.name) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          name: 'nameRequired',
        },
      });
    }

    // Create route
    const route = await this.routeRepository.create({
      name: createRouteDto.name,
      description: createRouteDto.description || null,
    });

    // Create stops using StopsService
    for (const stopDto of createRouteDto.stops) {
      await this.stopsService.create({
        ...stopDto,
        route: { id: route.id },
      });
    }

    return route;
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.routeRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Route['id']) {
    return this.routeRepository.findById(id);
  }

  findByIds(ids: Route['id'][]) {
    return this.routeRepository.findByIds(ids);
  }

  async update(id: Route['id'], updateRouteDto: UpdateRouteDto) {
    // Do not remove comment below.
    // <updating-property />

    const existingRoute = await this.findById(id);
    if (!existingRoute) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          route: 'routeNotFound',
        },
      });
    }

    if (updateRouteDto.name && updateRouteDto.name !== existingRoute.name) {
      const routeWithSameName = await this.routeRepository.findByName(
        updateRouteDto.name,
      );
      if (routeWithSameName) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            name: 'nameAlreadyExists',
          },
        });
      }
    }

    if (updateRouteDto.stops?.length !== undefined) {
      if (updateRouteDto.stops.length < 2) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            stops: 'stopsRequired',
          },
        });
      }

      // Remove all existing stops
      const existingStops = await this.stopsService.findByRouteId(id);
      await Promise.all(
        existingStops.map((stop) => this.stopsService.remove(stop.id)),
      );

      // Create all new stops from the request using map
      await Promise.all(
        updateRouteDto.stops.map((stop) =>
          this.stopsService.create({
            route: { id },
            station: { id: stop.station!.id },
            arrivalTime: stop.arrivalTime!,
            departureTime: stop.departureTime!,
          }),
        ),
      );
    }

    return this.routeRepository.update(id, {
      name: updateRouteDto.name,
      description: updateRouteDto.description,
    });
  }

  remove(id: Route['id']) {
    return this.routeRepository.remove(id);
  }
}
