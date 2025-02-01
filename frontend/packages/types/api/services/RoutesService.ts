/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRouteDto } from '../models/CreateRouteDto';
import type { InfinityPaginationRouteResponseDto } from '../models/InfinityPaginationRouteResponseDto';
import type { Route } from '../models/Route';
import type { UpdateRouteDto } from '../models/UpdateRouteDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class RoutesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param requestBody
     * @returns Route
     * @throws ApiError
     */
    public routesControllerCreateV1(
        requestBody: CreateRouteDto,
    ): CancelablePromise<Route> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/routes',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param page
     * @param limit
     * @returns InfinityPaginationRouteResponseDto
     * @throws ApiError
     */
    public routesControllerFindAllV1(
        page?: number,
        limit?: number,
    ): CancelablePromise<InfinityPaginationRouteResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/routes',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * @param id
     * @returns Route
     * @throws ApiError
     */
    public routesControllerFindOneV1(
        id: string,
    ): CancelablePromise<Route> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/routes/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns Route
     * @throws ApiError
     */
    public routesControllerUpdateV1(
        id: string,
        requestBody: UpdateRouteDto,
    ): CancelablePromise<Route> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/routes/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public routesControllerRemoveV1(
        id: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/routes/{id}',
            path: {
                'id': id,
            },
        });
    }
}
