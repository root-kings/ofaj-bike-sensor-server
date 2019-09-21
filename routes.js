const router = require('express').Router()

router.get('/', (req, res) => {
  return res.render('index')
})

const recordController = require('./controllers/recordController')
const userController = require('./controllers/userController')
const vehicleController = require('./controllers/vehicleController')

router.get('/record/create', recordController.record_create_get)
router.get('/record/latest/:vehicle', recordController.record_latest_get)

router.post('/user/create', userController.user_create_post)
router.get('/users', userController.users_get)
router.post('/user/login', userController.user_login_post)

router.post('/vehicle/create', vehicleController.vehicle_create_post)

module.exports = router
