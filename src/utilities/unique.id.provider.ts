import {inject} from '@loopback/core';
import {FacilityBindings} from '../keys';

export class UniqueIdProvider {
  constructor(@inject(FacilityBindings.CURRENT_FACILITY_ID) private facilityId: string) {}
  getUniqueId(id: string) {
    return `${this.facilityId}:${id}`;
  }
}
