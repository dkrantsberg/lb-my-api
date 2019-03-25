import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import {MySequence} from './sequence';
import * as path from 'path';
import * as config from 'config';
import {FacilityBindings} from './keys';
import {RestExplorerComponent, RestExplorerBindings} from '@loopback/rest-explorer';

export class FacilityApi extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // explicitly point to /dist folder for TypeScript debugging
    if (process.env.TS_TEST) {
      __dirname = __dirname.replace(`${process.cwd()}/src`, `${process.cwd()}/dist/src`);
    }

    this.bind(FacilityBindings.CONFIG).to(config);

    // Set up default home page
    this.static('/', path.join(__dirname, '../../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer'
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true
      }
    };
  }
}
