var util = require('util'),
    _ = require('underscore');

module.exports = function (app, Akelas, helpers, paging, config) {
    return {
        index: function (req, res, next) {
            var orderby = {

                },
                field = req.query.orderby || 'firstname',
                direction = Number(req.query.direction) || 1;

            orderby[field] = direction;
            res.locals.title = 'Akelas';
            paging.find(Akelas, {}, null, orderby, 0, function (err, akelas) {
                if (err) console.log(err);

                res.locals.akelas = _.map(akelas, function (akela) {;
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
        },
        create: {
            get: function (req, res, next) {
                res.locals.title = "Create Akela";

                res.render('Akela/create')
            },
            post: function(req, res, next) {
                var akela = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    primaryemail: req.body.primaryemail,
                    alternateemail: req.body.alternateemail || "",
                    primaryphone: req.body.primaryphone || "",
                    alternatephone: req.body.alteratephone || "",
                    datecreated: new Date(),
                    datemodified: new Date(),
                    createdby: "web",
                    modifiedby: 'web'
                };

                Akelas.create(akela, function(err, doc) {
                    if (err) console.log(err);

                    res.redirect('/Akelas');
                });
            }
        },
        read: {
            get: function(req, res, next) {
                var id = req.params.id;

                Akelas.findOne({_id: id}, function(err, doc) {
                    if (err) console.log(err);

                    res.locals.akela = {
                        firstname: doc.firstname,
                        lastname: doc.lastname,
                        primaryemail: doc.primaryemail,
                        alternateemail: doc.alternateemail,
                        primaryphone: doc.primaryphone,
                        alternatephone: doc.alternatephone
                    };

                   res.render('Akela/details');
                });
            }
        },
        update: {

        },
        destroy: {

        }
    }
}