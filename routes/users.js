var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('recommend');
});

/**
 * Get recommended store
 */
router.get('/recommend', usersController.getRecommend);


router.get('/allRating_Restaurant', usersController.getAllRatings_Restaurant);

router.get('/allRating_User', usersController.getAllRatings_User);

router.post('/test', usersController.testCreate);

router.get('/test/:id', usersController.testFind);

router.patch('/test/:id', usersController.testUpdate)

module.exports = router;
