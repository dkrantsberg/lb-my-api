import {Model, model, property} from '@loopback/repository';

@model()
export class FacilityDatasource extends Model {
  @property({
    type: 'string',
    id: true,
    required: true
  })
  name: string;

  @property({
    type: 'string',
    required: true
  })
  connector: string;

  @property({
    type: 'string'
  })
  host: string;

  @property({
    type: 'string'
  })
  port: string;

  @property({
    type: 'string'
  })
  database: string;

  @property({
    type: 'string',
    required: true
  })
  user: string;

  @property({
    type: 'string',
    required: true
  })
  password: string;

  constructor(data?: Partial<FacilityDatasource>) {
    super(data);
  }
}
