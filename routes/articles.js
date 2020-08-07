const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

// Create a new article schema.
const articleSchema = {
    title: { type: String, required: true },
    content: { type: String, required: true }
}

// Create a new article model. ("Collection name", Schema).
const Article = mongoose.model("Article", articleSchema)

// Create new document.
function CreateNewArticle(req) {
    return new Article({
        title: req.body.title,
        content: req.body.content
    })
}

router.use(function timeLog(req, res, next) {
    console.log(
        "\x1b[33m%s", `[${new Date().toUTCString()}]: ${req.method} - ${req.originalUrl}` + "\x1b[0m")
    next()
})

/************************* Requests targeting all articles. *************************/

router.route('/')

    .get((req, res) => {
        // Get all articles from the collection.
        Article.find((error, results) => {
            if (error) {
                console.log(error)
            }
            res.send(results)
        })
    })

    .post((req, res) => {
        // Create & insert a new article document into the collection..
        const newArticle = CreateNewArticle(req).save((error, result) => {
            if (error) {
                res.send(`Error inserting document: ${newArticle}\n${error} `)
            }
            else {
                res.send(`Document inserted successfully:\n${result}\n`)
            }
        })
    })

    .delete((req, res) => {
        // Remove all article documents from the collection.
        Article.deleteMany((error, result) => {
            if (error) {
                res.send(`Error deleting all documents from collection: ${error}`)
            }
            else {
                res.send(`Successfully deleted all ${result.deletedCount} documents from the collection `)
            }
        })
    })

/************************* Requests targeting specific articles. *************************/

router.route('/:articleTitle')

    .get((req, res) => {

        // Get the url parameter.
        const title = req.params.articleTitle

        Article.findOne({ title: title }, (error, result) => {
            if (error) {
                res.send(`Error finding document title ${title} - ` + error)
            } else if (!result) {
                res.send("No matches found")
            } else {
                res.send(result)
            }
        })
    })

module.exports = router