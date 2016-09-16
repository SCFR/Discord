var controller = ['$scope', 'MainAPI', function($scope, MainAPI) {

  $scope.login = {
    username:'',
    password:'',
  };

  $scope.validate = {};

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
      MainAPI.attemptLogin($scope.login.username, $scope.login.password);
    }
  };

}];
