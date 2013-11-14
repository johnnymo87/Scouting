
module.exports = function (app, models) {
    var controller = {},
        user = "API",
        applyMeta = function(model, isNew) {
            if (isNew) {
                model.datecreated = new Date();
                model.createdby = user;
            }

            model.datemodified = new Date();
            model.modifiedby = user;
        };

    /*
     Generic CRUD functions for any model
     */
    controller.search = [
        /*
         route functions get 3 args - the request object, the response object, and next - a callback to move on
         to the next middleware.
         req.query = json object with query string arguments
         req.params = json object with values of routing params such as :model or :id
         req.body = json request body from post / put requests
         */
        function (req, res, next) {
            var query = req.query,
                model = models[req.params.Model];

            //req.Model is a value I set in libs/params.js
            model.find(query, function (err, docs) {
                if (err) return next(err);
                return res.json(docs);
            });
        }
    ]
    controller.create = [
        function (req, res, next) {
            var model = new models[req.params.Model](req.body);
            applyMeta(model, true);
            model.save(function (err, doc) {
                if (err) return next(err);
                return res.json(doc);
            })
        }
    ]
    controller.read = [
        function (req, res, next) {
            var id = req.params.id,
                model = models[req.params.Model];
            model.findById(id, function (err, doc) {
                if (err) return next(err);
                if (doc === null) return res.send(404);
                return res.json(doc);
            });
        }
    ]
    controller.update = [
        function (req, res, next) {
            var id = req.params.id,
                model = models[req.params.Model];
            //default update is a full replace
            //may want to give attribute replacement instead?
            applyMeta(req.body, false);
            model.findByIdAndUpdate(id, req.body, function (err, doc) {
                if (err) return next(err);
                if (doc === null) return res.send(404);
                return res.json(doc);
            })
        }
    ]
    controller.destroy = [
        function (req, res, next) {
            var id = req.params.id,
                model = models[req.params.Model];
            model.findByIdAndRemove(id, function (err, doc) {
                if (err) return next(err);
                if (doc === null) return res.send(404);
                return res.send(204);
            })
        }
    ]

    return controller;
}