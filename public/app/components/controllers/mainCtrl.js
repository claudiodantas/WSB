wsb.controller('mainCtrl', MainCtrl);

function MainCtrl($scope, $rootScope, $routeParams, $location, apiSvc, authSvc) {

self.sair = function () {
  authSvc.logout();
  $location.path('/login');
  }
}
