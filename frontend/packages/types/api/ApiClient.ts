/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';
import { AuthService } from './services/AuthService';
import { HomeService } from './services/HomeService';
import { RoutesService } from './services/RoutesService';
import { StationsService } from './services/StationsService';
import { StopsService } from './services/StopsService';
import { TrainsService } from './services/TrainsService';
import { UsersService } from './services/UsersService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class ApiClient {
    public readonly auth: AuthService;
    public readonly home: HomeService;
    public readonly routes: RoutesService;
    public readonly stations: StationsService;
    public readonly stops: StopsService;
    public readonly trains: TrainsService;
    public readonly users: UsersService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '1.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.auth = new AuthService(this.request);
        this.home = new HomeService(this.request);
        this.routes = new RoutesService(this.request);
        this.stations = new StationsService(this.request);
        this.stops = new StopsService(this.request);
        this.trains = new TrainsService(this.request);
        this.users = new UsersService(this.request);
    }
}

