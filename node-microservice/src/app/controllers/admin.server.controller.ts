'use strict';

// import * as express from 'express';
let express = require('express');

export = (() => {
    let router = new express.Router();

    router.get('/invoke', (req, res) => {
        res.json({ success: true });
    });

    return router;
})();
