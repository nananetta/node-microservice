/**
 * SAMPLE FUNCTION - CAN BE REMOVED
 * @param req Request
 * @param res Response
 */
export const invoke = function(req, res) {
    return res.status(200).jsonp({
        message: 'Invoke a method'
    });
};
