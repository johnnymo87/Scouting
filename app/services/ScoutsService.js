var util = require('util'),
    _ = require('underscore');

module.exports = function(app, Scouts, paging, helpers, config) {
    function findAllScouts(orderby, page, callback) {
        var sort = {};

        sort[orderby.fieldname] = orderby.direction;
        var result = paging.find(Scouts, {}, null, sort, page, callback);

//        _.each(result, function(obj){
//            obj.birthdate = helpers.Utils.dateFormat(obj.birthdate, 'MMddyyyy', '-');
//            console.log("test");
//        })

        result.birthdate = helpers.Utils.dateFormat(result.birthdate, 'MMddyyyy', '-');

        return result;
    }

    function findScoutById(id, callback) {

    }

    return {
        findAll: findAllScouts,
        findById: findScoutById
    };
};