var express = require('express');
<<<<<<< HEAD
var mongo = require('mongodb');
=======
<<<<<<< HEAD
var mongo = require('mongodb');

var router = express.Router();

=======
//var mongo = require('mongodb');
>>>>>>> e15935db879740c3ba58f6dde293e159a1740e08
//var mongoose = require('mongoose');

var router = express.Router();


//mongoose.connect('159.8.128.87', 'INGVector');
//mongoose.connect('mongodb://username:9c92fbaa-ab9b-41ce-9327-364fd9d00115@159.8.128.87:10563/ingvestor');
//db.on('error', console.log('connection error'));


>>>>>>> 3f554175b51b4ef10f6b7fa6874dd92b0e359aca
router.post('/', function(req, res, next) {
  // var db = mongoose.connection;
  
  // console.log(req.post.lastname+" "+req.post.firstname);
  // var manager= mongoose.Schema({
  // 				lastname: req.post.lastname, 
  // 				firtsname: req.post.firstname
  // 			});
			
  // console.log('test');
  res.end('register');
});

module.exports = router;
