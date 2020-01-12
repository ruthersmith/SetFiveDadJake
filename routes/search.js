var express = require('express');
var router = express.Router();
var jokes_with_sqlite = require('../models/jokes_with_sqlite');


router.get('/', function(req, res, next) {
    console.log(req.body);
    res.render('search', { title: 'Express' });
});

router.post('/searchJoke', function (req,res,next) {
    let param = `%${req.body.search}%`;
    let sql = 'SELECT * FROM jokes WHERE joke like ?';
    jokes_with_sqlite.get_from_db(sql, param,res);
});

router.get('/:id', function(req,res,next){
    let jokeid  = (req.params.id);
    res.render('jokepage', { id: jokeid});
});

module.exports = router;
