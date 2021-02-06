// require express router
const express = require('express')
const router = express.Router()

// require module
const home = require('./modules/home')

// set route
router.use('/', home)

// export module
module.exports = router