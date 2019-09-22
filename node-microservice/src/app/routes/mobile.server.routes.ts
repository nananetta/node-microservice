'use strict';

import { proxy } from '../controllers/mobile.server.controller';
import { validate } from '../controllers/validation.server.controller';

module.exports = function(app) {
    app.route('/mobileframeworkService/**').post(validate, proxy);

    app.route('/mobileframeworkService/**').get(validate, proxy);

    // Set params if needed
    // app.param('Id', apiCtrl.func);
};
