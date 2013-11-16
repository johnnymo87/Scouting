var crypto = require('crypto');

module.exports = function() {
    var hashType = 'sha256',
        saltLength = 128,
        encoding = 'hex';

    function createSalt(bytes) {
        return crypto.randomBytes(bytes).toString(encoding);
    }

    function hashPassword(password, salt, callback) {
        var hash = crypto.createHash(hashType);

        hash.update((new Buffer(password).toString(encoding) + salt));

        return callback(null, hash.digest('hex'));
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

            return callback(null, {password: pw, salt: salt});
        });
    }

    return {
        validatePassword: validatePassword,
        createPassword: createPassword
    };
};