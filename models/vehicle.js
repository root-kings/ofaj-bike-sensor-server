const mongoose = require('mongoose')

const Schema = mongoose.Schema

const VehicleSchema = new Schema(
	{
		model: {
			type: String,
			default: ''
		},
		make: {
			type: String,
			default: ''
        },
        owner: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
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

VehicleSchema.virtual('registration').get(() => {
	return this._id.toUpperCase()
})

//Export model
module.exports = mongoose.model('Vehicle', VehicleSchema)
