var util = require('util'),
    Handlebars = require('express-hbs');


module.exports = (function(Handlebars) {
    var formatString = '%s%s%s%s%s',
        dateformats = {
            yyyyMMdd: function(date, delimiter) {
                return util.format(formatString, getYear(date, true), delimiter, getMonth(date, true), delimiter, getDate(date, true));
            },
            MMddyyyy: function(date, delimiter) {
                return util.format(formatString, getMonth(date, true), delimiter, getDate(date, true), delimiter, getYear(date, true));

            }
    };

    String.prototype.isNullOrWhitespace = function() {
        return (this != null && this !== null) &&
            (this != undefined && this !== undefined)&&
            (this.trim() != "" && this.trim() !== "");
    };

    function addAttributes(options) {
        if (!options) return '';

        var attributes = [' '],
            formatString = '',
            o;

        for (o in options.hash) {
            attributes.push(options.hash[o] === "true" ? util.format('%s', o) : util.format('%s="%s"', o, options.hash[o]));
        }

        return attributes.join(' ');
    }

    function getDate(date, padding) {
        var day = date.getUTCDate(),
            dayPadding = padding ? (day < 10 ? '0' : '') : '';

        return util.format('%s%d', dayPadding, day);
    }

    function getMonth(date, padding) {
        var month = date.getUTCMonth() + 1,
            monthPadding = padding ? (month < 10 ? '0' : '') : '';

        return util.format('%s%d', monthPadding, month);
    }

    function getYear(date, fullYear) {
        var year = fullYear ? date.getUTCFullYear() : date.getYear();

        return util.format('%s', year);
    }

    return {
        Html: {
            link: function(val, url, options) {
                var attributes = addAttributes(options);

                return new Handlebars.SafeString(util.format('<a href="%s"%s>%s</a>', url, attributes, val));
            },
            input: function(val, type, displayName, options) {
                if (!options) return '<input type="text" />';

                var attributes = addAttributes(options),
                    html = displayName.isNullOrWhitespace() ? util.format('<label for="%s">%s</label>\n', options.hash.id, displayName) : '';

                return new Handlebars.SafeString(util.format('%s<input type="%s"%s value="%s" />', html, type, attributes, val));
            },
            form: function(url, method, options) {
                var attributes = addAttributes(options),
                    form = util.format('<form action="%s" method="%s"%s>%s</form>', url, method, attributes, options.fn(this));
                return new Handlebars.SafeString(form);
            }
        },
        Utils: {
            dateFormat: function(date, format, delimiter) {
                if (!dateformats[format]) throw new Error(util.format('Date format \'%s\' is not implemented'));

                return dateformats[format](date, delimiter);
            }
        }
    }
}(Handlebars));