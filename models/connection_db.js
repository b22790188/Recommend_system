const mongoose = require('mongoose')
const config = require('../config/config')

let DATABASE_URI = config.DataBaseURI;

mongoose.connect(DATABASE_URI)
const connection = mongoose.connection

/**
 * connection error handler
 */
connection.on('err', (err) => {
    console.log("connection error",err);
})

/**
 * connection success handler
 */
connection.once('open', () => {
    console.log('connected to database');
})

module.exports = connection