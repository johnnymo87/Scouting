var util = require('util'),
    _ = require('underscore');

module.exports = function(app, Akelas, helpers, paging, config) {
    return {
        index: function(req, res, next) {
            var orderby = {

                },
                field = req.query.orderby || 'firstname',
                direction = Number(req.query.direction) || 1;

            orderby[field] = direction;
            res.locals.title = 'Akelas';
            paging.find(Akelas, {}, null, orderby, 0, function (err, akelas) {
                if (err) console.log(err);

                res.locals.akelas = _.map(akelas, function (akela) {
                    var bd = akela.birthdate;
                    return {
                        firstname: akela.firstname,
                        lastname: akela.lastname,
                        primaryemail: akela.primaryemail,
                        alternateemail: akela.alternateemail,
                        primaryphone: akela.primaryphone,
                        alternatephone: akela.alternatephone,
                        detailsurl: util.format('/Akelas/%s', akela._id.toString()),
                        editurl: util.format('/Akelas/Edit/%s', akela._id.toString()),
                        deleteurl: util.format('/Akelas/Delete/%s', akela._id.toString())
                    };
                });
                res.render('Akela/index');
            });
        }
    }
}