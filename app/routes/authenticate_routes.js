var express = require('express'),
app = express(),
passport = require('passport'),
Aluno = require('../models/aluno'),
config = require('config'),
jwt = require('jsonwebtoken'),
bcrypt = require('bcrypt-nodejs'),
routes = express.Router()

// Autenticação
routes.post('/authenticate', function(req, res) {
  Aluno.findOne({matricula: req.body.matricula})
  .then((user) => {
    if (!user) {
      res.json({ success: false, message: 'Usuário não encontrado.'
    });
  } else{
    if (bcrypt.compareSync(req.body.senha, user.senha)){
      var token = jwt.sign(user._id, config.secret, {
        expiresIn: "24h"
      })
      res.json({
        success: true,
        message: "Logado com sucesso.",
        token: token
      })
    } else{
      res.json({
        success: false,
        message: "Senha incorreta."
      })
    }
  }
}, (err) => {
  retornaErro(res, err)
})
})

module.exports = routes;

// // route para mostrar uma mensagem inicial (GET http://localhost:3000/api/)
// routes.get('/', function(req, res) {
//   res.json({ message: 'Biblioteca do IFPB - Campus Picuí' });
// });
