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
router.get('/', function(req, res) {
    if (typeof req.query.name !== 'undefined') {
        var filtro = {};
        filtro.name = req.query.name;
    }
    console.log(filtro);

    Advertisement.list(filtro).then(function(advertisements) {
        console.log("Promesa resuelta",advertisements);
        res.json({success: true, advertisements: advertisements});
    }).catch(function(err) {
        res.json({success: false, error: err});
    });
});

router.post('/', function(req, res, next) {
    var agente = new Agente(req.body);

    var errors = agente.validateSync();
    if (errors) {
        console.log('errors', errors);
        next(new Error('Hubo errores de validacion'));
        return;
    }

    agente.save(function(err, saved) {
        if (err) {
            next(err);
            return;
        }
        res.json({ success: true, saved: saved });
    });
});

module.exports = router;
