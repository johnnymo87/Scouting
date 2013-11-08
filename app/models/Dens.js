var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = function (dal, ModelMetadata) {
    var DenSchema = new mongoose.Schema(ModelMetadata.applymeta({
        number: {type: Number, required: true, unique: true},
        region: {type: String, required: true, unique: false},
        leader: {type: Schema.Types.ObjectId, ref: 'users'},
        scouts: [
            {type: Schema.Types.ObjectId, ref: 'scouts'}
        ],
        akelas: [
            {type: Schema.Types.ObjectId, ref: 'akelas'}
        ]
    }));

    return mongoose.model('dens', DenSchema);
};