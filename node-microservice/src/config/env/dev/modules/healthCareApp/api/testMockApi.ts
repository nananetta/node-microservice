'use strict';

module.exports = {
    name: 'testMockApi',
    endpoint: '/mock',
    type: 'mock',
    module: 'hospitalPortal',
    validation: {},

    authentication: {},

    authorization: {},

    operation: {
        class: 'hospitalPortalMockController'
    }
};
