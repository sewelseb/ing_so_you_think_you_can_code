var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/dashboard', function(req, res, next) {

  res.render('startup/dashboard', { session: req.session});
});

router.post('/new', function(req, res, next) {
	console.log("get new info");
  res.render('startup/dashboard', { session: req.session});
});

module.exports = router;
