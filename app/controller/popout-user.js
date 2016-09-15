var controller = ['$scope', 'UsersAPI', function($scope, UsersAPI) {
  console.log("scope");
  console.log($scope.user);
  console.log("_____");
  UsersAPI.getUserInfo($scope.user);
  $scope.uAPI = UsersAPI;

}];
