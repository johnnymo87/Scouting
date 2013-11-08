var mongoose = require('mongoose');

module.exports = function (dal, ModelMetadata) {
    var UserSchema = new mongoose.Schema(ModelMetadata.applymeta({
        username: { type: String, required: true, unique: true },
        email: { type: String, required: false, unique: false },
        password: {type: String, required: true, unique: false},
        usergroups: [{type: mongoose.Schema.Types.ObjectId, ref: 'usergroups', required: true}]
    }));

    return mongoose.model('users', UserSchema);
}