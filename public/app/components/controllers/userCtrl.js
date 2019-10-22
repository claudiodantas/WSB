wsb.controller('userCtrl', UserController)

function UserController($scope, $rootScope, $routeParams, $location, authSvc, apiSvc) {
  var self = this;
  self.nome = "";
  self.matricula = "";
  self.curso = "";
  self.email = "";
  self.senha = "";
  self.evento = "";
  self.mensagem = "";
  self.mensagem2 = "";
  self.esconder = "sr-only";

  self.cadastrar =  function(){
    if(self.nome == "" || self.matricula == "" || self.curso == "" || self.email =="" || self.senha==""){
      self.esconder = "";
      self.evento = "alert-danger"
      self.mensagem = "Erro! "
      self.mensagem2 = "Cadastro inválido";
      console.log("Erro!");
    }else{
      authSvc.cadastrar(self.nome, self.matricula, self.curso, self.email, self.senha)
      .then(function(res){
          console.log("Usuário cadastrado!");
          $location.path('/getUsuarios');
      }, function(erro){
          self.esconder = "";
          self.evento = "alert-danger"
          self.mensagem = "Erro! "
          self.mensagem2 = "Cadastro inválido";
          console.log("Erro!");
      })
    }
  }

  self.excluirUsuario = function (id) {
    apiSvc.excluirUsuario(id)
    .then(function(res) {
      self.getUsuarios();
      $location.path('/getUsuarios');
    }, function(erro){
      console.log("erro ao excluir");
    })
  }


  self.cancelar = function(){
    self.nome = "";
    self.matricula = "";
    self.curso = "";
    self.email = "";
    self.senha = "";
  }

  self.getAlunos = function(){
    apiSvc.getUsuarios()
    .then(function(res) {
      self.alunos = res.data.result;
      console.log(self.alunos)
    }, function(erro) {
      console.log("erro");
    })
  }
}
