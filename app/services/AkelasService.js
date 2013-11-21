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
            alternatephone: akela.alternatephone,
            detailsurl: util.format('/Akelas/Details/%s', akela._id.toString()),
            editurl: util.format('/Akelas/Edit/%s', akela._id.toString()),
            deleteurl: util.format('/Akelas/Delete/%s', akela._id.toString())
        };
    }

    function findAllAkelas(orderby, page, callback) {
        var sort = {};

        sort[orderby.field] = orderby.direction;
        paging.find(Akelas, {}, null, sort, page, function(err, docs) {
            if (err) return callback(err, null);

            var akelas = _.map(docs, mapAkelas);

            return callback(null, akelas)
        });
    }

    function findAkelaById(id, callback) {
        Akelas.findOne({_id: id}).populate('scouts').exec(function(err, doc) {
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
//        if (!isValid(akela)) callback(new Error('Akela is not valid.'), null);

        akela = _.defaults(akela, {
            alternateemail: "",
            primaryphone: "",
            alternatephone: "",
            datecreated: new Date(),
            datemodified: new Date(),
            createdby: 'web',
            modifiedby: 'web'
        });


        Akelas.create(akela, function(err, doc) {
           if (err) return callback(new Error('Unabled to create Akela'), null);

            var newAkela = mapAkelas(doc);

            return callback(null, newAkela);
        });
    }

    function updateAkela(id, updates, callback) {
        Akelas.findOneAndUpdate({_id: id}, updates, null, function(err, doc) {
            if (err) return callback(err, null);

            if (!doc) {
                return callback(new Error(util.format('Akela: %s does not exist.')), null);
            }

            var akela = mapAkelas(doc);

            return callback(null, akela);
        });
    }

    function destroyAkela(id, callback) {
        Akelas.findOneAndRemove({_id: id}, null, function(err, doc) {
            if (err) return callback(err, null);

            if (!doc) {
                return callback(new Error(util.format('Akela: %s does not exist.')), null);
            }

            var akela = mapAkelas(doc);

            return callback(null, akela);
        })
    }

    function isValid(akela) {
        console.log(akela);
        return !akela.firstname.isNullOrWhitespace() && !akela.lastname.isNullOrWhitespace();
    }

    return {
        findAll: findAllAkelas,
        findById: findAkelaById,
        findBy: findAkelasBy,
        create: createAkela,
        update: updateAkela,
        destroy: destroyAkela
    };
};