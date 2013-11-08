var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = function (dal, ModelMetadata) {
    var AchievementSchema = new mongoose.Schema({
            name: {type: String, required: true, unique: true},
            description: {type: String, required: true, unique: false},
            createddate: {type: Date, required: true, unique: false}
        }),
        ScoutSchema = new mongoose.Schema(ModelMetadata.applymeta({
            firstname: {type: String, required: true, unique: false},
            lastname: {type: String, required: true, unique: false},
            birthdate: {type: Date, required: false, unique: false},
            rank: {type: String, required: true, unique: false},
            achievements: [
                AchievementSchema
            ],
            akelas: [
                {type: Schema.Types.ObjectId, ref: 'akelas'}
            ],
            den: {type: Schema.Types.ObjectId, ref: 'dens'}
        }));

    return mongoose.model('scouts', ScoutSchema);
}