var util = require('util'),
    _ = require('underscore');

module.exports = function (app, helpers, config, ScoutsService) {
    return {
        index: {
            get: function (req, res, next) {
                var orderby = {
                    field: req.query.orderby || 'firstname',
                    direction: Number(req.query.direction) || 1
                },
                page = req.query.page || 1;

                ScoutsService.findAll(orderby, page, function (err, scouts) {
                    if (err) return next(err);

                    res.locals.title = 'Scouts';
                    res.locals.scouts = scouts;

                    return res.render('Scout/index');
                });
            }
        },
        create: {
            get: function (req, res, next) {
                res.locals.title = "Create Scout";

                res.render('Scout/create');
            },
            post: function (req, res, next) {
                var scout = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    birthdate: req.body.birthdate,
                    rank: req.body.rank,
                    datecreated: new Date(),
                    datemodified: new Date(),
                    createdby: 'web',
                    modifiedby: 'web'
                };

                Scouts.create(scout, function (err, doc) {
                    if (err) res.locals.error = console.log(err);

                    res.redirect('/Scouts');
                });
            }
        },
        read: {
            get: function (req, res, next) {
                var id = req.params.id;

                ScoutsService.findById(id, function (err, scout) {
                    if (err) return next(err);

                    res.locals.title = 'Scout Details';
                    res.locals.scout = scout;

                    return res.render('Scout/details');
                });
            }
        },
        update: {
            get: function (req, res, next) {
                var id = req.params.id;

                ScoutsService.findById(id, function (err, scout) {
                    if (err) return next(err);

                    res.locals.title = 'Edit Scout';
                    res.locals.scout = scout;

                    return res.render('Scout/edit');
                });
            },
            post: function (req, res, next) {
                var scout = {
                    id: req.body.id,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    birthdate: req.body.birthdate,
                    rank: req.body.rank,
                    datemodified: new Date(),
                    modifiedby: 'web'
                };

                ScoutsService.update(scout.id, scout, function(err, scout) {
                    if (err) return next(err);

                    return res.redirect(util.format('/Scouts/Details/%s', scout.id));
                });
            }
        },

        destroy: function (req, res, next) {

        }
    };
}