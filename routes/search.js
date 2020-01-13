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

router.post('/getJokeById', function (req,res,next) {
    let  jokeid = req.body.id;
    let sql = 'SELECT * FROM jokes WHERE joke_id like ?';
    jokes_with_sqlite.get_from_db(sql, jokeid,res);
});

router.post('/postComment', function (req,res,next) {
    console.log(req.body);
    let sql = "INSERT INTO comments(jokeid,rating,comment) VALUES(?,?,?)";
    let param = [req.body.joke_id,req.body.rating,req.body.comment,];
    jokes_with_sqlite.commit_to_db(sql,param);
});

router.post('/getComments', function (req,res,next) {
    let  jokeid = req.body.id;
    let sql = 'SELECT comment FROM comments WHERE jokeid like ?';
    jokes_with_sqlite.get_from_db(sql, jokeid,res);
});


module.exports = router;
