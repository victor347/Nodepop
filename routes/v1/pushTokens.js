/**
 * Created by Victor on 08-May-16.
 */
'use strict';

let express = require('express');
let router = express.Router();
let PushToken = require('mongoose').model('PushToken');

router.post('/', function (req, res, next) {
    let pushToken = new PushToken(req.body);
    pushToken.save().then((saved)=> {
        res.status(201).json({success: true, pushToken: saved});
    }).catch((err)=> {

        if (err.code) {
            err.message = req.i18n.__(err.code.toString()+"token");
        } else {
            err.message = req.i18n.__(err.message);
        }
        err.status = 422;
        return next(err);
    });
});

// Exporting the router 
module.exports = router;