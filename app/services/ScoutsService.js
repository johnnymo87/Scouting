var util = require('util'),
    _ = require('underscore');

module.exports = function(app, Scouts, paging, helpers, config) {

    function mapScout(scout) {
        var baseurl = 'Scouts/{0}/' + scout.id;
        
        return {
            id: scout._id,
            firstname: scout.firstname,
            lastname: scout.lastname,
            birthdate: helpers.Utils.dateFormat(scout.birthdate, 'MMddyyyy', '-'),
            rank: scout.rank,
            detailsurl: 'Scouts/{0}'.format(scout.id),
            editurl: baseurl.format('edit'),
            deleteurl: baseurl.format('delete')
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

    }

    return {
        findAll: findAllScouts,
        findById: findScoutById
    };
};