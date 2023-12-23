const mongoose = require('mongoose')
const connection = require('./connection_db');

const dataSchema = new mongoose.Schema({
    thing:{
        type:String,
        required:true
    },
    isDone:{
        type:Boolean,
        default:false,
        required:true
    },
    createdDate:{
        type: Date,
        default: Date.now,
        required: true
    }
} 
)

module.exports = mongoose.model('data', dataSchema)