import {DefaultCrudRepository} from '@loopback/repository';
import {Facility, List} from '../models';
import {inject} from '@loopback/context';
import {FacilityConfigDataSource, FacilityInstanceDatasource} from '../datasources';
import {FacilityBindings} from '../keys';


export class ListRepository extends DefaultCrudRepository<List, typeof List.prototype.uniqueId> {
  constructor(
    @inject('datasources.FacilityConfigDb') facilityConfigDb: FacilityConfigDataSource,
    @inject('datasources.FacilityInstanceDb') private facilityInstanceDb: FacilityInstanceDatasource,
    @inject(FacilityBindings.CURRENT_FACILITY) private facility: Facility
  ) {
    super(List, facilityConfigDb);
    console.log(`###### List controller created ###########`);
  }
}
