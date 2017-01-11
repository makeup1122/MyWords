const mysql = require('mysql');
const config = require('./config');
var connection = mysql.createConnection(config.database);
connection.connect();
exports.select = function (sql) {
    if (sql == null || sql == '') { return false; }
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ', rows[0].word);
    });
    connection.end(); 
}
exports.save = function (query, translation, callback) {
    if (query == null || query == '') { return false; }
    // connection.connect();
    has_query_history(query, function (id) {
        // console.log(id);
        if (id) {
            var sql = 'update mywords set times = times+1 ,last_time=unix_timestamp(now()) where id = "' + id + '"';
            // console.log(sql);
            connection.query(sql, function (err, rows, fields) {
                if (err) throw err;
                // console.log('The solution is: ', rows[0].word);
            });
        } else {
            var sql = "INSERT INTO `test`.`mywords`(`word`,`translation`,`last_time`)VALUES('" + query.trim() + "','" + translation.trim() + "',unix_timestamp(now()));";
            // console.log(sql);
            connection.query(sql, function (err, rows, fields) {
                if (err) throw err;
                // console.log('The solution is: ', rows[0].word);
            });
        }
    });
}
function has_query_history(query, callback) {
    var sql = 'select id from mywords where word = "' + query.trim() + '"';
    // console.log(sql);
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err;
        if (rows == '' || rows[0].id <= 0) {
            callback(null);
        } else {
            callback(rows[0].id);
        }
    });
    // connection.end();
}
