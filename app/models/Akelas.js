var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = function (dal, ModelMetadata) {
    var AkelaSchema = new mongoose.Schema(ModelMetadata.applymeta({
        firstname: {type: String, required: true, unique: false},
        lastname: {type: String, required: true, unique: false},
        primaryemail: {type: String, required: true, unique: false},
        alternateemail: {type: String, required: false, unique: false},
        primaryphone: {type: String, required: false, unique: false},
        scouts: [{type: Schema.Types.ObjectId, ref: 'scouts'}],
        denid: {type: Schema.Types.ObjectId, ref: 'dens'}
    }));

    return mongoose.model('akelas', AkelaSchema);
}