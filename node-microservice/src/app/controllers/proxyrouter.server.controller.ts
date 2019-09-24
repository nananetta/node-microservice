'use strict';
/* eslint new-cap: ["error", { "capIsNew": false }] */

import axios from 'axios';
import { Router } from 'express';
// import applicationConfig from '../../config/env/development';
// let config = require('./config/env/development');

/**
 * SAMPLE FUNCTION - CAN BE REMOVED
 * @param apiConfig Request
 */
export default function(apiConfig) {
    const proxyRouter = Router();
    // const state = apiConfig;
    console.log('Path  :', apiConfig.endpoint);
    console.log('Type  :', apiConfig.type);

    if (apiConfig.method === undefined) {
        console.log('http method is not defined in api config.');
        return proxyRouter;
    }

    if (apiConfig.method.toLowerCase() === 'get') {
        /**
         * SAMPLE FUNCTION - CAN BE REMOVED
         * @param req Request
         * @param res Response
         */
        proxyRouter.get(apiConfig.endpoint, function(req, res) {
            let target = apiConfig.target.host + apiConfig.target.path;
            let options = {
                url: target,
                method: apiConfig.target.method
                // proxy: applicationConfig.proxy
            };
            axios
                .request(options)
                .then(function(response) {
                    // console.log(response);
                    return res.status(200).jsonp(response.data);
                })
                .catch(function(error) {
                    // console.log(error);
                    return res.status(error.status).jsonp(error.data);
                });
        });
    } else if (apiConfig.method.toLowerCase() === 'post') {
        /**
         * SAMPLE FUNCTION - CAN BE REMOVED
         * @param req Request
         * @param res Response
         */
        proxyRouter.post(apiConfig.endpoint, function(req, res) {
            let target = apiConfig.target.host + apiConfig.target.path;
            axios
                .post(target)
                .then(function(response) {
                    // console.log(response);
                    return res.status(200).jsonp(response.data);
                })
                .catch(function(error) {
                    // console.log(error);
                    return res.status(error.status).jsonp(error.data);
                });
        });
    } else {
        console.log('No match http method with api config.');
    }

    return proxyRouter;
}
