String.prototype.format = function() {
    var args = arguments;

    return this.replace(/{(\d+)}/g, function(match, num) {
        return typeof(args[num]) == 'undefined' ? match : args[num];
    })
}