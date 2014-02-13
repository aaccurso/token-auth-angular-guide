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
    .success(function (tokenWrapper) {
      localStorage.token = tokenWrapper.token;

      // Token is XXXX.YYYYYY.ZZZ Y: Encoded Profile
      var encodedProfile = tokenWrapper.token.split('.')[1];

      var userData = JSON.parse(url_base64_decode(encodedProfile));
      $scope.message = 'Welcome ' + userData.firstName + ' ' +
        userData.lastName + '!';
    })
    .error(function (error) {
      alert(error);
    });
  };
}
