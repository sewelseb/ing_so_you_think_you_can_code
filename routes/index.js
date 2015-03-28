var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/demoboot', function(req, res, next) {
  res.render('demoboot', { title: 'Express' });
});

module.exports = router;
