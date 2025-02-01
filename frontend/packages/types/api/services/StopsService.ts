/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateStopDto } from '../models/CreateStopDto';
import type { InfinityPaginationStopResponseDto } from '../models/InfinityPaginationStopResponseDto';
import type { Stop } from '../models/Stop';
import type { UpdateStopDto } from '../models/UpdateStopDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class StopsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param requestBody
     * @returns Stop
     * @throws ApiError
     */
    public stopsControllerCreateV1(
        requestBody: CreateStopDto,
    ): CancelablePromise<Stop> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/stops',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param page
     * @param limit
     * @returns InfinityPaginationStopResponseDto
     * @throws ApiError
     */
    public stopsControllerFindAllV1(
        page?: number,
        limit?: number,
    ): CancelablePromise<InfinityPaginationStopResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/stops',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * @param id
     * @returns Stop
     * @throws ApiError
     */
    public stopsControllerFindOneV1(
        id: string,
    ): CancelablePromise<Stop> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/stops/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns Stop
     * @throws ApiError
     */
    public stopsControllerUpdateV1(
        id: string,
        requestBody: UpdateStopDto,
    ): CancelablePromise<Stop> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/stops/{id}',
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
    public stopsControllerRemoveV1(
        id: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/stops/{id}',
            path: {
                'id': id,
            },
        });
    }
}
