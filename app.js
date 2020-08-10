const express = require('express')
const bodyParser = require('body-parser')

const database = require('./database/connection')
const api = require('./routes/API.js')

const app = express()
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))

// Load the API module.
app.use('/api', api)

// Connect to the database.
database.connect()

// Index.html - Instructions page.
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

// Start server.
const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Server started on port: ${port}`) })