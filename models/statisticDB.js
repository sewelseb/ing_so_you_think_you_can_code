var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Statistic = new Schema({
    projectId    	: String,
    projectName		: String,
    clientId		: String,
    money		: String,
    updated_at 	: Date,
    sector: String
});
 
mongoose.model( 'Statistic', Statistic );