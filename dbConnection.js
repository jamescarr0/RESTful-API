const mongoose = require('mongoose')

// Connect to the mongo database.
exports.connect = () => {
    mongoose.connect("mongodb://localhost:27017/wikiDB", { useUnifiedTopology: true, useNewUrlParser: true }, function (error, db) {
        if (error) { console.log("Connection failed with - " + error) }
        else { console.log(`Successfully connected to database - '${db.name}'`) }
    })
}
