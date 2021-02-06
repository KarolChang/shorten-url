// require express router
const express = require('express')
const router = express.Router()

// require modules
const checkUrl = require('../../models/checkUrl')

// set routes
// render index page
router.get('/', (req, res) => {
  res.render('index')
})

// save new url & old url in DB
router.post('/', (req, res) => {
  const urlData = req.body
  const amount = 5
  checkUrl(urlData, amount, res)
})

// use new url to get into old url
router.get('/:random', (req, res) => {
  const random = req.params.random
  return Url.findOne({ random })
    .then(url => res.redirect(url.url))
})

// export module
module.exports = router