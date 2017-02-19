var mongoose = require('mongoose');
var articleSchema = require('../db/schema');
var Article = mongoose.model('Article', articleSchema);

// Article.create({
//     title: 'First',
//     auther: 'Some person',
//     link: 'google.com'
// }, function(err, small) {
//     if (err) return handleError(err);
// });

// mongoose.connect('mongodb://localhost/test');
mongoose.connect('mongodb://heroku_w84ktq71:ipefkl8ksohi858fviu2j7o7ib@ds019471.mlab.com:19471/heroku_w84ktq71');
var db = mongoose.connection;

module.exports = {
    db: db,
    Article: Article
};
