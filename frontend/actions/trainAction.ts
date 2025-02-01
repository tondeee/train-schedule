'use server'
import { createAction } from '@/lib/utils';
import type { CreateTrainDto } from '@/packages/types/api/models/CreateTrainDto';
import type { UpdateTrainDto } from '@/packages/types/api/models/UpdateTrainDto';

export const createTrain = async (data: CreateTrainDto) =>
  createAction((api) => api.trains.trainsControllerCreateV1(data));

export const getTrains = async (
  startStationId?: number,
  endStationId?: number,
  date?: string,
  page: number = 1,
  limit: number = 10,
  sort?: string
) =>
  createAction((api) =>
    api.trains.trainsControllerFindAllV1(
      startStationId,
      endStationId,
      date,
      page,
      limit,
      sort
    )
  );

export const getTrain = async (id: string) =>
  createAction((api) => api.trains.trainsControllerFindOneV1(id));

export const updateTrain = async (id: string, data: UpdateTrainDto) =>
  createAction((api) => api.trains.trainsControllerUpdateV1(id, data));

export const deleteTrain = async (id: string) =>
  createAction((api) => api.trains.trainsControllerRemoveV1(id));
