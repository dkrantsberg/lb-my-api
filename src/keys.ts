import {BindingKey} from '@loopback/context';
import {Facility} from './models';
import {UniqueIdProvider} from './utilities';

export namespace FacilityBindings {
  export const AUTH_TOKEN = BindingKey.create<string>('auth.token');
  export const CONFIG = BindingKey.create<any>('facility.config');
  export const CURRENT_FACILITY = BindingKey.create<Facility>('current.facility');
  export const CURRENT_FACILITY_ID = BindingKey.create<string>('current.facility.id');
  export const UNIQUE_ID_PROVIDER = BindingKey.create<UniqueIdProvider>('unique.id.provider');
}
