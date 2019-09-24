'use strict';
/* eslint new-cap: ["error", { "capIsNew": false }] */

import axios from 'axios';
import { Router } from 'express';

const fs = require('fs');
import { getRuleName } from '../utils/mockrule.utils';

// import applicationConfig from '../../config/env/development';

// let config = require('./config/env/development');

/**
 * SAMPLE FUNCTION - CAN BE REMOVED
 * @param apiConfig Request
 */
export default function(moduleName, apiConfig) {
    const mockRouter = Router();
    // const state = apiConfig;
    console.log('Path  :', apiConfig.endpoint);
    console.log('Type  :', apiConfig.type);

    if (apiConfig.method === undefined) {
        console.log('http method is not defined in api config.');
        return mockRouter;
    }

    if (apiConfig.method.toLowerCase() === 'get') {
        /**
         * SAMPLE FUNCTION - CAN BE REMOVED
         * @param req Request
         * @param res Response
         */
        mockRouter.get(apiConfig.endpoint, function(req, res) {
            let mockRule = require('../../config/env/dev/modules/' +
                moduleName +
                '/api/' +
                apiConfig.name +
                '/rules');
            console.log(mockRule.name);
            // const rule = require('./env'apiConfig.endpoint + 'rules');
            let ruleName = getRuleName(mockRule, req);
            console.log('mock name: ' + ruleName);
            if (ruleName != undefined) {
                console.log('current directory: ', __dirname);
                let filePath = '/../../config/env/dev/modules/' + moduleName + '/api/' + ruleName + '/response.json';
                console.log('filePath: ', filePath);
                fs.readFile(__dirname + filePath, function(err, data) {
                    if (err) {
                        console.log('Read filePath error: ', err);
                        //   done({message:"Invalid response file: "+err}, null);
                    } else {
                        let response = JSON.parse(data);
                        return res.status(200).jsonp(response);
                    }
                });
            }
            return res.status(200).jsonp('mock data');
        });
    } else if (apiConfig.method.toLowerCase() === 'post') {
        /**
         * SAMPLE FUNCTION - CAN BE REMOVED
         * @param req Request
         * @param res Response
         */
        mockRouter.post(apiConfig.endpoint, function(req, res) {
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

    return mockRouter;

    // function responseFromHostSimulator(method, resource, path, headers, reqBody, done, context) {
    //     console.log("Prepare Response From HostSimulator : "+path);

    //     if(path !==  undefined) {
    //         var rulename = rulelist.findRules(path, reqBody);
    //         console.log("rule name: "+ rulename);

    //         if(rulename != undefined) {
    //             var filePath = rulename + "/response.json";
    //             var response = {};
    //             console.log('filePath: ', filePath);
    //             fs.readFile(filePath, function (err, data) {
    //                 if (err)  {
    //                   console.log('Read filePath error: ', err);
    //                   done({message:"Invalid response file: "+err}, null);

    //                 } else {
    //                     response = JSON.parse(data);
    //                     done(null, response);
    //                 }
    //             });
    //         }
    //         else {
    //             done(null, {});
    //         }
    //     }
    // }
}
