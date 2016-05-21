var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var request = require('request');
var cron = require('node-cron');
var scheduler = require('./scheduler.js');
var path = require('path');
var app = express();

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));

app.use(session({ secret: 'app', cookie: { maxAge: 60000 }}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var users_controllers = require('./controllers/users_controller.js');
var routes = require('./controllers/users_controller.js');
var subscriptions_controller = require('./controllers/subscriptions_controller.js');
var categories_controller = require('./controllers/categories_controller.js');

app.use('/', users_controllers);
app.use('/', routes);
// app.use('/', subscriptions_controller);
app.use('/', categories_controller);

// have heroku select the port otherwise use port 3000 locally
var port = process.env.PORT || 3000;
app.listen(port);
// scheduler.start();
