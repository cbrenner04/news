var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var express = require('express');
var expressHandlebars = require('express-handlebars');
var request = require('request');

var db = require('./models/article').db;

var app = express();
var port = process.env.PORT || 3000;

// set up handlebars engine
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Serve static content for the app from the 'public' directory in the
// application directory.
app.use(express.static(__dirname + '/public'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected');
    app.listen(port, function() {
        console.log('listening on ' + port);
    });
});

// get them routes
require('./controllers/news_controller.js')(app);
