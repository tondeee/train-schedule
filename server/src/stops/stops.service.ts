import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateStopDto } from './dto/create-stop.dto';
import { UpdateStopDto } from './dto/update-stop.dto';
import { StopRepository } from './infrastructure/persistence/stop.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Stop, RouteReference, StationReference } from './domain/stop';
import { NullableType } from '../utils/types/nullable.type';
import { RoutesService } from '../routes/routes.service';
import { StationsService } from '../stations/stations.service';
import { Route } from 'src/routes/domain/route';
import { Station } from 'src/stations/domain/station';

@Injectable()
export class StopsService {
  constructor(
    @Inject(StopRepository)
    private readonly stopRepository: StopRepository,
    @Inject(forwardRef(() => RoutesService))
    private readonly routesService: RoutesService,
    private readonly stationsService: StationsService,
  ) {}

  async create(createStopDto: CreateStopDto): Promise<Stop> {
    // Do not remove comment below.
    // <creating-property />

    // Validate Route
    let route: Route;
    if (createStopDto.route?.id) {
      const routeObject = await this.routesService.findById(
        createStopDto.route.id,
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

    // Validate Station
    let station: Station;
    if (createStopDto.station?.id) {
      const stationObject = await this.stationsService.findById(
        createStopDto.station.id,
      );
      if (!stationObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            station: 'stationNotExists',
          },
        });
      }
      station = stationObject;
    } else {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          station: 'stationRequired',
        },
      });
    }

    // Validate and parse times
    let arrivalTime: Date | null = null;
    let departureTime: Date | null = null;

    if (createStopDto.arrivalTime && createStopDto.departureTime) {
      if (!this.isValidDateString(createStopDto.arrivalTime)) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            arrivalTime: `Invalid arrival time format: ${createStopDto.arrivalTime}`,
          },
        });
      }

      if (!this.isValidDateString(createStopDto.departureTime)) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            departureTime: `Invalid departure time format: ${createStopDto.departureTime}`,
          },
        });
      }

      arrivalTime = this.parseDateTime(createStopDto.arrivalTime);
      departureTime = this.parseDateTime(createStopDto.departureTime);

      if (isNaN(arrivalTime.getTime())) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            arrivalTime: `Invalid arrival time value: ${createStopDto.arrivalTime}`,
          },
        });
      }

      if (isNaN(departureTime.getTime())) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            departureTime: `Invalid departure time value: ${createStopDto.departureTime}`,
          },
        });
      }

      if (arrivalTime >= departureTime) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            arrivalTime: 'arrivalTimeMustBeBeforeDepartureTime',
          },
        });
      }

      // Check for time conflicts
      const existingStops = await this.stopRepository.findByRouteId(route.id);
      const conflictingStop = existingStops.find(
        (stop) =>
          (arrivalTime! >= stop.arrivalTime &&
            arrivalTime! <= stop.departureTime) ||
          (departureTime! >= stop.arrivalTime &&
            departureTime! <= stop.departureTime),
      );

      if (conflictingStop) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            time: 'timeConflictWithExistingStop',
          },
        });
      }
    } else {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          arrivalTime: 'arrivalTimeRequired',
          departureTime: 'departureTimeRequired',
        },
      });
    }

    // Calculate sequence
    const sequence = await this.calculateSequence(route.id, arrivalTime);

    return this.stopRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      route,
      arrivalTime,
      departureTime: departureTime!,
      station,
    });
  }

  findManyWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Stop[]> {
    return this.stopRepository.findManyWithPagination({
      paginationOptions,
    });
  }

  findById(id: Stop['id']): Promise<NullableType<Stop>> {
    return this.stopRepository.findById(id);
  }

  findByIds(ids: Stop['id'][]): Promise<Stop[]> {
    return this.stopRepository.findByIds(ids);
  }

  findByStationId(stationId: number): Promise<Stop[]> {
    return this.stopRepository.findByStationId(stationId);
  }

  findByRouteId(routeId: number): Promise<Stop[]> {
    return this.stopRepository.findByRouteId(routeId);
  }

  async update(
    id: Stop['id'],
    updateStopDto: UpdateStopDto,
  ): Promise<Stop | null> {
    // Do not remove comment below.
    // <updating-property />

    const existingStop = await this.findById(id);
    if (!existingStop) {
      return null;
    }

    let route: RouteReference | undefined = undefined;

    let station: StationReference | undefined = undefined;

    // Validate Route if updated
    if (updateStopDto.route?.id) {
      const routeObject = await this.routesService.findById(
        updateStopDto.route.id,
      );
      if (!routeObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            route: 'routeNotExists',
          },
        });
      }
      route = { id: updateStopDto.route.id };
    }

    // Validate Station if updated
    if (updateStopDto.station?.id) {
      const stationObject = await this.stationsService.findById(
        updateStopDto.station.id,
      );
      if (!stationObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            station: 'stationNotExists',
          },
        });
      }
      station = { id: stationObject.id };
    }

    // Handle time updates
    let arrivalTime = updateStopDto.arrivalTime
      ? new Date(updateStopDto.arrivalTime)
      : existingStop.arrivalTime;

    let departureTime = updateStopDto.departureTime
      ? new Date(updateStopDto.departureTime)
      : existingStop.departureTime;

    if (updateStopDto.arrivalTime || updateStopDto.departureTime) {
      // Validate date strings if provided
      if (
        updateStopDto.arrivalTime &&
        !this.isValidDateString(updateStopDto.arrivalTime)
      ) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            arrivalTime: `Invalid arrival time format: ${updateStopDto.arrivalTime}`,
          },
        });
      }

      if (
        updateStopDto.departureTime &&
        !this.isValidDateString(updateStopDto.departureTime)
      ) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            departureTime: `Invalid departure time format: ${updateStopDto.departureTime}`,
          },
        });
      }

      arrivalTime = updateStopDto.arrivalTime
        ? this.parseDateTime(updateStopDto.arrivalTime)
        : existingStop.arrivalTime;

      departureTime = updateStopDto.departureTime
        ? this.parseDateTime(updateStopDto.departureTime)
        : existingStop.departureTime;

      // Validate parsed dates
      if (updateStopDto.arrivalTime && isNaN(arrivalTime.getTime())) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            arrivalTime: `Invalid arrival time value: ${updateStopDto.arrivalTime}`,
          },
        });
      }

      if (updateStopDto.departureTime && isNaN(departureTime.getTime())) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            departureTime: `Invalid departure time value: ${updateStopDto.departureTime}`,
          },
        });
      }

      // Ensure departureTime is defined
      if (!departureTime) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            departureTime: 'departureTimeRequired',
          },
        });
      }

      if (arrivalTime >= departureTime) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            arrivalTime: 'arrivalTimeMustBeBeforeDepartureTime',
          },
        });
      }

      const routeId = route?.id || existingStop.route.id;
      const existingStops = await this.stopRepository.findByRouteId(routeId);
      const conflictingStop = existingStops.find(
        (stop) =>
          stop.id !== id &&
          ((arrivalTime >= stop.arrivalTime &&
            arrivalTime <= stop.departureTime) ||
            (departureTime >= stop.arrivalTime &&
              departureTime <= stop.departureTime)),
      );

      if (conflictingStop) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            time: 'timeConflictWithExistingStop',
          },
        });
      }
    }

    // Calculate sequence based on updated times or route
    const sequence = await this.calculateSequence(
      route?.id || existingStop.route.id,
      arrivalTime || existingStop.arrivalTime,
    );

    return this.stopRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      route,
      station,
      arrivalTime,
      departureTime,
    });
  }

  async remove(id: Stop['id']): Promise<void> {
    await this.stopRepository.remove(id);
  }

  private async calculateSequence(
    routeId: number,
    arrivalTime: Date,
  ): Promise<number> {
    const existingStops = await this.stopRepository.findByRouteId(routeId);
    const sortedStops = existingStops.sort((a, b) => {
      const aTime = new Date(a.arrivalTime).getTime();
      const bTime = new Date(b.arrivalTime).getTime();
      return aTime - bTime;
    });

    const position = sortedStops.findIndex(
      (stop) => arrivalTime.getTime() < new Date(stop.arrivalTime).getTime(),
    );

    return position === -1 ? sortedStops.length + 1 : position + 1;
  }

  // Add helper method for date validation
  private isValidDateString(dateString: string): boolean {
    // First try parsing as ISO datetime
    const isoDateRegex =
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?$/;
    if (isoDateRegex.test(dateString)) {
      return true;
    }

    // Then try parsing as time string (now accepts HH:mm and HH:mm:ss formats)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
    if (timeRegex.test(dateString)) {
      return true;
    }

    return false;
  }

  private parseDateTime(timeString: string): Date {
    if (timeString.includes('T')) {
      return new Date(timeString);
    }

    // Handle time-only string
    const today = new Date().toISOString().split('T')[0];
    // Check if seconds are already included
    if (timeString.split(':').length === 3) {
      return new Date(`${today}T${timeString}`);
    }
    // Add seconds if not present
    return new Date(`${today}T${timeString}:00`);
  }
}
