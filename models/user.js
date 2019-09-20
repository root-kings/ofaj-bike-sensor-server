const mongoose = require('mongoose')
const Vehicle = require('./vehicle')

const Schema = mongoose.Schema

const UserSchema = new Schema(
	{
		name: {
			type: String
		},
		email: {
			type: String
		},
		password: {
			type: String
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

UserSchema.virtual('vehicles').get(async () => {
	return await Vehicle.find({ owner: this._id })
})

//Export model
module.exports = mongoose.model('User', UserSchema)
