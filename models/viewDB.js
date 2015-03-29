var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var View = new Schema({
    projectIdView    	: String,
    projectNameView		: String,
    clientIdView		: String,
    updated_atView 	: Date
});
 
mongoose.model( 'View', View );