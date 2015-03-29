
/*
 * GET home page.
 */
var mongoose = require( 'mongoose' );
var ObjectId = mongoose.Types.ObjectId; 
var User = mongoose.model( 'User' );
var Startup = mongoose.model( 'Startup' );
var Statistic = mongoose.model( 'Statistic' );
var utils = require( 'connect' ).utils;
var crypto = require('crypto');
var http = require('http');

exports.indexShow = function ( req, res, next ){
  if(req.session.type == "startup") res.redirect('/startup/dashboard');
  if(req.session.type == "client") res.redirect('/client/dashboard');
  res.render( 'index', {
      title : 'Home',
      req   : req,
  });
};

exports.registerShow = function ( req, res, next ){
  if(req.session.type == "startup") res.redirect('/startup/dashboard');
  if(req.session.type == "client") res.redirect('/client/dashboard');
    res.render( 'register', {
        title : 'Register',
        req   : req
    });
};

exports.registerAction = function ( req, res, next ){
  if(req.session.type == "startup") res.redirect('/startup/dashboard');
  if(req.session.type == "client") res.redirect('/client/dashboard');
  new User({
      mail        : req.body.mail,
      password    : crypto.createHmac('sha1', "bibinoulelapinou").update(req.body.password).digest('hex'),
      isAdmin     : 0,
      updated_at  : Date.now()
  }).save( function ( err, user, count ){
    if( err ) {
      res.render( 'register', {
        title : 'Register',
        req   : req,
        error : err
      });
    }
    else {
      res.render( 'register', {
        title : 'Register',
        req   : req,
        success : "Votre compte ("+req.body.mail+") vient d'être crée avec succès !"
      });
    }
  });
};

exports.loginShow = function (req, res, next) {
  if(req.session.type == "startup") res.redirect('/startup/dashboard');
  if(req.session.type == "client") res.redirect('/client/dashboard');
  res.render( 'login', {
        title : 'login',
        req   : req
    });
};

exports.loginAction = function (req, res, next) {
  if(req.session.type == "startup") res.redirect('/startup/dashboard');
  if(req.session.type == "client") res.redirect('/client/dashboard');
  User.
    findOne({mail: req.body.mail, password: crypto.createHmac('sha1', "bibinoulelapinou").update(req.body.password).digest('hex')}).
    sort( '-updated_at' ).
    exec( function ( err, user ){
      if( err ) return next( err );

      if ( user ) { 
        req.session.userId = user._id;
        req.session.type = "manager";
        if(user.isAdmin) req.session.userAdmin = 1;
        res.redirect('/dashboard');
      }
      else {
        res.redirect('/');
      }
    });
};

exports.signinShow = function (req, res, next) {
  if(req.session.type == "startup") res.redirect('/startup/dashboard');
  if(req.session.type == "client") res.redirect('/client/dashboard');
  res.render( 'signin', {
        title : 'signin',
        req   : req
    });
};

exports.signinAction = function (req, res, next) {
  if(req.session.type == "startup") res.redirect('/startup/dashboard');
  if(req.session.type == "client") res.redirect('/client/dashboard');
  var options = {
    port: 1131,
    host: '159.8.142.102',
    method: 'GET',
    path: '/ibmlgeef/sb/ing/pdm/party/'+req.body.identifiant
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
        console.log("startup");
        req.session.type = "startup";
        req.session.userId = user.customerId;
        req.session.name = user.name;
      res.redirect('startup/dashboard');
    } else {
      console.log("client");
      req.session.type = "client";
      res.redirect('client/dashboard');
    }
    })
  });
};

exports.logoutAction = function (req, res, next) {
  req.session.destroy();
  res.redirect('/');
}

exports.aboutShow = function (req, res, next) {
  res.render( 'about', {
        title : 'about',
        req   : req
    });
}

exports.contactShow = function (req, res, next) {
  res.render( 'contact', {
        title : 'contact',
        req   : req
    });
}









