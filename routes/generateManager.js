var express = require('express');
var router = express.Router();

/* GET INGManager homepage page. */
router.get('/', function(req, res, next) {
  res.render('generateManager', { title: 'Express' });
});

module.exports = router;