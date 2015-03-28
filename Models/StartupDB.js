var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Startup = new Schema({
    name    	: { type: String, index: { unique : true}},
    managerId	: String,
    description		: String,
    updated_at 	: Date,
});
 
mongoose.model( 'Startup', Startup );
 
mongoose.connect( 'localhost','ING' );