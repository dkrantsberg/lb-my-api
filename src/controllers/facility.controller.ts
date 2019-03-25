import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {param, get, getFilterSchemaFor, getWhereSchemaFor} from '@loopback/rest';
import {Facility} from '../models';
import {FacilityRepository} from '../repositories';

export class FacilityController {
  constructor(
    @repository(FacilityRepository)
    public facilityRepository: FacilityRepository
  ) {}

  @get('/facilities/count', {
    responses: {
      '200': {
        description: 'Facility model count',
        content: {'application/json': {schema: CountSchema}}
      }
    }
  })
  async count(@param.query.object('where', getWhereSchemaFor(Facility)) where?: Where): Promise<Count> {
    return await this.facilityRepository.count(where);
  }

  @get('/facilities', {
    responses: {
      '200': {
        description: 'Array of Facility model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Facility}}
          }
        }
      }
    }
  })
  async find(@param.query.object('filter', getFilterSchemaFor(Facility)) filter?: Filter): Promise<Facility[]> {
    return await this.facilityRepository.find(filter);
  }
}
