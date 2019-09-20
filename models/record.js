var mongoose = require('mongoose')
var moment = require('moment')

var Schema = mongoose.Schema

var RecordSchema = new Schema(
	{
		date: {
			type: Date,
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
		},
		lat: {
			type: Number,
			default: 0
		},
		lng: {
			type: Number,
			default: 0
		},
		speed: {
			type: Number,
			default: 0
		}
	},
	{
		toObject: {
			virtuals: true
		},
		toJSON: {
			virtuals: true
		}
	}
)

//Export model
module.exports = mongoose.model('Record', RecordSchema)
