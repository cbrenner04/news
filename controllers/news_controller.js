// require express and the burgers model
var Article = require('../models/article').Article;

// export the routes
module.exports = function(app) {
    // get the all articles route
    app.get('/api/articles', function(request, response) {
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
