var hbs = require('express-hbs'),
    path = require('path'),
    util = require('util'),
    htmlHelpers = require('./helpers').Html;

module.exports = function (app) {

    //set up view engine
    app.set('view engine', 'hbs');

    app.engine('hbs', hbs.express3({
        partialsDir:path.join(__dirname, "../views/partials")
    }));

    // Static locals
    app.locals({
    });

    // Html Helpers
    for (var h in htmlHelpers) {
        if (htmlHelpers.hasOwnProperty(h)) {
            hbs.registerHelper(h, htmlHelpers[h]);
        }
    }
};