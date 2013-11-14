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
        }
    };

module.exports = train(__dirname, config);