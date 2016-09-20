var controller = ['$scope', 'MainAPI', 'UsersAPI', '$q', '$element', '$timeout', function($scope, MainAPI, UsersAPI, $q, $element, $timeout) {
  var react = SCFRFindReact.findReact($($element).parent());
  var props = SCFRFindReact.getProps($($element).parent());

  var backup = angular.copy(react);
  //props.user.username = "DDAA";

  //react.render();
}];
