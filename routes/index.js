// require express router
const express = require('express')
const router = express.Router()

// require module
const home = require('./modules/home')
const random = require('./modules/random')

// set route
router.use('/', home)
router.use('/', random)

// export module
module.exports = router