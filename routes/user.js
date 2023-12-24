let express = require('express');
const passport = require('passport');
let router = express.Router();
let userController = require('../controllers/user');


router.get('/area_choice', passport.authenticate('google', {session: false}),userController.getUserData);

router.post('/area_choice', userController.postAreaChoice);

module.exports = router;