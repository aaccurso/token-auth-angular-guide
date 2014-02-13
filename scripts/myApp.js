var myApp = angular.module('myApp', []);

var savedToken;

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
      savedToken = tokenWrapper.token;

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

  $scope.restricted = function () {
    $http({url: '/api/restricted', method: 'get', headers: { Authorization: 'Bearer ' + savedToken}})
      .success(function (data) {
        $scope.message = 'Restricted data was: ' + data.foo;
      })
      .error(function (error) {
        alert(error);
      });
  };
}
