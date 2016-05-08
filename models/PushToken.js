/**
 * Created by Victor on 08-May-16.
 */
'use strict';

// Loading mongoose 
let mongoose = require('mongoose');

// Creamos el esquema para los pushToken
let pushTokenSchema = mongoose.Schema({
    platform: {
        type: String, 
        enum: ['ios', 'android'], 
        required: true
    },
    pushToken: {
        type: String, 
        required: true,
        unique : true
    },
    user: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Dirección de email no valida'] // Expresión regular que permite validar si es una dirección de email valida
    } 
});

// Asigmanos el esquema al modelo

mongoose.model('PushToken', pushTokenSchema);