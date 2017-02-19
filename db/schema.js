var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: String,
    origin: String,
    link: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
});

module.exports = articleSchema;
