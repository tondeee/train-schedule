/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTrainDto } from '../models/CreateTrainDto';
import type { InfinityPaginationTrainResponseDto } from '../models/InfinityPaginationTrainResponseDto';
import type { Train } from '../models/Train';
import type { UpdateTrainDto } from '../models/UpdateTrainDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class TrainsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param requestBody
     * @returns Train
     * @throws ApiError
     */
    public trainsControllerCreateV1(
        requestBody: CreateTrainDto,
    ): CancelablePromise<Train> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/trains',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param startStationId Filter trains by departure station ID
     * @param endStationId Filter trains by destination station ID
     * @param date Filter trains by date (YYYY-MM-DD)
     * @param page Page number for pagination
     * @param limit Number of items per page (max 100)
     * @param sort Sort criteria array in JSON string format
     * @returns InfinityPaginationTrainResponseDto
     * @throws ApiError
     */
    public trainsControllerFindAllV1(
        startStationId?: number,
        endStationId?: number,
        date?: string,
        page: number = 1,
        limit: number = 10,
        sort?: string,
    ): CancelablePromise<InfinityPaginationTrainResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/trains',
            query: {
                'startStationId': startStationId,
                'endStationId': endStationId,
                'date': date,
                'page': page,
                'limit': limit,
                'sort': sort,
            },
        });
    }
    /**
     * @param id
     * @returns Train
     * @throws ApiError
     */
    public trainsControllerFindOneV1(
        id: string,
    ): CancelablePromise<Train> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/trains/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns Train
     * @throws ApiError
     */
    public trainsControllerUpdateV1(
        id: string,
        requestBody: UpdateTrainDto,
    ): CancelablePromise<Train> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/trains/{id}',
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
    public trainsControllerRemoveV1(
        id: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/trains/{id}',
            path: {
                'id': id,
            },
        });
    }
}
