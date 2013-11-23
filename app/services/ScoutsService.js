var util = require('util'),
    _ = require('underscore');

module.exports = function(app, Scouts, paging, helpers, config) {

    function mapScout(scout) {
        var baseurl = 'Scouts/%s/' + scout.id;
        
        return {
            id: scout._id,
            firstname: scout.firstname,
            lastname: scout.lastname,
            birthdate: helpers.Utils.dateFormat(scout.birthdate, 'MMddyyyy', '-'),
            rank: scout.rank,
            detailsurl: util.format(baseurl, 'details'),
            editurl: util.format(baseurl, 'edit'),
            deleteurl: util.format(baseurl, 'delete')
        }
    }

    function findAllScouts(orderby, page, callback) {
        var sort = {};

        sort[orderby.fieldname] = orderby.direction;
        paging.find(Scouts, {}, null, sort, page, function(err, docs){
            if (err) return callback(err, null);

            var akelas = _.map(docs, mapScout);

            callback(null, akelas);
        });
    }

    function findScoutById(id, callback) {
        Scouts.findOne({_id: id}).populate('akelas').exec(function(err, doc) {
            if (err) return callback(new Error('Unable to retrieve scout from database'), null);

            var scout = mapScout(doc);

            return callback(null, scout);
        });
    }

    return {
        findAll: findAllScouts,
        findById: findScoutById
    };
};