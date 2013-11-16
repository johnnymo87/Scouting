var util = require('util'),
    _ = require('underscore');

module.exports = function(app, AuthService) {
    return {
        login: {
            get: function(req, res, next) {

            },
            post: function(req, res, next) {
                var un = req.body.username,
                    pw = req.body.password;

                AuthService.login(un, pw, function(err, isValid) {
                    if (err) return next(err);

                    if (isValid) {
                        res.session.userid
                    }
                });
            }
        }
    };
};