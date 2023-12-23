const testModel = require('../models/testModel')

exports.getRecommend = (req, res) => {

    // TODO:Get data from MongoDB and transform data to specific format
    
}

exports.testRead = async (req, res, next) => {
    try{
        const todo = await testModel.find();
        
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
    const todo = new testModel({
        thing: req.body.thing,
        isDone: req.body.isDone
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
        const todo = await testModel.find();
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
        const todo = await testModel.findById(req.params.id);
        todo.thing = "swimming";
        
        const newTodo = await todo.save();
        res.status(201).send(newTodo);
    }

    catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}