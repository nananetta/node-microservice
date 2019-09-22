'use strict';
/* eslint new-cap: ["error", { "capIsNew": false }] */

// let express = require('express');
// let router = new express.Router();
// import {express} = require('express');
// const router = new express.Router();
import { Router } from 'express';

// module.exports = function(router) {
// let router = express.Router();
const router = Router();

/**
 * SAMPLE FUNCTION - CAN BE REMOVED
 * @param req Request
 * @param res Response
 */
console.log('loading ..');
router.get('/invoke', function(req, res) {
    return res.status(200).jsonp({
        message: 'Invoke a method'
    });
});
// };

export default router;
