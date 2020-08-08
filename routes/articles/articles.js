const express = require('express')
const Article = require("../../models/Article.js")
const router = express.Router()

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
        new Article({
            title: req.body.title,
            content: req.body.content
        })

            .save((error, result) => {
                if (error) {
                    res.send(`Error inserting document: ${error}`)
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

    .patch((req, res) => {
        // Update specific fields only in the document.
        // eg. 'title: <string>' only. PUT will overwrite all fields and if no values are supplied, 
        // then is missing values will == null.
        // req.body will return an object with specified fields to update.
        Article.updateOne(
            { title: req.params.articleTitle },
            { $set: req.body },
            (error, result) => {
                if (error) {
                    console.log(error)
                    res.send(error)
                }
                else {
                    console.log(result)
                    res.send("Number of documents modified: " + result.nModified)
                }
            }
        )
    })

module.exports = router