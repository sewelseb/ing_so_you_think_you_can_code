var express = require('express');
var mongoose = require( 'mongoose' );
var ObjectId = mongoose.Types.ObjectId; 
var Startup = mongoose.model( 'Startup' );
var utils = require( 'connect' ).utils;
var crypto = require('crypto');
var router = express.Router();

/* GET users listing. */
router.get('/dashboard', function(req, res, next) {

  res.render('startup/dashboard', { session: req.session});
});

router.post('/new', function(req, res, next) {
	new Startup({
      name        : "name",
      managerId    : req.session.id,
      description     : "ceci est tout pleins de texte random",
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
        success : "Votre compte  vient d'être crée avec succès !"
      });
    }
  });

  res.render('startup/dashboard', { session: req.session});
});

module.exports = router;
