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


const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

// render index page
app.get('/', (req, res) => {
  res.render('index')
})

// storage newurl & oldurl
app.post('/', (req, res) => {
  const urlData = req.body
  Url.findOne({ url: urlData.url })
    .lean()
    .then(url => {
      if (!url) {
        urlData.random = generateRandom(5)
        Url.create(urlData)
        res.render('index', { urlData })
      } else {
        res.render('index', { url })
      }
    })
})

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

