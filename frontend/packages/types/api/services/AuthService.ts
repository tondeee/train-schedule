/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthEmailLoginDto } from '../models/AuthEmailLoginDto';
import type { AuthRegisterLoginDto } from '../models/AuthRegisterLoginDto';
import type { AuthUpdateDto } from '../models/AuthUpdateDto';
import type { LoginResponseDto } from '../models/LoginResponseDto';
import type { RefreshResponseDto } from '../models/RefreshResponseDto';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AuthService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param requestBody
     * @returns LoginResponseDto
     * @throws ApiError
     */
    public authControllerLoginV1(
        requestBody: AuthEmailLoginDto,
    ): CancelablePromise<LoginResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/email/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public authControllerRegisterV1(
        requestBody: AuthRegisterLoginDto,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/email/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns User
     * @throws ApiError
     */
    public authControllerMeV1(): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/me',
        });
    }
    /**
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public authControllerUpdateV1(
        requestBody: AuthUpdateDto,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/auth/me',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns void
     * @throws ApiError
     */
    public authControllerDeleteV1(): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/auth/me',
        });
    }
    /**
     * @returns RefreshResponseDto
     * @throws ApiError
     */
    public authControllerRefreshV1(): CancelablePromise<RefreshResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/refresh',
        });
    }
    /**
     * @returns void
     * @throws ApiError
     */
    public authControllerLogoutV1(): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/logout',
        });
    }
}
