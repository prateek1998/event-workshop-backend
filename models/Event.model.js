'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * EventSchema
 */
var EventSchema = new Schema({
    event_id:{
        type: Schema.ObjectId,
    },
    title: {
        type: String,
        trim: true, 
        minlenght: 3, 
        maxlength: 100, 
        required: true 
    },
    link: {
        type: String, 
        required: true
    },
    start_date: {
        type: Date,
        default: Date.now
    },
    end_date: {
        type: Date,
        default: Date.now
    },
    description:{
        type: String, 
        required: true
    },
    resources:{
        type: String, 
    },
    joining_resources:{
        type: String, 
    },
    user: [{
        username: {
            type: String, 
        },
        roles: {
            type: [{
                type: String,
                enum: ['speaker', 'moderator']
                }],
            default: ['speaker'],
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
    }],
    organizer: [{
        type: String, 
        maxlength: 30
    }],
    tags: [{
        type: String, 
        maxlength: 30
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Event', EventSchema);
