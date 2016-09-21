var directive = function() {
  return {
    template: require("html!../../template/member-list/span-handle.tmpl.html"),
    restrict:'E',
    scope: {
      handle:'@',
      settings:'@',
    },
    replace: true,
    controller: [ "$scope", function($scope) {
      $scope.settings = $scope.$parent.settings;
    }],
  };
};
