var train = require('express-train'),
    config = {
        "pkg":{
            "path": "../package.json"
        },
        "config":{
            "path": "../config/"
        },
        "logs":{
            "path": "../logs"
        },
        "views": {
            "path": "views"
        },
        "pub": {
            "path": "public"
        },
        "models": {
            "path": "models",
            "autoinject": true,
            "aggregateOn": "models"
        },
        "lib": {
            "path": "lib",
            "autoinject": true
        },
        "controllers": {
            "path": "controllers",
            "autoinject": true
        },
        "middleware": {
            "path": "middleware",
            "autoinject": true
        },
        "services": {
            "path": "services",
            "autoinject": true,
            "aggregateOn": "services"
        },
        //I think this will still work with the "pub" above being given autoinject true.....
        //I'm only doing it this way to add specificity to what we are allowing to be injected.
        "extensions": {
            "path" : "public/js/extensions",
            "autoinject" : true
        }
    };

module.exports = train(__dirname, config);