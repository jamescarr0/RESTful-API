// Article Model.

const mongoose = require('mongoose')

// Create a new article schema.
const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
})

function outcome(error, doc, resolve, reject) {
    if (error) {
        console.log("\x1b[31m%s", "[Error]: ", "\x1b[0m", error)
        return reject(error)
    } else {
        console.log("\x1b[32m%s", "[Success]: ", "\x1b[0m", doc)
        return resolve(doc)
    }
}

articleSchema.statics.findAllArticles = function () {
    return new Promise((resolve, reject) => {
        this.find((error, docs) => {
            console.log(docs)
            return outcome(error, docs, resolve, reject)
        })
    })
}

articleSchema.statics.findOneByTitle = function (req) {
    return new Promise((resolve, reject) => {
        this.findOne({ title: req.params.articleTitle }, (error, docs) => {
            return outcome(error, docs, resolve, reject)
        })
    })
}

articleSchema.statics.insertArticle = function (document) {
    return new Promise((resolve, reject) => {
        this.create(document, (error, docs) => {
            return outcome(error, docs, resolve, reject)
        })
    })
}

articleSchema.statics.updateOneByTitle = function (req) {
    return new Promise((resolve, reject) => {
        this.updateOne(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
            (error, docs) => {
            return outcome(error, docs, resolve, reject)
        })
    })
}

articleSchema.statics.patchOneByTitle = function (req) {
     // req.body returns object with specified fields to update.
    return new Promise((resolve, reject) => {
        this.updateOne(
            { title: req.params.articleTitle},
            { $set: req.body }, 
            (error, docs) => {
            return outcome(error, docs, resolve, reject)
        })
    })
}

articleSchema.statics.deleteAllArticles = function () {
    return new Promise((resolve, reject) => {
        this.deleteMany((error, docs) => {
            return outcome(error, docs, resolve, reject)
        })
    })
}

articleSchema.statics.deleteArticleByTitle = function (req) {
    return new Promise((resolve, reject) => {
        this.deleteOne({title: req.params.articleTitle}, (error, docs) => {
            return outcome(error, docs, resolve, reject)
        })
    })
}

// Create a new mongoose article model.
module.exports = mongoose.model("Article", articleSchema)


