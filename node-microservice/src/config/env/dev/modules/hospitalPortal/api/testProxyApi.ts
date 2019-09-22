'use strict';

module.exports = {
    name: 'testProxyApi',
    endpoint: '/proxy',
    type: 'proxy',
    module: 'hospitalPortal',
    validation: {},

    authentication: {},

    authorization: {},

    operation: {
        class: 'hospitalPortalProxyController'
    }
};
