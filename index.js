const application = require('./dist');
const config = require('config');

module.exports = application;

if (require.main === module) {
    // Run the application
    const appConfig = {
        rest: {
            port: +config.api.port,
            host: config.api.host,
            openApiSpec: {
                // useful when used with OASGraph to locate your application
                setServersFromRequest: true
            }
        }
    };
    application.main(appConfig).catch(err => {
        console.error('Cannot start the application.', err);
        process.exit(1);
    });
}
