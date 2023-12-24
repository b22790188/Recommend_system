var express = require('express');
const passport = require('passport');
var router = express.Router();

/**
 * Google login
 */

router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile'],
}))

module.exports = router;