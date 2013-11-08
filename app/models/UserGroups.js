var mongoose = require('mongoose');

module.exports = function(dal, ModelMetadata) {
    var UserGroupsScehma = new mongoose.Schema(ModelMetadata.applymeta({
        name: {type: String, required: true, unique: true},
        description: {type: String, required: true, unique: false},
        active: {type: Boolean, required: true, unique: false}
    }));

    return mongoose.model('usergroups', UserGroupsScehma);
}