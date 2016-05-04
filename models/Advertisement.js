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

advertisementSchema.statics.list = function(filter, sort) {
    return new Promise((resolve, reject)=> {
        var query = Advertisement.find(filter);
        query.sort(sort);

        query.exec((err, advertisements)=>{
            if (err) {
                console.log(err);
                return reject(err);
            }
            console.log(advertisements);
            return resolve(advertisements);
        });
    });
};

// lo asignamos al modelo
var Advertisement = mongoose.model('Advertisement', advertisementSchema);