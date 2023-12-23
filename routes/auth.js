var express = require('express');
const passport = require('passport');
var router = express.Router();

/**
 * Google login
 */

router.get('/', function(req, res, next){
    res.render('index', { title: 'Express'});    
});

router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile'],
}))

router.get('/google/callback', passport.authenticate('google', {session:false}), (req, res) => {
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
})

module.exports = router;