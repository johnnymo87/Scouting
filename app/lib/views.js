var hbs = require('express-hbs'),
    path = require('path'),
    util = require('util');

module.exports = function (app, helpers) {

    //set up view engine
    app.set('view engine', 'hbs');

    app.engine('hbs', hbs.express3({
        partialsDir:path.join(__dirname, "../views/partials")
    }));

    // Static locals
    app.locals({
    });

    // Html Helpers
    for (var h in helpers.Html) {
        if (helpers.Html.hasOwnProperty(h)) {
            hbs.registerHelper(h, helpers.Html[h]);
        }
    }
};