require("script!../vendor/angular.min.js");
require("script!../vendor/angular-cookies.min.js");

window.SCFR_API = "https://23e5e5a3.ngrok.io/wp-json/";
app = angular.module('scfr', []);

app.service('MainAPI', require("exports?service!./service/API.js"));
app.service('UsersAPI', require("exports?service!./service/Users.js"));
app.service('SettingsAPI', require("exports?service!./service/Settings.js"));

app.controller('modal-login', require("exports?controller!./controller/modal-login.js"));
app.controller('modal-logout', require("exports?controller!./controller/modal-logout.js"));
app.controller('popout-user', require("exports?controller!./controller/popout-user.js"));
app.controller('settings', require("exports?controller!./controller/settings.js"));
app.controller('channel-members-user', require("exports?controller!./controller/channel-members-user.js"));

app.directive("scfrPopOutUser", require("exports?directive!./directive/pop-out-user.js"));
app.directive("scfrUserScfrStatus", require("exports?directive!./directive/user-scfr-status.js"));
// Modals
  // COMMON
app.directive("scfrModalBackground", require("exports?directive!./directive/modal/common/background.js"));
app.directive("scfrModalContent", require("exports?directive!./directive/modal/common/content.js"));
app.directive("scfrModalHeader", require("exports?directive!./directive/modal/common/header.js"));
app.directive("scfrModalFooter", require("exports?directive!./directive/modal/common/footer.js"));
app.directive("scfrModalMain", require("exports?directive!./directive/modal/common/main.js"));
  // Uniques
app.directive("scfrModalLogin", require("exports?directive!./directive/modal/login.js"));
app.directive("scfrModalLogout", require("exports?directive!./directive/modal/logout.js"));

app.directive("scfrSettings", require("exports?directive!./directive/settings.js"));
app.directive("scfrSettingsCheckboxGroup", require("exports?directive!./directive/settings/checkbox-group.js"));
app.directive("scfrSettingsCheckbox", require("exports?directive!./directive/settings/checkbox.js"));
app.directive("scfrSettingsControlGroup", require("exports?directive!./directive/settings/control-group.js"));
app.directive("scfrChannelMemberUser", require("exports?directive!./directive/channel-members-user.js"));


app.controller('scfr_main', ['$scope', '$compile', 'MainAPI', function($scope, $compile, MainAPI) {
  console.log("loaded controller");
  var modal_parent = $("[ng-controller='scfr_main'] > div > span:not(.incoming-calls)");

  $scope.api = MainAPI;

  $scope.$watch("api.user.isConnected", function(val) {
    console.log("connected: " + val);
  }, true);

  $scope.addDirective = function(args) {
    if(args.elem && args.directive) {
      var newElement = $compile( args.directive )( $scope );
      $(args.elem).append( newElement );

      console.log(args);
    }
  };

  $scope.popOutLoggin = function() {
    console.log("clicked!");
    $scope.addDirective({elem: modal_parent, directive:"<scfr-modal-login></scfr-modal-login>"});
  };

  $scope.popOutLoggOut = function() {
    $scope.addDirective({elem: modal_parent, directive:"<scfr-modal-logout></scfr-modal-logout>"});
  };

  $scope.quitModal = function() {
    modal_parent.html("");
  };

  $scope.addMainSettings = function(elem) {
    $scope._settingsPanel = elem;
    var lastLeft = $(elem).find('.change-log-button-container');
    var newElement = $compile( "<div class='tab-bar-item' id='scfr-settings-tab' ng-click='displayMainSettings()'>StarCitizen.fr</div>" )( $scope );
    $(newElement).insertBefore(lastLeft);
  };


  $scope.displayMainSettings = function() {
    $(".tab-bar-item").removeClass("selected");

    $(".tab-bar-item:not(#scfr-settings-tab)").click(function() {
        $(".tab-bar-item").removeClass("selected");
    });

    var right = $($scope._settingsPanel).find('.settings-inner:not(#bd-pane) .scroller-wrap');
    $($scope._settingsPanel).find('#scfr-settings-tab').addClass('selected');

    right.html("");
    $scope.addDirective({directive:'<scfr-settings></scfr-settings>',elem: right});
  };


  $scope.broadcast = function(p) {
    if(p.event) {
      $scope.$broadcast(p.event, p.args);
    }
  };


}]);


angular.element(document).ready(function() {
  console.log("angular ok");
  angular.bootstrap(document, ['scfr']);
});





exports.app = app;
