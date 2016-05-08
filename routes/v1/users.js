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

router.post('/authenticate', function (req, res, next) {
    var user = {};
    user.email = req.body.email;
    var err;

    User.findOne(user).exec().then((result)=> {
        if (!result) {
            err = new Error('Authentication failed. Invalid Email/Password combination.');
            err.status = 401;
            return next(err);
        }

        crypto.pbkdf2(req.body.pass, result.salt, config.pbkdf2.iterations, config.pbkdf2.hashBytes, config.pbkdf2.digest, (err, hash)=> {
            if (err) {
                return next(err);
            }

            if(result.pass === hash.toString("hex")){
                var token = jwt.sign({id: result._id}, config.jwt.secret, {
                    expiresIn: '2 days'
                });

                res.json({success: true, token: token});
            }
            else{
                err = new Error('Authentication failed. Invalid Email/Password combination.');
                err.status = 401;
                return next(err);
            }

        });



    }).catch((err) =>{
        return next(err);
    });
});

router.post('/', function (req, res, next) {


    crypto.randomBytes(config.pbkdf2.saltBytes, (err, salt)=> {
        var user = new User(req.body);

        if (err) {
            next(err);
        }

        salt = new Buffer(salt).toString('hex');
        user.salt = salt;
        crypto.pbkdf2(req.body.pass, salt, config.pbkdf2.iterations, config.pbkdf2.hashBytes, config.pbkdf2.digest, (err, hash)=> {
                if (err) {
                    next(err);
                }
                user.pass = hash.toString("hex");
                user.save().then(function (saved) {
                    res.status(201).json({success: true, user: saved});
                }).catch(function (err) {
                    next(err);
                });
            });


    });


});

module.exports = router;