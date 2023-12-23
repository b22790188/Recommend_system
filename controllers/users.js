const Restaurants = require('../models/restaurantModel')

exports.getRecommend = (req, res) => {

    // TODO:Get data from MongoDB and transform data to specific format
    
}

exports.testRead = async (req, res, next) => {
    try{
        const todo = await Restaurants.find();
        
        res.json(todo);
    } 
    catch(err) {
        res.status(500).json(
            {
                message: err.message
            }
        )
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