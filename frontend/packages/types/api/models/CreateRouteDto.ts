/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateStopWithoutRouteDto } from './CreateStopWithoutRouteDto';
export type CreateRouteDto = {
    /**
     * Name of the route
     */
    name: string;
    /**
     * Route description
     */
    description?: string;
    /**
     * List of stops in the route
     */
    stops: Array<CreateStopWithoutRouteDto>;
};

