// require modules
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Url = require('./models/url')
const checkUrl = require('./models/checkUrl')

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

// save new url & old url in DB
app.post('/', (req, res) => {
  const urlData = req.body
  const amount = 1
  checkUrl(urlData, amount, res)
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

