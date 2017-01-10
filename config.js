var config = {
    app:{
        port:8888
    },
    database:{
        host:'127.0.0.1',
        port:'3306',
        user:'root',
        password:'',
        database:'test'
    },
    webhook:{
        secret:'test',
        name:'MyWords'
    }
};
module.exports = config;