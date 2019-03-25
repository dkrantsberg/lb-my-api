import {Model, model, property} from '@loopback/repository';

@model()
export class IdProvider extends Model {
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
  label: string;

  constructor(data?: Partial<IdProvider>) {
    super(data);
  }
}
