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
                res.send(error)
            } else {
                console.log("Success: Get all")
                res.send(results)
            }
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

        // Find a specific article
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

    .put((req, res) => {

        // Create the update parameter.
        // Test if title and content values are supplied.  If not do not add them to the update obejct
        // this avoids existing document values being set to null.
        const update = {}
        if (req.body.title) { update.title = req.body.title }
        if (req.body.content) { update.content = req.body.content }

        // Update a specific article.
        Article.updateOne(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
            (error, result) => {
                if (error) { 
                    console.log("Error updating document", error) 
                    res.send(error)
                } else {
                    const msg = "Success: Document updated."
                    console.log(msg, result)
                    res.send(msg)
                }
            })
    })

module.exports = router