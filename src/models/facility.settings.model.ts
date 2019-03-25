import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mongodb: {
      collection: 'FacilitySettings'
    }
  }
})
export class FacilitySettings extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true
  })
  facilityName: string;

  @property({
    type: 'object'
  })
  settings?: object;

  constructor(data?: Partial<FacilitySettings>) {
    super(data);
  }
}
