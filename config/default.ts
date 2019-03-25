export default {
  api: {
    host: process.env.API_HOST || '0.0.0.0',
    port: process.env.API_PORT || 8000,
    basePath: process.env.API_BASE_PATH || '/api'
  },
  datasource: {
    name: 'FacilityConfigDb',
    connector: 'mongodb',
    url: '',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'FacilityConfig'
  }
};
