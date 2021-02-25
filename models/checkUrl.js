const Url = require('./url')

// check this url in the DB or not
function checkUrl(urlData, amount, res) {
  Url.findOne({ url: urlData.url })
    .lean()
    .then(url => {
      if (!url) {
        checkUsableRandom(amount, urlData, res)
      } else {
        res.render('index', { url })
      }
    })
}

// check usable random > 0 or not
function checkUsableRandom(amount, urlData, res) {
  const randomItems = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const count = randomItems.length ** amount
  Url.find()
    .lean()
    .then(url => {
      if (url.length >= count) {
        const error = true
        res.render('index', { error })
      } else {
        const random = generateRandom(amount, randomItems)
        checkRandom(random, amount, urlData, res, randomItems)
      }
    })
}

// generate random
function generateRandom(amount, randomItems) {
  let random = ''
  for (let i = 0; i < amount; i++) {
    random += randomItems[Math.floor(Math.random() * randomItems.length)]
  }
  return random
}

// check this random is in DB or not 
function checkRandom(random, amount, urlData, res, randomItems) {
  Url.findOne({ random: random })
    .lean()
    .then(item => {
      if (!item) {
        saveUrlAndRenderIndex(urlData, random, res)
      } else {
        checkRandom(generateRandom(amount, randomItems), amount, urlData, res, randomItems)
      }
    })
}

// save the new url in DB and render on index page
function saveUrlAndRenderIndex(urlData, random, res) {
  urlData.random = random
  return Url.create(urlData)
    .then(() => res.render('index', { urlData }))
}

// export module
module.exports = checkUrl