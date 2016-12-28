const http = require('http');
const fs   = require('fs');
const url  = require('url');

var server = http.createServer(function (req, res) {
    let params = url.parse(req.url,true);
    if(params.pathname == '/'){
        let html  = fs.readFileSync('mywords.html');
        res.write(html);
        res.end();
    }else{
        //jsonP
        res.end(params.query.callback+"("+JSON.stringify({'dsadsadasdas':'libing'})+")");
    }
});

server.listen(8888,'0.0.0.0',()=>{
    console.log('Server running at http://127.0.0.1:8888/');
});

