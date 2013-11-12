var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = function (dal, ModelMetadata) {
        var ScoutSchema = new mongoose.Schema(ModelMetadata.applymeta({
            firstname: {type: String, required: true, unique: false},
            lastname: {type: String, required: true, unique: false},
            birthdate: {type: Date, required: false, unique: false},
            rank: {type: String, required: true, unique: false},
            akelas: [
                {type: Schema.Types.ObjectId, ref: 'akelas'}
            ],
            den: {type: Schema.Types.ObjectId, ref: 'dens'}
        }));

    return mongoose.model('scouts', ScoutSchema);
};