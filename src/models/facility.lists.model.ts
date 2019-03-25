import {Entity, model, property} from '@loopback/repository';
import {List} from './list.model';

@model()
export class FacilityLists extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true
  })
  facilityName: string;

  @property.array(List)
  lists?: List[];

  constructor(data?: Partial<FacilityLists>) {
    super(data);
  }
}
