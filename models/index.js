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
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

var commentSchema = new Schema({
    _article: {
        type: String,
        ref: 'Article'
    },
    body: String
});

var Article = mongoose.model('Article', articleSchema);
var Comment = mongoose.model('Comment', commentSchema);

mongoose.connect('mongodb://heroku_w84ktq71:ipefkl8ksohi858fviu2j7o7ib' +
    '@ds019471.mlab.com:19471/heroku_w84ktq71');
var db = mongoose.connection;

module.exports = {
    db: db,
    Article: Article,
    Comment: Comment
};
