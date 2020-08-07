const express = require('express')
const bodyParser = require('body-parser')

const dbConnection = require('./dbConnection')
const articles = require('./articles/articles.js')

const app = express()
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))

// Set the view engine to EJS
app.set('view engine', 'ejs')

// Load the outer modules.
app.use('/articles', articles)

// Connect to the database.
dbConnection.connect()

// Start server.
const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Server started on port: ${port}`) })