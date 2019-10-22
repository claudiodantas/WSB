var express = require('express')
var bodyParser = require('body-Parser')
var Livro = require('../models/livro.js')
var Periodico = require('../models/periodico.js')
var Midia = require('../models/midia.js')
var app = express()
var routes = express.Router()

//--------------------Rotas de Livros--------------------
routes.post('/livro', function (req, res) {
		var livro = new Livro({
			titulo: req.body.titulo,
			autor: req.body.autor,
		  isbn: req.body.isbn,
		  genero: req.body.genero
		})

	livro.save().then((obj) => {
		res.json({
	  	success: true,
	  	result: obj
	  })
	}, (err) => {
		res.json({
	  	success: false,
	  	result: err
	  })
	})
})

routes.get('/getLivros', function(req, res) {
  Livro.find({}, '_id titulo autor genero isbn emprestado', function(erro, livros) {
    res.json({result: livros});
  });
});

routes.delete('/livros/:id', (req, res) => {
  Livro.findByIdAndRemove(req.params.id).select('_id').exec().then(
    item => {
      if (item) {
        responder(res, true, "", item)
      } else {
        responder(res, false, "Livro não encontrado.", undefined)
      }
    }, erro => {
        responder(res, false, "Livro não encontrado.", undefined)
    })
})

//--------------------Rotas de Periódicos--------------------
routes.post('/Periodico', function (req, res) {
		var periodico = new Periodico({
			titulo: req.body.titulo,
			editora: req.body.editora,
		  codigo: req.body.codigo,
		  genero: req.body.genero
		})

	periodico.save().then((obj) => {
		res.json({
	  	success: true,
	  	result: obj
	  })
	}, (err) => {
		res.json({
	  	success: false,
	  	result: err
	  })
	})
})

routes.get('/getPeriodicos', function(req, res) {
  Periodico.find({}, '_id titulo codigo editora emprestado', function(erro, periodicos) {
    res.json({result: periodicos});
  });
});

routes.delete('/periodicos/:id', (req, res) => {
  Periodico.findByIdAndRemove(req.params.id).select('_id').exec().then(
    item => {
      if (item) {
        responder(res, true, "", item)
      } else {
        responder(res, false, "Periodico não encontrado.", undefined)
      }
    }, erro => {
        responder(res, false, "Periodico não encontrado.", undefined)
    })
})

//--------------------Rotas de Mídias Digitais--------------------
routes.post('/MDigital', function (req, res) {
		var md = new Midia({
			titulo: req.body.titulo,
			autor: req.body.autor,
		  issn: req.body.issn,
		  genero: req.body.genero
		})

	md.save().then((obj3) => {
		res.json({
	  	success: true,
	  	result: obj3
	  })
	}, (err) => {
		res.json({
	  	success: false,
	  	result: err
	  })
	})
})

routes.get('/getMDigitais', function(req, res) {
  Midia.find({}, '_id titulo autor issn genero emprestado', function(erro, midias) {
    res.json({result: midias});
  });
});

routes.delete('/mDigitais/:id', (req, res) => {
  Midia.findByIdAndRemove(req.params.id).select('_id').exec().then(
    item => {
      if (item) {
        responder(res, true, "", item)
      } else {
        responder(res, false, "Periodico não encontrado.", undefined)
      }
    }, erro => {
        responder(res, false, "Periodico não encontrado.", undefined)
    })
})

function responder(res, success=true, message="", result){
  res.json({
    success: success,
    result: result,
    message: message
  })
}

module.exports = routes;
