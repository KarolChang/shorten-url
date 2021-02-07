// require modules
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')
require('./config/mongoose')

// get app
const app = express()
const PORT = process.env.PORT || 3000
// set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
// set body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// use routes
app.use(routes)

// set server listener
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
