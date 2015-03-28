var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Startup = new Schema({
    name    	: String,
    managerId		: String,
    description		: String,
    updated_at 	: Date,
    isValid	: Boolean
});
 
mongoose.model( 'Startup', Startup );