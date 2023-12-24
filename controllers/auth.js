const passport = require('passport');

exports.getUserData = (req, res) => {
    // res.send({
    //     status: true,
    //     data:{
    //         id: req.user.id,
    //         name: req.user.displayName,
    //         emails: req.user.emails[0].value
    //     }
    // });
    res.render('recommend',{
        data:{
            id: req.user.id,
            name: req.user.displayName,
            emails: req.user.emails[0].value
        }
    })
}

