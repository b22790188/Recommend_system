const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    restName: String,
    comments:[{
        user: String, 
        rating: Number
    }]
})

module.exports = mongoose.model('restaurants', restaurantSchema);