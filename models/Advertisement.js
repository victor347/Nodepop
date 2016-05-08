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
    console.log("search");
    return new Promise((resolve, reject)=> {

        console.log(name);
        if(typeof name === "undefined"){
            console.log("find");
            var query = Advertisement.find();
        }
        else{
            console.log("findOne");
            var query = Advertisement.find({name: new RegExp('^'+name, "i")});
        }
        if(typeof sale !== "undefined"){
            console.log("sale");
            query.where("sale").equals(sale);
        }
        if(typeof tags !== "undefined") {
            console.log("tags ", tags);
            query.where('tags').in(tags);
        }
        if(typeof eq !== "undefined") {
            console.log("eq");
            query.where('price').equals(eq);
        }
        if(typeof lt !== "undefined" && typeof gt !== "undefined") {
            console.log("bt");
            query.where('price').gt(lt).lt(gt);
        }
        if(typeof lt !== "undefined" && typeof gt === "undefined") {
            console.log("lt");
            query.where('price').lt(lt);
        }
        if(typeof lt === "undefined" && typeof gt !== "undefined") {
            console.log("gt");
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