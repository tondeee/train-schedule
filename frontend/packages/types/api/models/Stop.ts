/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Route } from './Route';
import type { Station } from './Station';
export type Stop = {
    id: number;
    route: Route;
    station: Station;
    arrivalTime: string;
    departureTime: string;
    createdAt: string;
    updatedAt: string;
};

