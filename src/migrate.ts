import {DataSource} from '@loopback/repository';
import {FacilityApi} from './application';
import {ListRepository, FacilityRepository} from './repositories';

export async function dsMigrate(app: FacilityApi) {
  const ds = await app.get<DataSource>('datasources.facilityDb');
  await app.getRepository(FacilityRepository);
  await app.getRepository(ListRepository);
  await ds.automigrate();
}
