var mongoose = require('mongoose');
var articleSchema = require('../db/schema');
var Article = mongoose.model('Article', articleSchema);

mongoose.connect('mongodb://heroku_w84ktq71:ipefkl8ksohi858fviu2j7o7ib' +
                 '@ds019471.mlab.com:19471/heroku_w84ktq71');
var db = mongoose.connection;

module.exports = {
    db: db,
    Article: Article
};
