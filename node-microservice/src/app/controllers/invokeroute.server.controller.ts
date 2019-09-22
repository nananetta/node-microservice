'use strict';
/* eslint new-cap: ["error", { "capIsNew": false }] */

import { Router } from 'express';

const proxyRouter = Router();

/**
 * SAMPLE FUNCTION - CAN BE REMOVED
 * @param req Request
 * @param res Response
 */
console.log('loading ..');
proxyRouter.get('/invoke', function(req, res) {
    return res.status(200).jsonp({
        message: 'Invoke a method'
    });
});

export default proxyRouter;
