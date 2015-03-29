
/**
 * Module dependencies.
 */

var express = require('express')
  , userDB = require('./models/userDB')
  , statisticDB = require('./models/statisticDB')
  , startupDB = require('./models/startupDB')
  , statisticDB = require('./models/statisticDB')
  , viewDB = require('./models/viewDB')
  , routes = require('./routes')
  , http = require('http')
  , swig = require('swig')
  , path = require('path');

var app = express();

// swig configuration
swig._cache = {};
swig.express3 = function (path, options, fn) {
  swig._read(path, options, function (err, str) {
    if (err) {
      return fn(err);
    }
    try {
      options.filename = path;
      var tmpl = swig.compile(str, options);
      fn(null, tmpl(options));
    } catch (error) {
      fn(error);
    }
  });
};

swig._read = function (path, options, fn) {
  var str = swig._cache[path];

  // cached (only if cached is a string and not a compiled template function)
  if (options.cache && str && typeof str === 'string') {
    return fn(null, str);
  }

  // read
  require('fs').readFile(path, 'utf8', function (err, str) {
    if (err) {
      return fn(err);
    }
    if (options.cache) {
      swig._cache[path] = str;
    }
    fn(null, str);
  });
};

swig.init({
  root: __dirname + '/views',
  allowErrors: true
});



// all environments
app.engine('html', swig.express3);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view options', { layout: false });
app.set('view cache', false);


var env;
var host;
var port=3000;
if (process.env.hasOwnProperty("VCAP_SERVICES")) {
  // Running on Bluemix. Parse out the port and host that we've been assigned.
   env = JSON.parse(process.env.VCAP_SERVICES);
   host = process.env.VCAP_APP_HOST;
   port = process.env.VCAP_APP_PORT;


  // Also parse out Cloudant settings.
  //cloudant = env['cloudantNoSQLDB'][0].credentials;
}

host = (process.env.VCAP_APP_HOST || 'localhost');

app.set('port', process.env.VCAP_APP_PORT || port);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.indexShow);
app.get('/register', routes.registerShow);
app.post('/register', routes.registerAction);
app.get('/login', routes.loginShow); //manager
app.post('/login', routes.loginAction); //manager
app.get('/logout', routes.logoutAction); //logout manager & client
app.get('/signin', routes.signinShow); //client
app.post('/signin', routes.signinAction); //client
app.get('/about', routes.aboutShow);
app.get('/contact', routes.contactShow);


app.get('/dashboard', routes.dashboardShow);
app.get('/play', routes.playShow);
app.post('/play', routes.playAction);
app.get('/user', routes.userShow);
app.get('/statistic', routes.statShow);

app.get('/users', routes.usersShow);

// access as a logged
app.get('/startup/dashboard', routes.startupShow);
app.post('/startup/dashboard', routes.startupAction);
app.get('/client/dashboard', routes.clientShow);
app.post('/startup/invest-on', routes.fundAction);
app.get('/project/:id', routes.projectShow);
app.get('/project/:id/invest', routes.investShow);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
