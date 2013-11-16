var util = require('util'),
    _ = require('underscore');

module.exports = function(UsersService) {
    function login(username, password, callback) {
        UsersService.validate({username: username, password: password}, function(err, user) {
            if (err) return callback(err, null);

            return user ? callback(null, user.id) : callback();
        });
    }

    return {
        login: login
    };
};