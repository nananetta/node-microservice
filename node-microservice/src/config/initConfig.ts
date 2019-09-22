'use strict';

/**
 * Module dependencies.
 */
// let path = require('path');
// let config = require('./config');
let express = require('express');
// import invokeroute from '../app/controllers/invokeroute.server.controller';
// let adminRouter = require('../app/controllers/admin.server.controller');
// import { Router } from 'express';
import invokeroute from '../app/controllers/invokeroute.server.controller';

/**
 * Module init function.
 */
module.exports = function() {
    // Reading all module configuration
    // let modules = require('./env/dev/modules');
    // let app = express();
    // let router = new express.Router();

    // let v = require('../app/controllers/invokeroute.server.controller')(router);
    // let v = require('../app/controllers/invokeroute.server.controller')(router);

    console.log('init config!!!!');
    const router = new express.Router();
    console.log('s');
    router.use('/hp', invokeroute);
    // router.use('/ab', adminRouter);

    // modules.forEach(function(item) {
    //     console.log('Loading module:', item.moduleName);
    //     // Globbing each module configuration
    //     config
    //         .getGlobbedFiles(
    //             './**/env/dev/modules/' + item.moduleName + '/api/*.js'
    //         )
    //         .forEach(function(routePath) {
    //             let invokeroute = require('../app/controllers/invokeroute.server.controller')();
    //             console.log('routePath:', routePath);
    //             let apiConfig = require(path.resolve(routePath));
    //             let type = apiConfig.type;
    //             if (type.toLowerCase() === 'mock') {
    //                 console.log('mock');
    //             } else if (type.toLowerCase() === 'standard') {
    //                 console.log('standard');
    //             } else if (type.toLowerCase() === 'proxy') {
    //                 console.log('proxy');
    //                 // app.route(.endpoint).post(invokeroute);
    //             } else {
    //                 console.log('Unexpected case. Type is not defined.');
    //             }
    //             console.log('item.endpoint:',item.endpoint);
    //             app.use(item.endpoint, invokeroute);
    //             console.log(apiConfig);
    //         });
    // });
    return router;
};

export {};
