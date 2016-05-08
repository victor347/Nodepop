/**
 * Created by Victor on 03-May-16.
 */
"use strict";

var mongoose = require('mongoose');

// Creamos el esquema para los anuncios
var advertisementSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    sale: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true,
        enum: ["work", "lifestyle", "motor", "mobile"]
    }
});

advertisementSchema.statics.list = function(filter) {
    return new Promise((resolve, reject)=> {        
        Advertisement.find(filter).
        exec((err, advertisements)=>{
            if (err) {                
                return reject(err);
            }            
            return resolve(advertisements);
        });
    });
};

advertisementSchema.statics.search = function(name, sale, tags, eq, lt, gt, start, limit, sort) {
    return new Promise((resolve, reject)=> {
        if(typeof name === "undefined"){
            var query = Advertisement.find();
        }
        else{
            var query = Advertisement.find({name: new RegExp('^'+name, "i")});
        }
        if(typeof sale !== "undefined"){
            query.where("sale").equals(sale);
        }
        if(typeof tags !== "undefined") {
            query.where('tags').in(tags);
        }
        if(typeof eq !== "undefined") {
            query.where('price').equals(eq);
        }
        if(typeof lt !== "undefined" && typeof gt !== "undefined") {
            query.where('price').gt(lt).lt(gt);
        }
        if(typeof lt !== "undefined" && typeof gt === "undefined") {
            query.where('price').lt(lt);
        }
        if(typeof lt === "undefined" && typeof gt !== "undefined") {
            query.where('price').gt(gt);
        }
        query.skip(start);
        query.limit(limit);
        query.sort(sort);
       
        query.exec((err, advertisements)=>{
            if (err) {
                return reject(err);
            }
            return resolve(advertisements);
        });
    });
};

// lo asignamos al modelo
var Advertisement = mongoose.model('Advertisement', advertisementSchema);