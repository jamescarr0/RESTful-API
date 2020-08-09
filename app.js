const express = require('express')
const bodyParser = require('body-parser')

const database = require('./database/connection')
const articles = require('./routes/articles/articles.js')

const app = express()
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))

// Set the view engine to EJS
app.set('view engine', 'ejs')

// Load the Router modules.
app.use('/articles', articles)

// Connect to the database.
database.connect()

// Index.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

// Start server.
const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Server started on port: ${port}`) })