let express = require('express');
const passport = require('passport');
let router = express.Router();
let userController = require('../controllers/user');

router.get('/', passport.authenticate('google', {session: false}),userController.getUserData);
module.exports = router;