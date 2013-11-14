var util = require('util'),
    _ = require('underscore');

module.exports = function(app, Scouts, paging, helpers, config) {
    function findAllScouts(orderby, page, callback) {
        var sort = {};

        sort[orderby.fieldname] = orderby.direction;
        paging.find(Scouts, {}, null, sort, page, callback);
    }

    function findScoutById(id, callback) {

    }

    return {
        findAll: findAllScouts,
        findById: findScoutById
    };
};