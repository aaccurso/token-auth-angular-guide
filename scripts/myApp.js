var myApp = angular.module('myApp', []);

function LoginController($scope, $http) {
  $scope.user = '';
  $scope.password = '';
  $scope.message = '';
  $scope.submit = function () {
    $http.post('/authenticate', {
      user: $scope.user,
      password: $scope.password
    })
    .success(function (userData) {
      $scope.message = 'Welcome ' + userData.firstName + ' ' +
        userData.lastName + '!';
    })
    .error(function (error) {
      alert(error);
    });
  };
}
