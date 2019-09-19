var mongoose = require('mongoose')
var moment = require('moment')

var Schema = mongoose.Schema

var RecordSchema = new Schema({
	date: {
		type: String,
		//required: true,
		default: ''
	},
	fuel: {
		type: Number,
		min: 0,
		max: 100,
		default: 0
	},
	vehicle: {
		type: String,
		default: ''
	}
})

//Export model
module.exports = mongoose.model('Record', RecordSchema)
