// require express router
const express = require('express')
const router = express.Router()

// require Url
const Url = require('../../models/url')

// use new url to get into old url
router.get('/:random', (req, res) => {
  const random = req.params.random
  return Url.findOne({ random })
    .then(url => res.redirect(url.url))
})

// export module
module.exports = router