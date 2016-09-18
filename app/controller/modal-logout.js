var controller = ['$scope', 'MainAPI', function($scope, MainAPI) {

  $scope.doLogout = function() {
    if(MainAPI.logOut()) $scope.quitModal();
  };

}];
