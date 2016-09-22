var directive = function() {
  return {
    template: require("html!../../template/member-list/span-handle.tmpl.html"),
    restrict:'E',
    scope: {
      handle:'@',
    },
    controller: [ "$scope", function($scope) {
      $scope.settings = $scope.$parent.settings;
      $scope.selectText = $scope.$parent.selectText;
      
      $scope.clickHandle = function($event) {
        var target;

        if($(event.target).is(".scfr-actual-handle")) target = $($event.target)[0];
        else target = $($event.target).find(".scfr-actual-handle")[0];

        $scope.selectText(target);
        $event.stopImmediatePropagation();
      };

    }],
    replace: true,
  };
};
