/**
 * Created by Victor on 07-May-16.
 */
"use strict";

var jwt = require('jsonwebtoken');
var config = require('../../local_config');
var crypto = require("crypto");
var express = require('express');
var User = require('mongoose').model('User');

var router = express.Router();

router.post('/authenticate', (req, res, next)=> {
    var user = {};
    user.email = req.body.email;
    var err;
    User.findOne(user).exec().then((result)=> {
        if (!result) {
            err = new Error(req.i18n.__('Aut fail'));
            err.status = 401;
            return next(err);
        }

        crypto.pbkdf2(req.body.pass, result.salt, config.pbkdf2.iterations, config.pbkdf2.hashBytes, config.pbkdf2.digest, (err, hash)=> {
            if (err) {
                return next(err);
            }

            if (result.pass === hash.toString("hex")) {
                var token = jwt.sign({id: result._id}, config.jwt.secret, {
                    expiresIn: '2 days'
                });

                res.json({success: true, token: token});
            }
            else {
                err = new Error(req.i18n.__('Aut fail'));
                err.status = 401;
                return next(err);
            }

        });
    }).catch((err) => {
        return next(err);
    });
});

router.post('/', (req, res, next)=> {

    if (!req.body.pass) {
        var err = new Error(req.i18n.__('User validation failed'));
        err.status = 422;
        return next(err);
    }

    crypto.randomBytes(config.pbkdf2.saltBytes, (err, salt)=> {
        var user = new User(req.body);

        if (err) {
           return next(err);
        }

        salt = new Buffer(salt).toString('hex');
        user.salt = salt;
        crypto.pbkdf2(req.body.pass, salt, config.pbkdf2.iterations, config.pbkdf2.hashBytes, config.pbkdf2.digest, (err, hash)=> {
            if (err) {
               return next(err);
            }
            user.pass = hash.toString("hex");
            user.save().then((saved)=> {
                res.status(201).json({success: true, user: saved});
            }).catch((err)=> {

                if (err.code) {
                    err.message = req.i18n.__(err.code.toString());
                } else {
                    err.message = req.i18n.__(err.message);
                }
                err.status = 422;
                return next(err);
            });
        });
    });
});

module.exports = router;