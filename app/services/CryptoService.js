var crypto = require('crypto');

module.exports = function() {
    var iterations = 10000,
        hashLength = 512,
        saltLength = 128,
        encoding = 'hex';

    function createSalt(bytes) {
        return crypto.randomBytes(bytes).toString(encoding);
    }

    function hashPassword(password, salt, callback) {
        crypto.pbkdf2(password, salt, iterations, hashLength, function(err, derivedKey) {
            if (err) return callback(err, null);

            return callback(null, derivedKey.toString(encoding));
        });
    }

    function validatePassword(password, user, callback) {
        hashPassword(password, user.salt, function(err, pw) {
            if (err) return callback(err, null);

            return callback(null, pw == user.password);
        });
    }

    function createPassword(password, callback) {
        var salt = createSalt(saltLength);

        hashPassword(password, salt, function(err, pw) {
            if (err) return callback(err, null);

            return callback(null, pw);
        });
    }

    return {
        validatePassword: validatePassword,
        createPassword: createPassword
    };
};