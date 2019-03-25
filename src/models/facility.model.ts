import {Entity, model, property} from '@loopback/repository';
import {FacilityDatasource} from './facility.datasource.model';

@model({
  settings: {
    mongodb: {
      collection: 'Facilities'
    }
  }
})
export class Facility extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true
  })
  id: string;

  @property({
    type: 'string',
    required: true
  })
  title: string;

  @property({
    type: 'string'
  })
  description: string;

  @property({
    type: 'string'
  })
  logo: string;

  @property.array(String)
  idProviders: string[];

  @property()
  datasource: FacilityDatasource;

  @property({
    type: 'number'
  })
  authTenantId: number;

  constructor(data?: Partial<Facility>) {
    super(data);
  }
}
