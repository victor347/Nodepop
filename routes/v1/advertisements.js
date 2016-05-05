/**
 * Created by Victor on 04-May-16.
 */
"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Advertisement = mongoose.model('Advertisement');

// Autenticación 
//var jwtAuth = require('../../../lib/jwtAuth');
//router.use(jwtAuth());
/*
router.get('/', function(req, res, next) {
    var name = req.query.name;
    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || null;
    var sort = req.query.sort || null;

    var criteria = {};

    if (typeof name !== 'undefined') {
        criteria.name = name;
    }

    Agente.list(criteria, start, limit, sort, function(err, rows) {
        if (err) {
            return res.json({success: false, error: err});
        }
        res.json({success: true, rows: rows});
    });

});
*/

router.get('/search', function(req, res) {

    var name = req.query.name;
    var sale = req.query.sale;
    var tag = req.query.tag;
    var tags = new Array();
    var price = req.query.price;
    var lt;
    var gt;
    var eq;

    if(typeof tag === "string"){
        tags[0]=tag;
    }else{
        tags=tag;
    }

    var posicion = price.lastIndexOf('-');
    if(posicion===0){
        lt = parseInt(price.substring(1));
    }else if(posicion > 0 && posicion < price.length-1){
        var bt = price.split("-");
        lt=bt[0];
        gt=bt[1];
    }else if(posicion > 0){
        gt = parseInt(price.substring(0, price.length-1));
    }else if(posicion < 0)
    {
        eq = parseInt(price);
    }

    Advertisement.search(name, sale, tags, eq, lt, gt).then(function(advertisements) {
        res.json({success: true, advertisements: advertisements});
    }).catch(function(err) {
        res.json({success: false, error: err});
    });
});

router.get('/(:advertisement)?', function(req, res) {
    console.log("vieja");
    if (typeof req.params.advertisement !== 'undefined') {
        var filtro = {};
        filtro.name = req.params.advertisement;
    }
    Advertisement.list(filtro).then(function(advertisements) {
        res.json({success: true, advertisements: advertisements});
    }).catch(function(err) {
        res.json({success: false, error: err});
    });
});



module.exports = router;
