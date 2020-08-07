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

// Create new document.
function CreateNewArticle(reqBody) {
    const newArticle = new Article({
        title: reqBody.title,
        content: reqBody.content
    })
    return newArticle
}

app.get('/articles', (req, res) => {
    // Get all articles from the collection.
    Article.find((error, results) => {
        if (error) { console.log(error) }
        res.send(results)
    })
})

app.post('/articles', (req, res) => {
    // Create & insert a new article document into the collection..
    const newArticle = CreateNewArticle(req.body).save((error, result) => {
        if (error) { res.send(`Error inserting document: ${newArticle}\n${error} `) }
        else { res.send(`Document inserted successfully:\n${result}\n`) }
    })
})

app.delete('/articles', (req, res) => {
    // Remove all article documents from the collection.
    Article.deleteMany((error, result) => {
        if (error) { res.send(`Error deleting all documents from collection: ${error}`) }
        else { res.send(`Successfully deleted all ${result.deletedCount} documents from the collection `) }
    })
})

// Start server.
const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Server started on port: ${port}`) })