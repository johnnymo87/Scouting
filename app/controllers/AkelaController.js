var util = require('util'),
    _ = require('underscore');

module.exports = function (app, Akelas, helpers, paging, config, AkelasService) {
    return {
        index: function (req, res, next) {
            var orderby = {
                    field: req.query.orderby || 'firstname',
                    direction: req.query.direction || 1
                };

            AkelasService.findAll(orderby, 0, function(err, akelas) {
                if (err) return next(err);

                res.locals.title = 'Akelas';
                res.locals.akelas = akelas;

                res.render('Akela/index');
            });
        },
        create: {
            get: function (req, res, next) {
                res.locals.title = "Create Akela";

                return res.render('Akela/create')
            },
            post: function(req, res, next) {
                var akela = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    primaryemail: req.body.primaryemail,
                    alternateemail: req.body.alternateemail,
                    primaryphone: req.body.primaryphone,
                    alternatephone: req.body.alternatephone
                };

                AkelasService.create(akela, function(err, res) {
                    if (err) return next(err);

                    return res.redirect('/Akelas');
                });
            }
        },
        read: {
            get: function(req, res, next) {
                var id = req.params.id;

                AkelasService.findById(id, function(err, akela) {
                    if (err) return next(err);

                    res.locals.title = 'Akela Details';
                    res.locals.akela = akela;

                    return res.render('Akela/details')
                });
            }
        },
        update: {
            get: function(req, res, next) {
                var id = req. params.id;

                AkelasService.findById(id, function(err, akela) {
                    if (err) return next(err);

                    res.locals.title = 'Edit Akela';
                    res.locals.akela = akela;

                    return res.render('Akela/edit');
                });
            },
            post: function(req, res, next) {
                var akela = {
                    id: req.body.id,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    primaryemail: req.body.primaryemail,
                    alternateemail: req.body.alternateemail,
                    primaryphone: req.body.primaryphone,
                    alternatephone: req.body.alternatephone
                };

                AkelasService.update(akela, function(err, akela) {
                    if (err) return next(err);

                    return res.redirect(util.format('/Scouts/Details/%s', akela.id));
                });
            }
        },
        destroy: {
            get: function(req, res, next) {
                var id = req.params.id;

                AkelasService.findById(id, function(err, akela) {
                    if (err) return next(err);

                    res.locals.title = 'Delete Akela';
                    res.locals.akela = akela;

                    return res.render('Akela/delete');
                });
            },
            post: function(req, res, next) {
                var id = req.params.id;

                AkelasService.remove(id, function(err, result) {
                    if (err) return next(err);


                    return res.redirect('/Scouts/');
                });
            }
        }
    }
}