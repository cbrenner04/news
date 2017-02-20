var models = require('../models/index');
var Article = models.Article;
var Comment = models.Comment;
var cheerio = require('cheerio');
var request = require('request');

// export the routes
module.exports = function(app) {
    // get root
    app.get('/', function(_request, response) {
        var scrapings = [];
        request('https://news.ycombinator.com/', function(_error, _response, html) {
            var $ = cheerio.load(html);
            $('.title').each(function(i, element) {
                if (i % 2 !== 0) {
                    var articleObject = {};
                    articleObject.id = i;
                    articleObject.title = $('a', element).first().text();
                    articleObject.link = $('a', element).attr('href');
                    articleObject.origin = $(element).children().children().text();
                    scrapings.push(articleObject);
                }
            });
            response.render('index', {
                articles: scrapings
            });
        });
    });

    // get the all articles route
    app.get('/api/articles', function(_request, response) {
        Article.find({}, function(error, articles) {
            if (error) {
                response.send(error);
            }
            var articleMap = articles.map(function(article) {
                return article;
            });
            response.json(articleMap);
        });
    });

    app.post('/articles', function(request, response) {
        var article = request.body;
        Article.create({
            title: article.title,
            link: article.link,
            origin: article.origin
        }, function(error, _) {
            if (error) {
                console.log(error);
            }
        });
        response.redirect('/');
    });

    app.get('/saved_articles', function(request, response) {
        Article.find({})
            .populate('comments')
            .exec(function(error, articles) {
                if (error) {
                    response.send(error);
                }
                var articleMap = articles.map(function(article) {
                    return article;
                });
                response.render('saved_articles', {
                    articles: articleMap
                });
            });
    });

    app.post('/comments', function(request, response) {
        var comment = request.body;
        Article.findOne({
            title: comment.article_title
        }, function(error, article) {
            Comment.create({
                _article: article._id,
                body: comment.body
            }, function(error, comment) {
                article.comments.push(comment);
                article.save(function(error) {
                    if (error) {
                        console.log(error);
                    }
                });
            });
        });
        response.redirect('/saved_articles');
    });
};
