var mongoose = require('mongoose');

module.exports = function (dal, ModelMetadata) {
    var UserSchema = new mongoose.Schema(ModelMetadata.applymeta({
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: false },
        password: {type: String, required: true, unique: false},
        salt: {type: String, required: true, unique: false},
        usergroups: [{type: mongoose.Schema.Types.ObjectId, ref: 'usergroups', required: false}]
    }));

    return mongoose.model('users', UserSchema);
}