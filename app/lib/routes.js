//var resource = require('express-resource');
var MongoClient = require('mongodb').MongoClient;

module.exports = function (app, ApiController, HomeController, ScoutController, models) {

    // Home
    //app.resource(app.controllers.home);
    app.get('/', HomeController.index);

    // Scout
    app.get('/Scouts', ScoutController.index);
    app.get('/Scouts/Create', ScoutController.create.get);
    app.post('/Scouts', ScoutController.create.post);
    app.get('/Scouts/:id', ScoutController.read);
    app.get('/Scouts/Edit/:id', ScoutController.update.get);
    app.post('/Scouts/Edit/:id', ScoutController.update.post);
    app.del('/Scouts/Delete/:id', ScoutController.destroy);

    // Backdoor
//    app.get('/Secret', function(req, res, next) {
//        MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
//            var data = db.collection('data'),
//                states = ['California', 'Florida', 'New Mexico', 'Vermont'];
//
//                var sort = [['State', '1'], ['Temperature', '-1']],
//                    operator = { '$set': { month_high: true } },
//                    options = { new: false };
//
//                data.findAndModify({State: 'California'}, sort, operator, options, function(err, doc) {
//                    console.log(doc.State + ' set');
//                });
//
//                data.findAndModify({State: 'Florida'}, sort, operator, options, function(err, doc) {
//                    console.log(doc.State + ' set');
//                });
//
//                data.findAndModify({State: 'New Mexico'}, sort, operator, options, function(err, doc) {
//                    console.log(doc.State + ' set');
//                });
//
//                data.findAndModify({State: 'Vermont'}, sort, operator, options, function(err, doc) {
//                    console.log(doc.State + ' set');
//                });
//        })
//    });

//    // Akela
//    app.get('/Akelas', AkelaController.index);
//    app.post('/Akelas', AkelaController.create);
//    app.get('/Akelas/:id', AkelaController.read);
//    app.post('/Akelas/:id', AkelaController.update);
//    app.del('/Akelas/:id', AkelaController.destroy);

    // Achievements
//    app.get('/Achievements', AchievementController.index);
//    app.post('/Achievements', AchievementController.create);
//    app.get('/Achievements/:id', AchievementController.read);
//    app.post('/Achievements/:id', AchievementController.update);
//    app.del('/Achievements/:id', AchievementController.destroy);
//

    //Generic restful api for all models - if previous routes are not matched, will fall back to these
    //See libs/params.js, which adds param middleware to load & set req.Model based on :model argument
    app.get('/api/:model', ApiController.search);
    app.post('/api/:model', ApiController.create);
    app.get('/api/:model/:id', ApiController.read);
    app.post('/api/:model/:id', ApiController.update);
    app.del('/api/:model/:id', ApiController.destroy);


    //whenever a router parameter :model is matched, this is run
    app.param('model', function(req, res, next, model) {
        //TODO: what instead?
        var Model = models[model];
        if(Model === undefined) {
            //if the request is for a model that does not exist, 404
            return res.send(404);
        }

        req.Model = Model;
        return next();
    });
};