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


/**
 * Test route
 */
router.get('/test', usersController.testRead);

router.post('/test', usersController.testCreate);

router.get('/test/:id', usersController.testFind);

router.patch('/test/:id', usersController.testUpdate)

module.exports = router;
