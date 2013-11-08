module.exports.applymeta = function (schema) {
    schema.datecreated = {type: Date, required: true, unique: false, select: false};
    schema.datemodified = {type: Date, required: true, unique: false, select: false};
    schema.createdby = {type: String, required: true, unique: false, select: false};
    schema.modifiedby = {type: String, required: true, unique: false, select: false};
    return schema;
}