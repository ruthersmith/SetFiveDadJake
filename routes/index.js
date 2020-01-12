var express = require('express');
var router = express.Router();
const request = require('request');
var jokes_with_sqlite = require('../models/jokes_with_sqlite');


/* GET home page. */
router.get('/', function(req, res, next) {
  //importJokes(term);
  console.log(req.body);
  res.render('index', { title: 'Express' });
});

function importJokes(){
  let url = "https://icanhazdadjoke.com/search?term=hipster";
  request(url, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body.results);

    body.results.forEach(function (item) {
      console.log("joke 1 " + item.joke);
      let sql = "INSERT INTO jokes(joke_id,joke) VALUES(?,?)";
      jokes_with_sqlite.commit_to_db(sql,[item.id,item.joke]);
    });
  });
}

router.get('/joke/:id', function(req,res,next){
  let jokeid  = (req.params.id);
  res.render('joke', { id: jokeid});
});

router.post('/joke/getJokeComments',function (req,res,next) {
    // let sql = `SELECT * FROM comments WHERE jokeid like ?`;
    // jokes_with_sqlite.get_from_db(sql,[req.body.id],res);

  let sql = `SELECT * FROM comments WHERE jokeid like 'xc21Lmbxcib'`;
  jokes_with_sqlite.get_from_db(sql,[req.body.id],res);
});


router.post('/joke/submitComment',function (req,res,next) {
  let sql = "INSERT INTO comments(jokeid,rating,comment) VALUES(?,?,?)";
  let values = [req.body.jokeid,req.body.rate,req.body.comment];
  console.log(req.body);
  jokes_with_sqlite.commit_to_db(sql,values);
});


router.post('/getJokesfromdb', function(req, res, next) {
  let sql = "SELECT * FROM jokes";
  jokes_with_sqlite.get_from_db(sql,[],res);
});


module.exports = router;
