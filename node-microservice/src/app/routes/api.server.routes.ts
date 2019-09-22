'use strict';

import { getMetrics } from '../controllers/metrics.server.controller';
import {
    authenticate,
    resolveToken,
    resolveSecret
} from '../controllers/auth.server.controller';
import { helloWorld } from '../controllers/api.server.controller';
import { invoke } from '../controllers/invoke.server.controller';

module.exports = function(app) {
    // app.use();
    app.route('/hello-secure').post(authenticate, helloWorld);

    app.route('/hello-secure').get(resolveToken, resolveSecret, helloWorld);

    app.route('/hello').post(helloWorld);

    app.route('/hello').get(helloWorld);

    app.route('/metrics').get(getMetrics);

    app.route('/invoke').get(invoke);

    // Set params if needed
    // app.param('Id', apiCtrl.func);
};
