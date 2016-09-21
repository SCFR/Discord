require("script!../vendor/angular.min.js");
require("script!../vendor/angular-cookies.min.js");

window.SCFR_API = "https://5d8ce93c.ngrok.io/wp-json/";
app = angular.module('scfr', []);

app.service('MainAPI', require("exports?service!./service/API.js"));
app.service('UsersAPI', require("exports?service!./service/Users.js"));
app.service('SettingsAPI', require("exports?service!./service/Settings.js"));
app.service('DiscordChannelAPI', require("exports?service!./service/Discord/channel.js"));

app.controller('modal-login', require("exports?controller!./controller/modal-login.js"));
app.controller('modal-logout', require("exports?controller!./controller/modal-logout.js"));
app.controller('popout-user', require("exports?controller!./controller/popout-user.js"));
app.controller('settings', require("exports?controller!./controller/settings.js"));
app.controller('channel-members-user', require("exports?controller!./controller/channel-members-user.js"));
app.controller('channel-members-search', require("exports?controller!./controller/channel-members-search.js"));

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
app.directive("scfrChannelMemberUser", require("exports?directive!./directive/member-list/channel-members-user.js"));
app.directive("scfrChannelMemberSearch", require("exports?directive!./directive/member-list/channel-members-search.js"));
app.directive("scfrSpanHandle", require("exports?directive!./directive/member-list/span-handle.js"));


app.controller('scfr_main', ['$scope', '$compile', 'MainAPI', '$q', function($scope, $compile, MainAPI, $q) {
  var modal_parent = $("[ng-controller='scfr_main'] > div > span:not(.incoming-calls)");

  $scope.api = MainAPI;

  var scfrIsbs = false;

  var childrenDirectives = [];


  $scope.$watch('api.user.isConnected', function(val) {
    if(val === true && scfrIsbs === false) {
      scfrIsbs = true;
      StarCitizenFR.prototype.appBootStrap();
    }

    if(val === false && scfrIsbs === true) {
      scfrIsbs = false;
      unBootStrap();
    }
  });

  shouldAddDirective = function() {
    return $scope.api.user.isConnected;
  };

  stockElement = function(elem) {
    childrenDirectives.push(elem);
  };

  unBootStrap = function() {
    angular.forEach(childrenDirectives, function(elem) {
        var scope = $(elem).scope();
        if(scope) {
          //scope.$destroy();
          elem.remove();
        }
    });
  };

  $scope.addDirective = function(args) {
    if(args.elem && args.directive) {
      $q.when(shouldAddDirective()).then(function(isConnected) {
        if(isConnected || args.force) {
          var newElement = $compile( args.directive )( $scope );

          if(args.force !== true) stockElement(newElement);

          if(args.prepend) $(args.elem).prepend( newElement );
          else $(args.elem).append( newElement );
        }
      });
    }
  };

  $scope.channelChanged = function() {

  };

  $scope.popOutLoggin = function() {
    $scope.addDirective({elem: modal_parent, directive:"<scfr-modal-login></scfr-modal-login>", force: true});
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
      $q.when(shouldAddDirective()).then(function(isConnected) {
        if(isConnected || args.force) $scope.$broadcast(p.event, p.args);
      });
    }
  };


}]);


angular.element(document).ready(function() {
  angular.bootstrap(document, ['scfr']);
});





exports.app = app;
