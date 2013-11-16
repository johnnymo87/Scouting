var util = require('util'),
    _ = require('underscore');

module.exports = function(Users, CryptoService, paging) {
    var Errors = {
        RequiredFieldsError: (function() { return new Error('Username, email and password are required fields.')}())
    };

    function mapUser(user) {
        return {
            id: user._id,
            username: user.username,
            email: user.email
        };
    }

    function findAllUsers(orderby, page, callback) {
        var sort = {};

        sort[orderby.fieldname] = orderby.direction;

        paging.find(Users, {}, null, sort, page, function(err, docs) {
            if (err) return callback(err, null);

            var users = _.map(docs, mapUser);

            return callback(null, users);
        })
    }

    function createUser(data, callback) {

        if (!validateNewUser(data)) return callback(Errors.RequiredFieldsError, null);

        var user = _.defaults(data || {},  {
            datecreated: new Date(),
            datemodified: new Date(),
            createdby: 'Users Service',
            modifiedby: 'Users Service'
        });

        CryptoService.createPassword(user.password, function(err, res) {
            if (err) return callback(err, null);

            user.password = res.password;
            user.salt = res.salt;

            Users.create(user, function(err, doc) {
                if (err) callback(err, null);

                var user = mapUser(doc);

                return callback(null, user);
            })
        });

    }

    function validateUser(user, callback) {
        if (!validateNewUser(user)) return callback(Errors.RequiredFieldsError, null);

        Users.findOne({username: user.username}, function(err, doc) {
            if (err) return callback(err, null);

            CryptoService.validatePassword(user.password, doc, function(err, isValid) {
                if (err) return callback(err, null);

                return isvalid ? callback(null, mapUser(doc)) : callback(new Error('Unabled to validate user.'), null);
            });
        });
    }

    function validateNewUser(user) {
        return !user.username.isNullOrWhitespace() && !user.email.isNullOrWhitespace() && !user.email.password.isNullOrWhitespace();
    }

    return {
        create: createUser,
        findAll: findAllUsers,
        validate: validateUser
    };
};