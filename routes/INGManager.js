var express = require('express');
var router = express.Router();

/* GET INGManager homepage page. */
router.get('/', function(req, res, next) {
  res.render('INGManager', { title: 'Express' });
});

router.get('/demoboot', function(req, res, next) {
  res.render('demoboot', { title: 'Express' });
});

module.exports = router;
