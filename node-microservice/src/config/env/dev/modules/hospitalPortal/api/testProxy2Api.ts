'use strict';

module.exports = {
    name: 'testProxy2Api',
    endpoint: '/proxy2',
    method: 'GET',
    type: 'proxy',
    validation: {},
    authentication: {},
    authorization: {},
    target: {
        host: 'https://reqres.in',
        path: '/api/users/2',
        method: 'GET'
    },
    requestInterceptor: {},
    responseInterceptor: {}
};
