'use strict';

module.exports = {
    name: 'testStandardApi',
    endpoint: '/std',
    type: 'standard',
    module: 'hospitalPortal',
    validation: {},

    authentication: {},

    authorization: {},

    operation: {
        class: 'hospitalPortalStandardController'
    }
};
