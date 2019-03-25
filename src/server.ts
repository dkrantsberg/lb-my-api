import {FacilityApi} from './application';
import {ApplicationConfig} from '@loopback/core';
import * as express from 'express';
import * as pEvent from 'p-event';
import * as http from 'http';
const config = require('config');

export class ExpressServer {
  private app: express.Application;
  public readonly facilityApi: FacilityApi;
  private server: http.Server;

  constructor(options: ApplicationConfig = {}) {
    this.app = express();
    this.facilityApi = new FacilityApi(options);

    // Expose the front-end assets via Express, not as LB4 route
    this.app.use(config.api.basePath, this.facilityApi.requestHandler);

    // Serve static files in the public folder
    this.app.use(express.static('public'));
  }

  public async boot() {
    await this.facilityApi.boot();
  }

  public async start() {
    this.server = this.app.listen(config.api.port);
    await pEvent(this.server, 'listening');
  }

  // For testing purposes
  public async stop() {
    if (!this.server) return;
    this.server.close();
    await pEvent(this.server, 'close');
  }
}
