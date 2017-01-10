const http = require('http');
const fs   = require('fs');
const url  = require('url');
const mysql = require('./mysql');
const webhookHandler = require('github-webhook-handler');
var webhook = webhookHandler({path:'/webhook',secret:config.webhook.secret})
//加载配置文件
const config = require('./config');
//创建Server
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
//webhook事件
webhook.on('error',function(err){
    console.log("error:",err.message);
})
webhook.on('push',function(event){
    console.log(event);
})
//监听端口
server.listen(config.app.port,'0.0.0.0',function(){
    console.log('Server running at http://0.0.0.0:'+server.address().port+'/');
});

