var controller = ['$scope', 'MainAPI', function($scope, MainAPI) {

  $scope.login = {
    username:'',
    password:'',
  };

  $scope.error = noError = {
    username: false,
    password: false,
  };

  $scope.validate = {
    username: true,
    password: true,
  };

  $scope.$watch('login.username', function(val) {
    if (val.length < 3)
      $scope.validate.username = false;
    else $scope.validate.username = true;
  });

  $scope.$watch('login.password', function(val) {
    if(val || val.length > 1)
      $scope.validate.password = true;
    else $scope.validate.password = false;
  });

  $scope.doLogin = function() {
    if($scope.validate.username && $scope.validate.password) {
      $scope.error = angular.copy(noError);
      $scope.busy = true;
      MainAPI.attemptLogin($scope.login.username, $scope.login.password).then(function(data) {
        if(data === true) $scope.quitModal();
        else {
          if(data.msg == "LOGIN_ERROR_PASSWORD") $scope.error.password = true;
          else $scope.error.username = true;
        }

      $scope.busy = false;
      });
    }

  };

  $scope.canValidate = function() {
    return (!$scope.busy && $scope.validate.username && $scope.validate.password);
  };
}];
