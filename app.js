const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded( { extended: true }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('Server up and running')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})