// a supprimer
exports.dashboardShow = function ( req, res, next ){
  if(!req.session.userId) res.redirect('/');
  if(req.session.type == "startup") res.redirect('/startup/dashboard');
  if(req.session.type == "client") res.redirect('/client/dashboard');
  Statistic.
    find({ 'userId': req.session.userId}).
    sort( '-updated_at' ).
    count().
    exec( function ( err, total ){
      if( err ) return next( err );
      Statistic.
        find({ 'userId': req.session.userId, 'result': "win"}).
        sort( '-updated_at' ).
        count().
        exec( function ( err, win ){
          if( err ) return next( err );

        res.render( 'dashboard', {
            title : 'Dashboard',
            req   : req,
            total : total,
            win   : win,
            loose : total - win
        });
      });
    });
};
exports.playShow = function ( req, res, next ){
  if(!req.session.userId) res.redirect('/');
    res.render( 'play', {
        title : 'Play',
        req   : req
    });
};
exports.playAction = function ( req, res, next ){
  new Statistic({
      result      : req.body.result,
      lilies      : req.body.lilies,
      time        : req.body.time,
      best        : req.body.best,
      userId      : req.session.userId,
      updated_at  : Date.now()
  }).save( function ( err, statistic, count ){
    if( err ) {
      res.redirect("/");
    }
    else {
      res.render( 'play', {
        title : 'play',
        req   : req,
      });
    }
  });
};
exports.userShow = function ( req, res, next ){
  if(!req.session.userId) res.redirect('/');
    User.
    find().
    sort( '-updated_at' ).
    exec( function ( err, users ){
      if( err ) return next( err );

      res.render( 'user', {
          title : 'Users',
          req   : req,
          users : users
      });
    });
};
exports.statShow = function ( req, res, next ){
  if(!req.session.userId) res.redirect('/');
  Statistic.
    find({ 'userId': req.session.userId}).
    sort( '-updated_at' ).
    exec( function ( err, stats ){
      if( err ) return next( err );

      res.render( 'statistic', {
          title : 'Statistics',
          req   : req,
          stats : stats
      });
    });
};



exports.startupShow = function ( req, res, next ){
  if(!req.session.userId) res.redirect('/');
  if(req.session.type == "client") res.redirect('/client/dashboard');
  Startup.
    find({ 'managerId': req.session.userId}).
    sort( '-updated_at' ).
    exec( function ( err, startups ){
      if( err ) return next( err );

      res.render( 'startup', {
          title : 'Startup',
          req   : req,
          startups : startups
      });
    });
};

exports.startupAction = function ( req, res, next ){
  //check reload liste project
  if(!req.session.userId) res.redirect('/');
  if(req.session.type == "client") res.redirect('/client/dashboard');
  new Startup({
      name        : req.body.name,
      managerId    : req.session.userId,
      description     : req.body.description,
      updated_at  : Date.now(),
      isValid   : true
  }).save( function ( err, user, count ){
    if( err ) {
      Startup.
      find({ 'managerId': req.session.userId}).
      sort( '-updated_at' ).
      exec( function ( err, startups ){
        if( err ) return next( err );

        res.render( 'startup', {
            title : 'Startup',
            req   : req,
            startups : startups
        });
      });
    }

    else {
      Startup.
      find({ 'managerId': req.session.userId}).
      sort( '-updated_at' ).
      exec( function ( err, startups ){
        if( err ) return next( err );

        res.render( 'startup', {
            title : 'Startup',
            req   : req,
            startups : startups,
            success: "success"
        });
      });
    }
  });
};

exports.clientShow = function ( req, res, next ){
  console.log("client");
};

exports.fundAction = function ( req, res, next ){
  //check reload liste project
  if(!req.session.userId) res.redirect('/');
  new Statistic({
      projectId        : req.body.startup,
      clientId    : req.session.userId,
      projectName : req.body.name,
      money     : req.body.money,
      updated_at  : Date.now(),
      sector   : req.body.sector
  }).save( function ( err, user, count ){
    console.log("stats");
    if( err ) {
      res.render( 'startup', {
        title : 'startup',
        req   : req,
        error : err
      });
    }
    else {
      res.render( 'startup', {
        title : 'startup',
        req   : req,
        success : "Votre startup vient d'être crée avec succès !"
      });
    }
  });
};

exports.projectShow = function ( req, res, next ){
  if(!req.session.userId) res.redirect('/');
  Startup.
    findOne({ '_id': mongoose.Types.ObjectId(req.params.id)}).
    exec( function ( err, startup ){
      if( err ) return next( err );

      console.log(startup);
      res.render( 'project', {
          title : 'project',
          req   : req,
          startup : startup
      });
    });
};

exports.investShow = function ( req, res, next ){
  if(!req.session.userId) res.redirect('/');
  Startup.
    findOne({ '_id': mongoose.Types.ObjectId(req.params.id)}).
    exec( function ( err, startup ){
      if( err ) return next( err );

      console.log(startup);
      res.render( 'project', {
          title : 'project',
          req   : req,
          startup : startup
      });
    });
};



// API
exports.usersShow = function ( req, res, next ){
    User.
    find().
    sort( '-updated_at' ).
    exec( function ( err, users ){
      if( err ) return next( err );

      res.json(users);
    });
};