const Restaurants = require('../models/restaurantModel')

exports.getRecommend = (req, res) => {

    // TODO:Get data from MongoDB and transform data to specific format
    
}

exports.getAllRatings_Restaurant= async (req, res, next) => {
    try{
        const restaurantsRatings = await Restaurants.find();
        
        const intergratedComments = restaurantsRatings.map((restaurant) =>{
            return restaurant.comments.map((comment) => {
                return {
                    user: comment.user,
                    rating: comment.rating
                }
            })
        }).flat();
        
        res.json(intergratedComments);
    } 
    catch(err) {
        res.status(500).json({
                message: err.message
        })
    }
}

exports.getAllRatings_User = async (req, res, next) => {
    try{
        const userRatings = await Restaurants.find({'comments.user': '王'});

        console.log(userRatings)

        if(userRatings.length === 0){
            res.json({
                message: "Uesr has not rated any restaurant"
            })
            
            return;
        }

        const rating = userRatings.map((restaurant) => {
            return {
                restaurantName: restaurant.restName,
                userRating: restaurant.comments.find(comment => comment.user === 'guo').rating,
            };
        });

        res.send(rating);
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}


exports.testCreate = async (req, res, next) => {
    const todo = new Restaurants({
        restName: req.body.restName,
        comments: req.body.comments
    });

    try{
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    }
    catch(err){
        res.status(500).json({message: err.message});      
    }
}

exports.testFind = async (req, res, next) => {
    try{
        const todo = await Restaurants.find();
        if(todo == undefined){
            res.status(404).json({message: 'Not found'});
        }

        res.send(todo)
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.testUpdate = async (req, res, next) => {
    try{
        const todo = await Restaurants.findById(req.params.id);
        todo.userName= "guo";
        
        const newTodo = await todo.save();
        res.status(201).send(newTodo);
    }

    catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}