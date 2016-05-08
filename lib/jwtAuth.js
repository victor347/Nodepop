'use strict';

/**
 * Your utility library for express
 */

var jwt = require('jsonwebtoken');
var configJWT = require('../local_config').jwt;

/**
 * JWT auth middleware for use with Express 4.x.
 *
 * @example
 * app.use('/api-requiring-auth', jwtAuth());
 *
 * @returns {function} Express 4 middleware
 */
module.exports = function() {

    return function(req, res, next) {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, configJWT.secret, function(err, decoded) {
                if (err) {
                    err = new Error(req.i18n.__('Bad token'));
                    err.status = 401;
                    return next(err);
               //     return res.json({ ok: false, error: {code: 401, message: 'Failed to authenticate token.'}});
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {
            
            // if there is no token return error
            var err = new Error(req.i18n.__('No token provided'));
            err.status = 401;
            return next(err);
          /*  return res.status(403).json({
                ok: false,
                error: { code: 403, message: 'No token provided.'}
            });*/

        }
    };
};
