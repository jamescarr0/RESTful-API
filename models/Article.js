// Article Model.

const mongoose = require('mongoose')

// Create a new article schema.
const articleSchema = {
    title: { type: String, required: true },
    content: { type: String, required: true }
}

// Create a new mongoose article model.
module.exports = mongoose.model("Article", articleSchema)