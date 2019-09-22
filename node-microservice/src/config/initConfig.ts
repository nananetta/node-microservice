'use strict';

/**
 * Module dependencies.
 */
let path = require('path');
let config = require('./config');
import proxyRouter from '../app/controllers/invokeroute.server.controller';

/**
 * Module init function.
 */
module.exports = function(app) {
    // Reading all module configuration
    let modules = require('./env/dev/modules');
    console.log('init config!!!!');

    modules.forEach(function(item) {
        console.log('Loading module:', item.moduleName);
        // Globbing each module configuration
        config
            .getGlobbedFiles(
                './**/env/dev/modules/' + item.moduleName + '/api/*.js'
            )
            .forEach(function(routePath) {
                console.log('routePath:', routePath);
                let apiConfig = require(path.resolve(routePath));
                let type = apiConfig.type;
                if (type.toLowerCase() === 'mock') {
                    console.log('mock');
                } else if (type.toLowerCase() === 'standard') {
                    console.log('standard');
                } else if (type.toLowerCase() === 'proxy') {
                    console.log('proxy');
                    app.use(item.endpoint, proxyRouter);
                } else {
                    console.log('Unexpected case. Type is not defined.');
                }
                console.log('item.endpoint:', item.endpoint);
                console.log(apiConfig);
            });
    });
};

export {};
