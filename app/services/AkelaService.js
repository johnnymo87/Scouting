var util = require('util'),
    _ = require('underscore');

module.exports = function(app, Akelas, paging, helpers, config) {

    function findAllAkelas(orderby, page, callback) {
        var sort = {};

        sort[orderby.fieldname] = orderby.direction;
        paging.find(Akelas, {}, null, sort, page, function(err, docs) {
            if (err) {
                console.log(err);
                callback(err, null);
                return;
            }

            var akelas = _.map(docs, function(akela) {
                return {
                    firstname: akela.firstname,
                    lastname: akela.lastname,
                    primaryemail: akela.primaryemail,
                    alternateemail: akela.alternateemail,
                    primaryphone: akela.primaryphone,
                    alternateemail: akela.alternateemail
                };
            });

            callback(err, akelas)
        });
    }

    function findAkelaById(id, callback) {
        Akelas.findOne({_id: id}, callback);
    }


    return {
        findAllAkelas: findAllAkelas,
        findAkelaById: findAkelaById
    };
};