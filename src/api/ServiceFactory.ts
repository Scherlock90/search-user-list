import { TRemapedServiceNames, TService, TServicesNames } from './types';

import users from './users-services';

/**
 * @const services
 * @description Here we add a services which want to inoke in ServiceFactory.
 */
const services: TRemapedServiceNames = {
  users
};

/**
 * @const ServiceFactory
 * @description This ServiceFactory contain each services grupped by method name, like get, put, post, ect.
 */
export const ServiceFactory = {
  //Generic type Service name which will be extend one of the TServicesNames - this give us possibility to filtering Services with the returned functions types
  get: <ServiceName extends TServicesNames>(name: TServicesNames): TService[ServiceName] =>
    services[name] as TService[ServiceName]
};
