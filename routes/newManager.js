var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('localhost', 'INGVector');
var router = express.Router();



router.post('/', function(req, res, next) {
  var db = mongoose.connection;
  //db.on('error', console.log('connection error'));
  var manager= {lastname: req.post.lastname, firtsname: req.post.firstname};
			collection.insert(manager, function(err, records){
			  console.log("Record added as "+records[0]._id);
			});
  console.log('test');
  res.end('register');
});

module.exports = router;
