var express = require('express');
var router = express.Router();
var jokes_with_sqlite = require('../models/jokes_with_sqlite');


router.get('/', function(req, res, next) {
    console.log(req.body);
    res.render('front', { title: 'Express' });
});
