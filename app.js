// require modules
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const generateRandom = require('./models/generateRandom')
const Url = require('./models/url')

// mongodb connect
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/shorten-url', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// get app
const app = express()
const PORT = 3000
// set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
// set body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// set routes
// render index page
app.get('/', (req, res) => {
  res.render('index')
})

// variables
const randomItems = '12345678900ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopurstuvwxyz'
const amount = 5

// save new url & old url in DB
app.post('/', (req, res) => {
  const urlData = req.body
  checkUrl(urlData, amount, res)
})

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
  const count = randomItems.length ** amount
  Url.find()
    .lean()
    .then(url => {
      if ((Object.keys(url)).length >= count) {
        const error = true
        res.render('index', { error })
      } else {
        const random = generateRandom(amount, randomItems)
        checkRandom(random, amount, urlData, res)
      }
    })
}

// check this random is in DB or not 
function checkRandom(random, amount, urlData, res) {
  Url.findOne({ random: random })
    .lean()
    .then(item => {
      if (!item) {
        saveUrlAndRenderIndex(urlData, random, res)
      } else {
        checkRandom(generateRandom(amount, randomItems), amount, urlData, res)
      }
    })
}

// save the new url in DB and render on index page
function saveUrlAndRenderIndex(urlData, random, res) {
  urlData.random = random
  return Url.create(urlData)
    .then(() => res.render('index', { urlData }))
}

// use newurl to get into oldurl
app.get('/:random', (req, res) => {
  const random = req.params.random
  return Url.findOne({ random })
    .then(url => res.redirect(url.url))
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})


// "https://shorten-url.herokuapp.com/"

