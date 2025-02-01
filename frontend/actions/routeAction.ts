'use server'
import { createAction } from '@/lib/utils';
import type { CreateRouteDto } from '@/packages/types/api/models/CreateRouteDto';
import type { UpdateRouteDto } from '@/packages/types/api/models/UpdateRouteDto';
import type { Route } from '@/packages/types/api/models/Route';
import type { InfinityPaginationRouteResponseDto } from '@/packages/types/api/models/InfinityPaginationRouteResponseDto';

export const getAllRoutes = async (page?: number, limit?: number): Promise<InfinityPaginationRouteResponseDto | null> =>
  createAction((api) => api.routes.routesControllerFindAllV1(page, limit));

export const getRouteById = async (id: string): Promise<Route | null> =>
  createAction((api) => api.routes.routesControllerFindOneV1(id));

export const createRoute = async (data: CreateRouteDto): Promise<Route | null> =>
  createAction((api) => api.routes.routesControllerCreateV1(data));

export const updateRoute = async (id: string, data: UpdateRouteDto): Promise<Route | null> =>
  createAction((api) => api.routes.routesControllerUpdateV1(id, data));

export const deleteRoute = async (id: string): Promise<void | null> =>
  createAction((api) => api.routes.routesControllerRemoveV1(id));
