const express = require('express')
const Article = require("../models/Article.js")
const router = express.Router()

// Log Date, time and request method.
router.use(function timeLog(req, res, next) {
    console.log(
        "\x1b[33m%s", `[${new Date().toUTCString()}]: ${req.method} - ${req.originalUrl}` + "\x1b[0m")
    next()
})

/************************* Requests targeting all articles. *************************/

router.route('/')

    // Get all the article documets from database.
    .get((req, res) => {
        Article.findAllArticles()
            .then(docs => { res.send(docs) })
            .catch(error => { res.send(error) })
    })

    // Create & insert a new article document into the collection..
    .post((req, res) => {
        const article = new Article({
            title: req.body.title,
            content: req.body.content
        })

        Article.insertArticle(article)
            .then(docs => { res.send(docs) })
            .catch(error => { res.send(error) })
    })

    .delete((req, res) => {
        // Remove all article documents from the collection.
        Article.deleteAllArticles()
            .then(docs => { res.send(docs) })
            .catch(error => { res.send(error) })
    })

/************************* Requests targeting specific articles. *************************/

router.route('/:articleTitle')

    .get((req, res) => {
        // Find a specific article - Supply query from url params /:articleTitle.
        Article.findOneByTitle(req)
            .then(docs => { res.send(docs) })
            .catch(error => { res.send(error) })
    })

    .put((req, res) => {
        // Update all fields in a specific article.
        Article.updateOneByTitle(req)
            .then(docs => { res.send(docs) })
            .catch(error => { res.send(error) })
    })

    // Update(patch) specific fields only in the document.
    .patch((req, res) => {
        Article.patchOneByTitle(req)
            .then(docs => { res.send(docs) })
            .catch(error => { res.send(error) })
    })

    // Delete a specific document.
    .delete((req, res) => {
        Article.deleteArticleByTitle(req)
            .then(docs => { res.send(docs) })
            .catch(error => { res.send(error) })
    })

module.exports = router