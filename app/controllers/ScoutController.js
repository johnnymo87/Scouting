var util = require('util'),
    _ = require('underscore');

module.exports = function (app, Scouts, helpers, paging, config) {
    paging.setPageSize(config.page_size);

    return {
        index: [
            function (req, res, next) {
                var orderby = {

                    },
                    field = req.query.orderby || 'firstname',
                    direction = Number(req.query.direction) || 1;

                orderby[field] = direction;
                res.locals.title = 'Scouts';
                paging.find(Scouts, {}, null, orderby, 1, function (err, scouts) {
                    if (err) res.locals.error = err;

                    res.locals.result = scouts;
                    res.locals.scouts = _.map(scouts, function (scout) {
                        var bd = scout.birthdate;
                        return {
                            firstname: scout.firstname,
                            lastname: scout.lastname,
                            birthdate: helpers.Utils.dateFormat(scout.birthdate, 'MMddyyyy', '-'),
                            rank: scout.rank,
                            detailsurl: util.format('/Scouts/%s', scout._id.toString()),
                            editurl: util.format('/Scouts/Edit/%s', scout._id.toString()),
                            deleteurl: util.format('/Scouts/Delete/%s', scout._id.toString())
                        };
                    });
                    res.render('Scout/index');
                });
            }
        ],
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
                })
            }
        },
        read: [
            function (req, res, next) {
                var id = req.params.id;

                res.locals.id = id;

                Scouts.findOne({_id: id}, function (err, doc) {
                    if (err) console.log(err);


                    res.locals.scout = {
                        firstname: doc.firstname,
                        lastname: doc.lastname,
                        birthdate: helpers.Utils.dateFormat(doc.birthdate, 'yyyyMMdd', '-'),
                        rank: doc.rank,
                        editurl: util.format('/Scouts/Edit/%s', doc._id.toString()),

                    }
                    res.locals.title = 'Scout Details'

                    res.render('Scout/details');
                })
            }
        ],
        update: {
            get: function (req, res, next) {
                var id = req.params.id;

                Scouts.findOne({_id: id}, function (err, doc) {
                    if (err) console.log(err);

                    res.locals.scout = {
                        firstname: doc.firstname,
                        lastname: doc.lastname,
                        birthdate: helpers.Utils.dateFormat(doc.birthdate, 'yyyyMMdd', '-'),
                        rank: doc.rank,
                        posturl: util.format('/Scouts/Edit/%s', doc._id)
                    }

                    res.render('Scout/edit');
                });
            },
            post: function (req, res, next) {
                var scout = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    birthdate: new Date(req.body.birthdate).getTime() / 1000,
                    rank: req.body.rank,
                    datemodified: new Date(),
                    modifiedby: 'web'
                }

                Scouts.findOneAndUpdate({_id: req.params.id}, scout, {new: false}, function (err, doc) {
                    if (err) console.log(err);

                    res.redirect('/Scouts');
                })
            }
        },

        destroy: [
            function (req, res, next) {

            }
        ]
    };
}