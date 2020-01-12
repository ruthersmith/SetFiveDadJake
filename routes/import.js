var express = require('express');
var router = express.Router();
const request = require('request');
var jokes_with_sqlite = require('../models/jokes_with_sqlite');


router.get('/', function(req, res, next) {
    res.render('import');
});

router.post('/importJoke', function f(req,res,next) {
    console.log(req.body);
    importJokes(req.body.joke_to_get,res);
});

function importJokes(term='',res){
    let url = "https://icanhazdadjoke.com/search?term=" + term;
    makeTheRequest(url,res);
}

function makeTheRequest(url,res) {
    request(url, { json: true }, (err, response, body) => {
        if (err) {
            return  console.log(err);
        }
        res.send(body.results);
        saveJokesTodb(body);
    });
}

function saveJokesTodb(body){
    body.results.forEach(function (item) {
        console.log("joke 1 " + item.joke);
        let sql = "INSERT INTO jokes(joke_id,joke) VALUES(?,?)";
        jokes_with_sqlite.commit_to_db(sql,[item.id,item.joke]);
    });
}

module.exports = router;