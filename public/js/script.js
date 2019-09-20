let opts = {
	angle: 0.15, // The span of the gauge arc
	lineWidth: 0.44, // The line thickness
	radiusScale: 1, // Relative radius
	pointer: {
		length: 0.6, // // Relative to gauge radius
		strokeWidth: 0.035, // The thickness
		color: '#000000' // Fill color
	},
	limitMax: true, // If false, max value increases automatically if value > maxValue
	limitMin: true, // If true, the min value of the gauge will be fixed
	colorStart: '#6FADCF', // Colors
	colorStop: '#8FC0DA', // just experiment with them
	strokeColor: '#E0E0E0', // to see which ones work best for you
	generateGradient: true,
	highDpiSupport: true // High resolution support
}
let fueltarget = document.getElementById('fuelguage') // your canvas element
let fuelgauge = new Gauge(fueltarget).setOptions(opts) // create sexy gauge!
fuelgauge.maxValue = 100 // set max gauge value
fuelgauge.setMinValue(0) // Prefer setter over gauge.minValue = 0
fuelgauge.animationSpeed = 32 // set animation speed (32 is default value)
fuelgauge.set(0) // set actual value

let speedtarget = document.getElementById('speedguage') // your canvas element
let speedgauge = new Gauge(speedtarget).setOptions(opts) // create sexy gauge!
speedgauge.maxValue = 240 // set max gauge value
speedgauge.setMinValue(0) // Prefer setter over gauge.minValue = 0
speedgauge.animationSpeed = 32 // set animation speed (32 is default value)
speedgauge.set(0) // set actual value

var mymap = L.map('trackermap').setView([21.125509, 79.022119], 13)

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1Ijoia3J1c2huZGF5c2htb29raCIsImEiOiJjazBxaXloanowMjd0M2Jtc3dobTN0azV6In0.fxd0j10H7zXSH0aE3APu2g'
}).addTo(mymap)

var marker = L.marker([21.125509, 79.022119]).addTo(mymap)

function updateData() {
	fetch('/record/latest/MH36V6985')
		.then(response => response.json())
		.then(record => {
			if (record.lat && record.lng) {
				marker.setLatLng([record.lat, record.lng])
				mymap.setView([record.lat, record.lng], 13)
			}
			fuelgauge.set(record.fuel || 0)
			speedgauge.set(record.speed || 0)
		})
}

setInterval(updateData, 2000)
