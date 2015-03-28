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

	var reqI = http.get(options, function(res2) {
	  console.log('STATUS: ' + res2.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(res.headers));

	  // Buffer the body entirely for processing as a whole.
	  var bodyChunks = [];
	  res2.on('data', function(chunk) {
	    // You can process streamed parts here...
	    bodyChunks.push(chunk);
	  }).on('end', function() {
	    var body = Buffer.concat(bodyChunks);
	    console.log('BODY: ' + body);
	    // ...and/or process the entire body here.
	    if(req.body.id < 10) {
			res.redirect('startup/dashboard');
		} else {
			res.redirect('client/dashboard');
		}
	  })
	});

	reqI.on('error', function(e) {
	  console.log('ERROR: ' + e.message);
	});
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
router.get('/manager/signin-in', function(req, res, next) {
  res.render('managerSignIn', { title: 'Express' });
});
router.get('/generateManager', function(req, res, next) {
  res.render('generateManager', { title: 'Express' });
});

module.exports = router;
