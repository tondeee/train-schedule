'use server'
import { createAction } from '@/lib/utils';
import type { CreateStationDto } from '@/packages/types/api/models/CreateStationDto';
import type { UpdateStationDto } from '@/packages/types/api/models/UpdateStationDto';
import type { Station } from '@/packages/types/api/models/Station';
import type { InfinityPaginationStationResponseDto } from '@/packages/types/api/models/InfinityPaginationStationResponseDto';

export const getAllStations = async (page?: number, limit?: number): Promise<InfinityPaginationStationResponseDto | null> =>
  createAction((api) => api.stations.stationsControllerFindAllV1(page, limit));

export const getStationById = async (id: string): Promise<Station | null> =>
  createAction((api) => api.stations.stationsControllerFindOneV1(id));

export const createStation = async (data: CreateStationDto): Promise<Station |null> =>
  createAction((api) => api.stations.stationsControllerCreateV1(data));

export const updateStation = async (id: string, data: UpdateStationDto): Promise<Station|null> =>
  createAction((api) => api.stations.stationsControllerUpdateV1(id, data));

export const deleteStation = async (id: string): Promise<void | null> =>
  createAction((api) => api.stations.stationsControllerRemoveV1(id));
