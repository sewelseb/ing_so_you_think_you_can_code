var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var router = express.Router();


//mongoose.connect('159.8.128.87', 'INGVector');
mongoose.connect('mongodb://username:9c92fbaa-ab9b-41ce-9327-364fd9d00115@159.8.128.87:10563/ingvestor');

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
