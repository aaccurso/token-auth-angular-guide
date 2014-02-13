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

  $scope.restricted = function () {
    $http({url: '/api/restricted', method: 'get'})
      .success(function (data) {
        $scope.message = 'Restricted data was: ' + data.foo;
      })
      .error(function (error) {
        alert(error);
      });
  };

  $scope.logout = function () {
    $scope.message = '';
    $scope.user = '';
    $scope.password = '';
    delete localStorage.token;
  };
}

myApp.factory('authInterceptor', function ($rootScope, $q) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // TODO Do something smarter
        alert('User not authenticated');
      }
      return response || $q.when(response);
    }
  };
});

myApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

