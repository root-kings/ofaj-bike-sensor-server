const Record = require('../models/record')
const moment = require('moment')

exports.record_create_get = (req, res) => {
	let data = JSON.parse(
		req.query.data
			.split("'")
			.join('')
			.split(':,')
			.join(':0,')
	)

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

	let records = []

	data.forEach(state => {
		let record = new Record({
			date: moment(state.date + ' ' + state.time + state.timeflg, 'DD-MM-YYYY hh:mm:ssA'),
			fuel: state.fuel,
			vehicle: state.vehicle
		})

		records.push(record)

		// console.log(record)
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