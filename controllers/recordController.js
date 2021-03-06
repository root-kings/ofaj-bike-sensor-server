const Record = require('../models/record')
const Vehicle = require('../models/vehicle')
const moment = require('moment')

exports.record_create_get = async (req, res) => {
  let data = JSON.parse(
    req.query.data
      .split("'")
      .join('')
      .split(':,')
      .join(':0,')
      .split('date":0",')
      .join('date":0,')
  )
  console.log("formated:",data)
  console.log("orig:",req.query.data)

  /*
        let data = [
            {
                lat: 0,
                lng: 0,
                time: '02:47:21',
                timeflg: 'PM',
                date: '19-09-2019',
                speed: 0,
                fuel: 40,
                vehicle: 'MH36V6985'
            }
        ]
    */

  let vehicle = await Vehicle.findOne({
    registration: data[0].vehicle.toUpperCase()
  })

  let records = []

  data.forEach(state => {
    let record = new Record({
      date:
        state.date == 0 || state.date.split('-')[0]=='00'
          ? moment()
          : moment(
              state.date + ' ' + state.time + state.timeflg,
              'DD-MM-YYYY hh:mm:ssA'
            ),
      fuel: state.fuel,
      vehicle: vehicle._id,
      lat: state.lat,
      lng: state.lng,
      speed: state.speed
    })

    records.push(record)

    console.log(record)
  })

  Record.insertMany(records)
    .then(inserted => {
      return res.send({ insertedCount: inserted.length })
    })
    .catch(err => {
      console.error(err)
      return res.status(500).send(err)
    })
}

exports.record_latest_get = async (req, res) => {
  Record.find({ vehicle: req.params.vehicle })
    .sort({ date: -1 })
    .limit(1)
    .exec((err, record) => {
      if (err) {
        console.error(err)
        return res.status(500).send(err)
      }
      if (!record.length) return res.send({})
      return res.send(record[0])
    })
}
