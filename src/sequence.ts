import {inject} from '@loopback/context';
import {
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler
} from '@loopback/rest';
import {repository} from '@loopback/repository';
import {FacilityRepository} from './repositories';
import {FacilityBindings} from './keys';
import {UniqueIdProvider} from './utilities';
import {Facility} from './models';

const SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @repository(FacilityRepository) public facilityRepository: FacilityRepository
  ) {}

  async handle(context: RequestContext) {
    try {
      const {request, response} = context;
      const route = this.findRoute(request);
      if (route.pathParams.facilityId) {
        context.bind(FacilityBindings.CURRENT_FACILITY_ID).to(route.pathParams.facilityId);
        const facility = new Facility(); // await this.facilityRepository.findById(route.pathParams.facilityId);
        context.bind(FacilityBindings.CURRENT_FACILITY).to(facility);
        console.log(`########## Bound facility ${facility.id} to context ########`);
        context.bind(FacilityBindings.UNIQUE_ID_PROVIDER).to(new UniqueIdProvider(route.pathParams.facilityId));
      }
      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (err) {
      this.reject(context, err);
    }
  }
}
