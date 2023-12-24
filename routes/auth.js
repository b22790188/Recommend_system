var express = require('express');
const passport = require('passport');
var router = express.Router();
const authController = require('../controllers/auth');

/**
 * Google login
 */

router.get('/', function(req, res, next){
    res.render('index', { title: 'Express'});    
});

router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile'],
}))

router.get('/google/callback', passport.authenticate('google',{session:false}), authController.getUserData);

module.exports = router;