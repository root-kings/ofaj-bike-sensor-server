const router = require('express').Router()

const recordController = require('./controllers/recordController')

router.post('/record/create', recordController.record_create_post)

module.exports = router

