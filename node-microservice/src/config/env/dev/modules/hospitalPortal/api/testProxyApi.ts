'use strict';

module.exports = {
    name: 'testProxyApi',
    endpoint: '/proxy',
    method: 'GET',
    type: 'proxy',
    validation: {},
    authentication: {},
    authorization: {},
    target: {
        host: 'https://reqres.in',
        path: '/api/users/3',
        method: 'GET'
    },
    requestInterceptor: {},
    responseInterceptor: {}
};
