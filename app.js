const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const url = req.body.url
  const myurl = `http://localhost:${PORT}/`
  const newurl = myurl + generateRandom(5)
  res.render('index', { newurl })
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})


// "https://shorten-url.herokuapp.com/"

// 產生 5 碼英數組合
function generateRandom(amount) {
  const randomItems = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopurstuvwxyz'
  let random = ''
  for (let i = 0; i < amount; i++) {
    random += randomItems[Math.floor(Math.random() * randomItems.length)]
  }
  return random
}