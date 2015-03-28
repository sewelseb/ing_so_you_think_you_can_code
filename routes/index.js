var express = require('express');
var http = require('http');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('public/index', { session: req.session});
});

router.get('/register', function(req, res, next) {
  res.render('public/register', { session: req.session});
});

router.get('/login', function(req, res, next) {
  res.render('public/login', { session: req.session});
});

router.post('/login', function(req, res, next) {
	
	var options = {
	  port: 1131,
	  host: '159.8.142.102',
	  method: 'GET',
	  path: '/ibmlgeef/sb/ing/pdm/party/'+req.body.id
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
	    var user = JSON.parse(body);
	
	    // ...and/or process the entire body here.
	    if(user.customerId < 10) {
	    	req.session.id = user.customerId;
	    	req.session.name = user.name;
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
  res.render('public/about', { session: req.session});
});

router.get('/contact', function(req, res, next) {
  res.render('public/contact', { session: req.session});
});
router.get('/demoboot', function(req, res, next) {
  res.render('public/demoboot', { session: req.session});
});
router.get('/manager/signin-in', function(req, res, next) {
  res.render('managerSignIn', { session: req.session});
});

router.get('/generateManager', function(req, res, next) {
  res.render('generateManager', { session: req.session});
});

router.get('/logout', function(req, res, next) {
	req.session.destroy;
	console.log("destroy");
  	res.redirect('/');
});


module.exports = router;
