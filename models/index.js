var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'The title of the article is required.']
    },
    origin: {
        type: String,
        required: [true, 'The origin of the article is required.']
    },
    link: {
        type: String,
        required: [true, 'The link to the article is required.']
    },
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
