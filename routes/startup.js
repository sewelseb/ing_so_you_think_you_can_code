var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/dashboard', function(req, res, next) {
	console.log("name user" + req.session.name);
  res.render('startup/dashboard', { title: 'Express' });
});
module.exports = router;
