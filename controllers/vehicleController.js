const Vehicle = require('../models/vehicle')

exports.vehicle_create_post = (req, res) => {
	let vehicle = new Vehicle({
		model: req.body.model,
		make: req.body.make,
		owner: req.body.owner,
		registration: req.body.registration.toUpperCase()
	})

	vehicle
		.save()
		.then(savedVehicle => {
			return res.send(savedVehicle)
		})
		.catch(err => {
			console.error(err)
			return res.status(500).send(err)
		})
}
