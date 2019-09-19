var mongoose = require('mongoose')

var Schema = mongoose.Schema

var UserSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
	vehicles: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'Vehicle'
		}
	]
})

//Export model
module.exports = mongoose.model('User', UserSchema)
