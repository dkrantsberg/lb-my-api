import {ApplicationConfig} from '@loopback/core';
import {ExpressServer} from './server';
const config = require('config');

// tslint:disable-next-line
// import {dsMigrate} from './migrate'

export {ExpressServer};

export async function main(options: ApplicationConfig = {}) {
  const server = new ExpressServer(options);
  await server.boot();
  await server.start();
  console.log(`Server is running at http://127.0.0.1:${config.api.port}${config.api.basePath}`);
}
