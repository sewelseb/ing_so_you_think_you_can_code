var express = require('express');
var http = require('http');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('public/index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('public/register', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('public/login', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
	
	var options = {
	  port: 1131,
	  host: '159.8.142.102',
	  method: 'GET',
	  path: '/ibmlgeef/sb/ing/pdm/party/22'
	};

	var req = http.get(options, function(res) {
	  console.log('STATUS: ' + res.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(res.headers));

	  // Buffer the body entirely for processing as a whole.
	  var bodyChunks = [];
	  res.on('data', function(chunk) {
	    // You can process streamed parts here...
	    bodyChunks.push(chunk);
	  }).on('end', function() {
	    var body = Buffer.concat(bodyChunks);
	    console.log('BODY: ' + body);
	    // ...and/or process the entire body here.
	  })
	});

	req.on('error', function(e) {
	  console.log('ERROR: ' + e.message);
	});

	res.redirect('/');

});

router.get('/about', function(req, res, next) {
  res.render('public/about', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('public/contact', { title: 'Express' });
});
router.get('/demoboot', function(req, res, next) {
  res.render('public/demoboot', { title: 'Express' });
});

module.exports = router;
