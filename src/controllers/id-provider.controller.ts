import {get} from '@loopback/rest';
import {IdProvider} from '../models';
import {inject} from '@loopback/core';
import {FacilityBindings} from '../keys';

export class IdProviderController {
  private config: any;
  constructor(@inject(FacilityBindings.CONFIG) config: any) {
    this.config = config;
  }

  @get('/idproviders', {
    responses: {
      '200': {
        description: 'Array of IDPs (identity providers)',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': IdProvider}}
          }
        }
      }
    }
  })
  async getAll(): Promise<IdProvider[]> {
    return this.config.idProviders;
  }
}
