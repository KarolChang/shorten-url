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
// 1. function
app.post('/', (req, res) => {
  const urlData = req.body
  const amount = 1
  const random = checkRandom(generateRandom(amount), amount)
  console.log(random)
  Url.findOne({ url: urlData.url })
    .lean()
    .then(url => {
      if (!url) {
        // 檢查 random 是否存在資料庫
        urlData.random = random
        return Url.create(urlData)
          .then(() => res.render('index', { urlData }))
      } else {
        res.render('index', { url })
      }
    })
})
// 拿到random > 比對random是否存在資料庫 > 存在:重新選擇 > 不存在:return random
function checkRandom(random, amount) {
  Url.findOne({ random: random })
    .lean()
    .then(item => {
      if (!item) {
        return random
      } else {
        checkRandom(generateRandom(amount), amount)
      }
    })
}

// 2. 
// app.post('/', (req, res) => {
//   const urlData = req.body
//   const amount = 1
//   Url.findOne({ url: urlData.url })
//     .lean()
//     .then(url => {
//       if (!url) {
//         const randomItem = generateRandom(amount)
//         Url.findOne({ random: randomItem })
//           .lean()
//           .then(random => {
//             if (!random) {
//               urlData.random = randomItem
//               return Url.create(urlData)
//                 .then(() => res.render('index', { urlData }))
//             } else {
//               // 123
//             }
//           })
//       } else {
//         res.render('index', { url })
//       }
//     })
// })

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

