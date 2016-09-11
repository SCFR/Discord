var controller = ['$scope', 'UsersAPI', function($scope, UsersAPI) {

  $scope.users = UsersAPI;

  $scope.userInfo = $scope.users.getUserInfo($scope.user);

}];
