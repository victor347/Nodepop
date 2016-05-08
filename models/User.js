/**
 * Created by Victor on 03-May-16.
 */
"use strict";

var mongoose = require('mongoose');

// Creamos el esquema para usuarios
var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique : true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Dirección de email no valida'] // Expresión regular que permite validar si es una dirección de email valida
    },
    name: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

userSchema.statics.list = function(email) {
    return new Promise((resolve, reject)=> {
        User.findOne(email).
        exec((err, advertisements)=>{
            if (err) {
                return reject(err);
            }
            return resolve(advertisements);
        });
    });
};

// lo asignamos al modelo
var User = mongoose.model('User', userSchema);