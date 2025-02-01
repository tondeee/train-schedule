/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateStationDto } from '../models/CreateStationDto';
import type { InfinityPaginationStationResponseDto } from '../models/InfinityPaginationStationResponseDto';
import type { Station } from '../models/Station';
import type { UpdateStationDto } from '../models/UpdateStationDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class StationsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param requestBody
     * @returns Station
     * @throws ApiError
     */
    public stationsControllerCreateV1(
        requestBody: CreateStationDto,
    ): CancelablePromise<Station> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/stations',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param page
     * @param limit
     * @returns InfinityPaginationStationResponseDto
     * @throws ApiError
     */
    public stationsControllerFindAllV1(
        page?: number,
        limit?: number,
    ): CancelablePromise<InfinityPaginationStationResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/stations',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * @param id
     * @returns Station
     * @throws ApiError
     */
    public stationsControllerFindOneV1(
        id: string,
    ): CancelablePromise<Station> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/stations/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns Station
     * @throws ApiError
     */
    public stationsControllerUpdateV1(
        id: string,
        requestBody: UpdateStationDto,
    ): CancelablePromise<Station> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/stations/{id}',
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
    public stationsControllerRemoveV1(
        id: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/stations/{id}',
            path: {
                'id': id,
            },
        });
    }
}
