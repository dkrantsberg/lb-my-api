import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = require('config');

export class FacilityConfigDataSource extends juggler.DataSource {
  static dataSourceName = 'FacilityConfigDb';

  constructor(
    @inject('datasources.config.FacilityConfigDb', {optional: true})
    dsConfig: object = config.datasource
  ) {
    super(dsConfig);
  }
}
