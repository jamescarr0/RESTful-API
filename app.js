const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

// Connect to mongoDB.
mongoose.connect("mongodb://localhost:27017/wikiDB", { useUnifiedTopology: true, useNewUrlParser: true }, function (error, db) {
    if (error) { console.log("Connection failed with - " + error) }
    else { console.log(`Successfully connected to database - '${db.name}'`) }
})

// Create a new article schema.
const articleSchema = {
    title: { type: String, required: true },
    content: { type: String, required: true }
}

// Create a new article model. ("Collection name", Schema).
const Article = mongoose.model("Article", articleSchema)

app.get('/articles', (req, res) => {
    Article.find((error, results) => {
        if (error) { console.log(error) }
        res.send(results)
    })
})

app.post('/articles', (req, res) => {

    // Create a new article document.
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    })

    // Insert article document into database.
    newArticle.save((error, doc) => {
        if (error) { res.send(`Error inserting document: ${newArticle}\n${error} `) }
        else { res.send(`Document inserted successfully:\n${doc}\n`) }
    })
})

// Start server.
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})