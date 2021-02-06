'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * UserSchema
 */
var UserSchema = new Schema({
    username: {
        type: String, 
    },
    roles: {
        type: [{
            type: String,
            enum: ['speaker', 'moderator', 'user']
            }],
        default: ['user'],
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    avatar: {
        type: String, 
        default: '/images/avatar.png'
    },
    info: {
        type: String, 
        trim: true, 
        maxlength: 100
    },
})

module.exports = mongoose.model('User', UserSchema);
