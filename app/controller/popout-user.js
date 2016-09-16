var controller = ['$scope', 'UsersAPI', function($scope, UsersAPI) {
  
  UsersAPI.getUserInfo($scope.user);
  $scope.uAPI = UsersAPI;

}];
