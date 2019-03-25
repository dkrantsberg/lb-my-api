import {inject, bind, BindingScope} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {FacilityBindings} from '../keys';
import {Facility} from '../models';

@bind({scope: BindingScope.TRANSIENT})
export class FacilityInstanceDatasource extends juggler.DataSource {
  static dataSourceName = 'FacilityInstanceDb';

  constructor(@inject(FacilityBindings.CURRENT_FACILITY) facility: Facility) {
    super(facility.datasource);
  }
}
