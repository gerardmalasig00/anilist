//// Core modules

//// External modules
const express = require('express');
const bodyParser = require('body-parser');
const lodash = require('lodash');

//// Modules
const routes = require('./routes');
const nunjucksEnv = require('./nunjucksEnv');
const viewHelper = require('./viewHelper');

//// Create app
const app = express();

//// Setup view
nunjucksEnv.express(app);

//// Global variables
// App
app.locals.config = {
    app: lodash.filter(CONFIG.app, (o, key) => { return ['url'].indexOf(key) !== -1 })
};
app.locals.app = CONFIG.app;
app.locals.baseUrl = CONFIG.app.url;
app.locals.app.title = 'Anilist';
app.locals.app.description = 'Browse all your favorite anime and manga here.';

// Runs once on app start
app.use(function (req, res, next) {
    app.locals.CONFIG = lodash.cloneDeep(CONFIG) // Config
    res.locals.urlPath = req.originalUrl;
    next();
});

// Remove express
app.set('x-powered-by', false);

//// Middlewares
// Powered by
app.use(function (req, res, next) {
    res.setHeader('X-Powered-By', 'anilist.ph'); // Defaults to all files
    next();
});

// Static public files
let setHeaders = (res, path, stat) => {
    res.setHeader('X-Powered-By', 'static'); // Add this to static files
}
app.use(express.static(CONFIG.app.dirs.public, { setHeaders: setHeaders }));


// Adds a way for view to know what page it is on
// Adds addActiveClass function and currentPath global variable
app.use(viewHelper);

// Parse http body
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//// Set express vars
// Indicates the app is behind a front-facing proxy, and to use the X-Forwarded-* headers to determine the connection and the IP address of the client.
app.set('trust proxy', false);

//// Routes
app.use(routes);
module.exports = app;
