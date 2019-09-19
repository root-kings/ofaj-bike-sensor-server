const router = require('express').Router()

const recordController = require('./controllers/recordController')

router.get('/record/create', recordController.record_create_get)

module.exports = router

