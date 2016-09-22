var controller = ['$scope', 'MainAPI', function($scope, MainAPI) {

  $scope.doLogout = function() {
    console.log("LOGGINGOUTTTOUT");
    if(MainAPI.logOut()) $scope.quitModal();
  };

}];
