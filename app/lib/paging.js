module.exports = (function() {
    var pageSize = 10;

    function setPageSize(size) {
        pageSize = size > 0 ? size : 10;
    }

    function pagedFind(model, query, fields, orderby, page, callback) {
        var result = model.find(query, fields || null);

        if (orderby) {
            result = result.sort(orderby);
        }

        return result.skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec(callback);
    }

    return {
        setPageSize: setPageSize,
        find: pagedFind
    };

}());