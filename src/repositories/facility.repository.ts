import {DefaultCrudRepository, juggler, Model} from '@loopback/repository';
import {Facility, FacilityDatasource} from '../models';
import {FacilityConfigDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FacilityRepository extends DefaultCrudRepository<Facility, typeof Facility.prototype.id> {
  constructor(
    @inject('datasources.FacilityConfigDb') facilityConfigDataSource: FacilityConfigDataSource
  ) {
    super(Facility, facilityConfigDataSource);
    this.addModelDefinitionToDatasource(facilityConfigDataSource, FacilityDatasource);
  }

  /**
   * Creates new facility.
   * @param {Facility} facility - Facility object
   * @returns {Promise<Facility>} The new model class with DAO (CRUD) operations
   */
  async create(facility: Facility) {
    return super.create(facility);
  }

  /**
   * Deletes facility.
   * @param {string} id - Facility id
   */
  async deleteById(id: string) {
    await super.deleteById(id);
  }

  private addModelDefinitionToDatasource(datasource: juggler.DataSource, modelClass: typeof Model) {
    // @ts-ignore
    datasource.modelBuilder.definitions[modelClass.definition.name] = modelClass.definition;
  }
}
