var controller = ['$scope', 'SettingsAPI', function($scope, SettingsAPI) {
  console.log("settings controller loaded");

  $scope.settings = SettingsAPI.settings;

  $scope.$watch('settings', function(val) {
    SettingsAPI.setCurrentCookie();
  }, true);

}];
