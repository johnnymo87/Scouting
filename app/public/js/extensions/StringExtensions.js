String.prototype.format = function(text) {
    var args = arguments;

    return text.replace(/({\d+})/g, function(match, num) {
        return args[num] == 'undefined' ? match : args[num];
    })
}