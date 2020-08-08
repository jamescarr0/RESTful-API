// Mongoose connection.

const mongoose = require('mongoose')

exports.connect = () => {
    const options = { 
        useUnifiedTopology: true, 
        useNewUrlParser: true 
    }

    mongoose.connect("mongodb://localhost:27017/wikiDB", options, function (error, db) {
        if (error) { console.log("Connection failed with - " + error) }
        else { console.log(`Successfully connected to database - '${db.name}'`) }
    })
}
