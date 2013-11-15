var util = require('util'),
    _ = require('underscore');

module.exports = function(app, Akelas, paging, helpers, config) {

    function mapAkelas(akela) {
        return {
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
            if (err) {
                console.log(err);
                callback(err, null);
                return;
            }

            var akelas = _.map(docs, mapAkelas);

            callback(err, akelas)
        });
    }

    function findAkelaById(id, callback) {
        Akelas.findOne({_id: id}, callback);
    }

    function findAkelasBy(query, orderby, page, callback) {
        var sort = {};

        sort[orderby.fieldname] = orderby.direction;
        paging.find(Akelas, query, null, sort, page, function(err, docs) {
            if (err) {
               console.log(err);
               return callback(err, null);
            }

            var akelas = _.map(docs, mapAkelas);

            callback(err, akelas);
        });
    }

    function createAkela(akela, callback) {

    }

    return {
        findAll: findAllAkelas,
        findById: findAkelaById,
        findBy: findAkelasBy,
        create: createAkela
    };
};