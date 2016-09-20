var controller = ['$scope', 'MainAPI', 'UsersAPI', '$q', '$element', '$timeout', function($scope, MainAPI, UsersAPI, $q, $element, $timeout) {

  $timeout(function(){
    $scope.handleHandle();
  });

  $scope.uAPI = UsersAPI;
  var readyToListen = 0;
  $scope.hasActivity = false;



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

  $scope.memberActivityChanged = function() {

      if($scope.currentUser && $scope.currentUser.handle) {
        var root = $($element).parent("div");
        // Check for a member activity already there.
        var hasActivity = $(root).find('.member-inner .member-activity').html() ? true : false;

        console.log("has activity");
        console.log(hasActivity);
        // At this point we *will* change the dom, so we're not ready to listen.
        readyToListen--;

        // If has vanilla activity, add handle
        if(hasActivity && !($(root).find('.member-activity .scfr-handle').html() ? true : false)) $(root).find('.member-inner .member-activity').prepend("<span class='scfr-handle'>["+$scope.currentUser.handle+"] </span>");
        else {
          // Sanitize just to be sure
          readyToListen--;
          $(root).find('.member-activity .scfr-handle').remove();

          // Add our custom handle
          $(root).find(".member-inner").append("<div class='member-activity'><span class='scfr-handle'>["+$scope.currentUser.handle+"] </span></div>");
      }
    }

  };

  $scope.$on("memberActivity", function(event, user_id) {
    if(user_id == $scope.user) {
      console.log("LISTENED!"+readyToListen);
      if(readyToListen < 0) readyToListen++;
      //else $scope.memberActivityChanged();

      return false;
    }
  });

  getApiData();

}];
