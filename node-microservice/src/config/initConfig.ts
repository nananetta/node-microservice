'use strict';

/**
 * Module dependencies.
 */
let path = require('path');
let config = require('./config');
import proxyRouter from '../app/controllers/proxyrouter.server.controller';

/**
 * Module init function.
 */
module.exports = function(app) {
    // Reading all module configuration
    let modules = require('./env/dev/modules');
    console.log('init config!!!!');

    console.log('\n\n=============================');
    modules.forEach(function(item) {
        console.log('\nModule :', item.moduleName);
        console.log('Path   :', item.endpoint, '\n');
        // Globbing each module configuration
        config
            .getGlobbedFiles(
                './**/env/dev/modules/' + item.moduleName + '/api/*.js'
            )
            .forEach(function(configPath) {
                console.log('---------------------------');
                let apiConfig = require(path.resolve(configPath));
                let type = apiConfig.type;
                if (type.toLowerCase() === 'mock') {
                    console.log('Create mock api');
                } else if (type.toLowerCase() === 'standard') {
                    console.log('Create standard api');
                } else if (type.toLowerCase() === 'proxy') {
                    console.log('Create proxy api');
                    app.use(item.endpoint, proxyRouter(apiConfig));
                } else {
                    console.log('Unexpected case. Type is not defined.');
                }
                // console.log('item.endpoint:', item.endpoint);
                // console.log(apiConfig);
            });
        console.log('\n=============================');
    });
};

export {};
