module.exports = function (app) {
    return {

        // Landing

        index:{
            get: function (req, res, next) {
                res.locals.title = 'hello world';
                res.render('index');
            }
        },
        login: {
            get: function(req, res, next) {

            },
            post: function(req, res, next) {

            }
        }

    };
};
