var Article = require('../models/article').Article;
var cheerio = require('cheerio');
var request = require('request');

// export the routes
module.exports = function(app) {
    // get root
    app.get('/', function(_request, response) {
        var scrapings = [];
        request('https://news.ycombinator.com/', function(error, _response, html) {
            var $ = cheerio.load(html);
            $('.title').each(function(i, element) {
              if (i % 2 !== 0) {
                var articleObject = {};
                articleObject.title = $('a', element).first().text();
                articleObject.link = $('a', element).attr('href');
                articleObject.origin = $(element).children().children().text();
                scrapings.push(articleObject);
              }
            });
            console.log(scrapings);
            response.render('index', { articles: scrapings });
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
};
