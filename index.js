var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var config = require('config');
var mongoose = require('mongoose');
var router = express.Router();
var jwt = require('jsonwebtoken');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('superSecret', config.secret);

//Configurações das rotas da API RESTful
router.use(require('./app/routes/authenticate_routes'));
router.use(require('./app/routes/user_routes'));
router.use(require('./app/routes/item_routes'));
router.use(require('./app/routes/emprestimo_routes'));

app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use('/api', router);

//Conexão com servidor
var server = app.listen(3000, "0.0.0.0", function(){
  console.log(config.ambiente);
})

//Conexão com o banco de dados
mongoose.connect(config.database,{
  useMongoClient: true
});

module.exports = server;
