const router = require('express').Router()

const recordController = require('./controllers/recordController')

router.get('/record/create', recordController.record_create_get)
router.get('/record/latest/:vehicle', recordController.record_latest_get)

module.exports = router

