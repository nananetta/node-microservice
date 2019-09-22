import { PROXY_CONFIG } from '../../config/proxy';
import { log } from '../utils/error.utils';
import * as request from 'request-promise-native';

let config = require('../../config/config');

/**
 * SAMPLE FUNCTION - CAN BE REMOVED
 * @param req Request
 * @param res Response
 */
export const proxy = function(req, res) {
    log('info', `proxy:: ${req.method} ${req.path}`);

    const parts = req.path.split('/');
    const remainingDetails = req.path.replace(`/${parts[1]}/${parts[2]}/`, '');
    log('verbose', `parts: ${parts[2]} - ${remainingDetails}`);

    const url = `${PROXY_CONFIG[parts[2]]}/${remainingDetails}`;
    log('verbose', `url: ${url}`);

    let proxyUrl = '';
    if (config.proxy.enabled) {
        proxyUrl =
            'http://' +
            config.proxy.user +
            ':' +
            config.proxy.password +
            '@' +
            config.proxy.host +
            ':' +
            config.proxy.port;
    }
    log('verbose', `proxy: ${proxyUrl}`);

    if (req.method === 'GET') {
        const options = {
            uri: url,
            headers: {
                'Content-Type': 'application/json'
            },
            json: true,
            proxy: proxyUrl
        };

        request(options)
            .then(function(parsedBody) {
                res.status(200).jsonp(parsedBody);
            })
            .catch(function(err) {
                res.status(400).jsonp(err);
            });
    } else {
        const options = {
            method: req.method,
            uri: url,
            headers: {
                'Content-Type': 'application/json'
            },
            body: req.body !== undefined ? JSON.stringify(req.body) : undefined,
            proxy: proxyUrl
        };

        log('verbose', options);

        request(options)
            .then(function(parsedBody) {
                res.status(200).jsonp(JSON.parse(parsedBody));
            })
            .catch(function(err) {
                res.status(400).jsonp(err);
            });
    }
};
