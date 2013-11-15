var util = require('util'),
    _ = require('underscore');

module.exports = function(app, Akelas, paging, helpers, config) {

    function mapAkelas(akela) {
        return {
            id: akela._id,
            firstname: akela.firstname,
            lastname: akela.lastname,
            primaryemail: akela.primaryemail,
            alternateemail: akela.alternateemail,
            primaryphone: akela.primaryphone,
            alternatephone: akela.alternatephone
        };
    }

    function findAllAkelas(orderby, page, callback) {
        var sort = {};

        sort[orderby.fieldname] = orderby.direction;
        paging.find(Akelas, {}, null, sort, page, function(err, docs) {
            if (err) return callback(err, null);

            var akelas = _.map(docs, mapAkelas);

            callback(null, akelas)
        });
    }

    function findAkelaById(id, callback) {
        Akelas.findOne({_id: id}, function(err, doc) {
            if (err) return callback(new Error('Unable to create an Akela.'), null);

            var akela = mapAkelas(doc);

            return callback(null, akela);
        });
    }

    function findAkelasBy(query, orderby, page, callback) {
        var sort = {};

        sort[orderby.fieldname] = orderby.direction;
        paging.find(Akelas, query, null, sort, page, function(err, docs) {
            if (err) {
               return callback(err, null);
            }

            var akelas = _.map(docs, mapAkelas);

            callback(err, akelas);
        });
    }

    function createAkela(akela, callback) {
        if (!isValid(akela)) callback(new Error('Akela is not valid.'), null);

        akela.alternateemail = akela.alternateemail || "";
        akela.primaryphone = akela.primaryphone || "";
        akela.alternatephone = akela.alternatephone || "";
        akela.datecreated = new Date();
        akela.datemodified = new Date();
        akela.createdby = 'web';
        akela.modifiedby = 'web';

        Akelas.create(akela, function(err, doc) {
           if (err) return callback(new Error('Unabled to create Akela'), null);

            var newAkela = mapAkelas(doc);

            return callback(null, newAkela);
        });
    }


    function isValid(akela) {
        return !firstname.isNullOrWhitespace() && !akela.lastname.isNullOrWhitespace();
    }

    return {
        findAll: findAllAkelas,
        findById: findAkelaById,
        findBy: findAkelasBy,
        create: createAkela
    };
};