/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { InfinityPaginationUserResponseDto } from '../models/InfinityPaginationUserResponseDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UsersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public usersControllerCreateV1(
        requestBody: CreateUserDto,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/users',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param page
     * @param limit
     * @param filters
     * @param sort
     * @returns InfinityPaginationUserResponseDto
     * @throws ApiError
     */
    public usersControllerFindAllV1(
        page?: number,
        limit?: number,
        filters?: string,
        sort?: string,
    ): CancelablePromise<InfinityPaginationUserResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/users',
            query: {
                'page': page,
                'limit': limit,
                'filters': filters,
                'sort': sort,
            },
        });
    }
    /**
     * @param id
     * @returns User
     * @throws ApiError
     */
    public usersControllerFindOneV1(
        id: string,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/users/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public usersControllerUpdateV1(
        id: string,
        requestBody: UpdateUserDto,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/users/{id}',
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
    public usersControllerRemoveV1(
        id: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/users/{id}',
            path: {
                'id': id,
            },
        });
    }
}
