const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded( { extended: true }))
app.set('view engine', 'ejs')

// Connect to mongoDB.
mongoose.connect("mongodb://localhost:27017/wikiDB", { useUnifiedTopology: true, useNewUrlParser: true })

// Create a new article schema.
const articleSchema = {
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}

// Create a new article model. ("Collection name", Schema)
const Article = mongoose.model("Article", articleSchema)

app.get('/', (req, res) => {
    res.send('Server up and running')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})