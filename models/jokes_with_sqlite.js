

const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('jokes.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected  SQlite database.');
});


let commit_to_db = function(sql,params){
    console.log("IN COMMIT DB +++++++ " + params);
    db.run(sql, params, function(err) {
        if (err) {
            console.log(err.message);
            return ;
        }
        console.log('A row has been inserted with rowid ');
    });
};

let get_from_db =  function(sql,params,res){
    db.all(sql,[],(err, rows ) => {
        // process rows here
        if (err) {
            console.log(err.message);
            return ;
        }
        console.log(rows);
        res.send(rows);
    });

};




module.exports.commit_to_db = commit_to_db;
module.exports.get_from_db = get_from_db;