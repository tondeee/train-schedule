/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RouteDto } from './RouteDto';
export type UpdateTrainDto = {
    /**
     * Name of the train
     */
    name?: string;
    route?: RouteDto;
    /**
     * Days of the week the train runs
     */
    scheduleDays?: number;
};

