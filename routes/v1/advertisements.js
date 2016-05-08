/**
 * Created by Victor on 04-May-16.
 */
"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Advertisement = mongoose.model('Advertisement');

// Autenticación 
var jwtAuth = require('jwtAuth');
router.use(jwtAuth());

router.get('/tags', (req, res)=> {
    var tags = Advertisement.schema.path('tags').options.enum;
        res.json({success: true, tags: tags});
});

router.get('/search', (req, res)=> {
    var name = req.query.name;
    var sale = req.query.sale;
    var tag = req.query.tag;
    var price = req.query.price;
    var lt;
    var gt;
    var eq;
    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || null;
    var sort = req.query.sort || null;

    if (typeof tag === "string") {
        tag = [tag];
    }

    if (typeof price !== "undefined") {
        var posicion = price.lastIndexOf('-');
        if (posicion === 0) {
            lt = parseInt(price.substring(1));
        } else if (posicion > 0 && posicion < price.length - 1) {
            var bt = price.split("-");
            lt = bt[0];
            gt = bt[1];
        } else if (posicion > 0) {
            gt = parseInt(price.substring(0, price.length - 1));
        } else if (posicion < 0) {
            eq = parseInt(price);
        }
    }

    Advertisement.search(name, sale, tag, eq, lt, gt, start, limit, sort).then((advertisements)=> {
        res.json({success: true, advertisements: advertisements});
    }).catch((err)=> {
        return next(err);
    });
});

router.get('/(:advertisement)?', (req, res)=> {
    if (typeof req.params.advertisement !== 'undefined') {
        var filtro = {};
        filtro.name = req.params.advertisement;
    }
    Advertisement.list(filtro).then((advertisements)=> {
        res.json({success: true, advertisements: advertisements});
    }).catch((err)=> {
        return next(err);
    });
});

module.exports = router;
