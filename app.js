const http = require('http');
const fs   = require('fs');
const url  = require('url');
const mysql = require('./mysql');
//加载配置文件
const config = require('./config');

var server = http.createServer(function (req, res) {
    let params = url.parse(req.url,true);
    console.log('request pathname:'+params.pathname);
    if(params.pathname == '/'){
        let html  = fs.readFileSync('mywords.html');
        res.write(html);
        res.end();
    }else if(params.pathname =='/save'){
        //jsonP
        if(params.query.errorCode == 0){
            mysql.save(params.query.query,params.query['translation[]']);
            msg = 'success! save=['+params.query.query+']' ;
        }else{
            msg = 'nothingToDo!';
        }
        res.end(params.query.callback+"("+JSON.stringify({msg:msg})+")");
    }else{
        res.writeHead(404);
        res.end();
    }
});

server.listen(8888,'0.0.0.0',()=>{
    console.log('Server running at http://127.0.0.1:8888/');
});

