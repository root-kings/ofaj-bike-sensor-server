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
    .then(vehicle => {
      return res.send({ status: true, savedVehicle: vehicle })
    })
    .catch(err => {
      console.error(err)
      return res.status(500).send(err)
    })
}

exports.vehicle_get = (req, res) => {
  Vehicle.findById(req.params.id)
    .then(vehicle => {
      return res.send({ status: true, vehicle })
    })
    .catch(err => {
      console.error(err)
      return res.status(500).send(err)
    })
}
