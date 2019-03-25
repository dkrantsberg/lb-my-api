import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {post, param, get, getFilterSchemaFor, getWhereSchemaFor, patch, del, requestBody} from '@loopback/rest';
import {List} from '../models';
import {ListRepository} from '../repositories';
import {FacilityBindings} from '../keys';
import {UniqueIdProvider} from '../utilities';
import {inject} from '@loopback/core';
import * as _ from 'lodash';

export class ListController {
  private uniqueIdProvider: UniqueIdProvider;
  private facilityId: string;
  constructor(
    @repository(ListRepository) public listRepository: ListRepository
  ) {
  }

  @post('/facilities/{facilityId}/lists', {
    responses: {
      '200': {
        description: 'List model instance',
        content: {'application/json': {schema: {'x-ts-type': List}}}
      }
    }
  })
  async create(@requestBody() list: List): Promise<List> {
    list.facilityId = this.facilityId;
    list.uniqueId = this.uniqueIdProvider.getUniqueId(list.name);
    return await this.listRepository.create(list);
  }

  @get('/facilities/{facilityId}/lists/count', {
    responses: {
      '200': {
        description: 'List model count',
        content: {'application/json': {schema: CountSchema}}
      }
    }
  })
  async count(@param.query.object('where', getWhereSchemaFor(List)) where?: Where): Promise<Count> {
    where = _.set(where || {}, 'facilityId', this.facilityId);
    return await this.listRepository.count(where);
  }

  @get('/facilities/{facilityId}/lists', {
    responses: {
      '200': {
        description: 'Array of List model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': List}}
          }
        }
      }
    }
  })
  async find(@param.query.object('filter', getFilterSchemaFor(List)) filter?: Filter): Promise<List[]> {
    console.log('#### Getting Facility list #####');
    filter = _.set(filter || {}, 'where.facilityId', this.facilityId);
    return await this.listRepository.find(filter);
  }

  @patch('/facilities/{facilityId}/lists', {
    responses: {
      '200': {
        description: 'List PATCH success count',
        content: {'application/json': {schema: CountSchema}}
      }
    }
  })
  async updateAll(
    @requestBody() list: List,
    @param.query.object('where', getWhereSchemaFor(List)) where?: Where
  ): Promise<Count> {
    where = _.set(where || {}, 'facilityId', this.facilityId);
    return await this.listRepository.updateAll(list, where);
  }

  @get('/facilities/{facilityId}/lists/{listName}', {
    responses: {
      '200': {
        description: 'List model instance',
        content: {'application/json': {schema: {'x-ts-type': List}}}
      }
    }
  })
  async findById(@param.path.string('listName') listName: string): Promise<List> {
    return await this.listRepository.findById(this.uniqueIdProvider.getUniqueId(listName));
  }

  @patch('/facilities/{facilityId}/lists/{listName}', {
    responses: {
      '204': {
        description: 'List PATCH success'
      }
    }
  })
  async updateById(@param.path.string('listName') listName: string, @requestBody() list: List): Promise<void> {
    const uniqueId = this.uniqueIdProvider.getUniqueId(listName);
    await this.listRepository.updateById(uniqueId, list);
  }

  @del('/facilities/{facilityId}/lists/{listName}', {
    responses: {
      '204': {
        description: 'List DELETE success'
      }
    }
  })
  async deleteById(@param.path.string('listName') listName: string): Promise<void> {
    await this.listRepository.deleteById(this.uniqueIdProvider.getUniqueId(listName));
  }
}
