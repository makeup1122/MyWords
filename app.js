const http = require('http');
const fs   = require('fs');
const url  = require('url');
const mysql = require('./mysql');
//加载配置文件
const config = require('./config');

var server = http.createServer(function (req, res) {
    var par = url.parse(req.url,true);
    console.log('request pathname:'+par.pathname);
    if(par.pathname == '/'){
        var html  = fs.readFileSync('index.html');
        res.write(html);
        res.end();
    }else if(par.pathname =='/save'){
        //jsonP
        if(par.query.errorCode == 0){
            mysql.save(par.query.query,par.query['translation[]']);
            msg = 'success! save=['+par.query.query+']' ;
        }else{
            msg = 'nothingToDo!';
        }
        res.end(par.query.callback+"("+JSON.stringify({msg:msg})+")");
    }else{
        res.writeHead(404);
        res.end();
    }
});

server.listen(23544,'0.0.0.0',function(){
    console.log('Server running at http://0.0.0.0:'+server.address().port+'/');
});

