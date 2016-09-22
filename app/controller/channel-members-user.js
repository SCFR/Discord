var controller = ['$scope', 'MainAPI', 'UsersAPI', '$q', '$element', '$timeout','SettingsAPI', function($scope, MainAPI, UsersAPI, $q, $element, $timeout, SettingsAPI) {

  $timeout(function(){
    $scope.handleHandle();
  });

  $scope.uAPI = UsersAPI;
  var readyToListen = 0;
  $scope.hasActivity = false;

  $scope.settings = SettingsAPI.settings;


  getApiData = function() {
    $q.when(UsersAPI.getUserInfo($scope.user)).then(function(){
      $scope.currentUser = UsersAPI.users[$scope.user];
      if($scope.currentUser && $scope.currentUser.org)
      $scope.currentOrg = UsersAPI.orgs[$scope.currentUser.org];

      $scope.hasHandle = ($scope.currentUser && $scope.currentUser.handle) ? true : false;
      if($scope.hasHandle) $scope.handleHandle();
    });
  };

  $scope.handleHandle = function() {
    $scope.memberStatus = $($element).parent("div");
    $scope.memberActivityChanged();
  };

  $scope.popOutOrg = function(org, e) {

    e.stopImmediatePropagation();
  };

  $scope.memberActivityChanged = function() {

      if($scope.currentUser && $scope.currentUser.handle) {
        var root = $($element).parent("div");
        // Check for a member activity already there.
        var hasActivity = $(root).find('.member-inner .member-activity').html() ? true : false;

        // At this point we *will* change the dom, so we're not ready to listen.
        readyToListen--;
        console.log($scope.currentUser.handle);
        // If has vanilla activity, add handle
        if(hasActivity && !($(root).find('.member-activity .scfr-handle').html() ? true : false))
        $scope.$parent.addDirective({
          elem: $(root).find('.member-inner .member-activity'),
          directive: "<scfr-span-handle handle='"+$scope.currentUser.handle+"'></scfr-span-handle>",
          prepend: true,
        });
        else {
          // Sanitize just to be sure
          readyToListen--;
          $(root).find('.member-activity .scfr-handle').remove();

          // Add our custom handle
          $scope.$parent.addDirective({
            elem: $(root).find('.member-inner'),
            directive: "<div class='member-activity'><scfr-span-handle handle='"+$scope.currentUser.handle+"'></scfr-span-handle></div>",
          });
      }
    }

  };


  $scope.$on("memberActivity", function(event, user_id) {
    if(user_id == $scope.user) {
      if(readyToListen < 0) readyToListen++;
      //else $scope.memberActivityChanged();

      return false;
    }
  });

  getApiData();

}];
