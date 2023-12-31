const passport = require('passport');

exports.getUserData = (req, res) => {
    res.send({
        status: true,
        data:{
            id: req.user.id,
            name: req.user.displayName,
            emails: req.user.emails[0].value,
            userdata: req.user
        }
    });

    // res.render('recommend',{
    //     data:{
    //         id: req.user.id,
    //         name: req.user.displayName,
    //         emails: req.user.emails[0].value
    //     }
    // })

    // TODO: render recommend data back to frontend
}

exports.postAreaChoice = (req, res) => {
    let data = {
        id: req.body.id,
        name: req.body.name,
        area: req.body.area
    }   
    res.json({
        data: data,
        message: 'success'
    }) 
    // TODO: send data to python crawler
}