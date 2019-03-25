import {Entity, PropertyDefinition, model, property, belongsTo} from '@loopback/repository';
import {Facility} from './facility.model';

@model({
  settings: {
    mysql: {
      table: 'Lists'
    },
    mongodb: {
      collection: 'Lists'
    }
  }
})
export class List extends Entity {
  @property({
    type: 'string',
    required: true
  })
  name: string;

  @property({
    type: 'string',
    required: true
  })
  description: string;

  @property({
    type: 'object'
  })
  fields?: {[name: string]: PropertyDefinition};

  @belongsTo(() => Facility)
  facilityId: string;

  @property({
    type: 'string',
    id: true
  })
  uniqueId: string;

  constructor(data?: Partial<List>) {
    super(data);
  }
}
