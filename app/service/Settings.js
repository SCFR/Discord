// MAIN SETTINGS SERVICE
// HOLDS SC.FR INFORMATION FOR ALL DISCORD USER ACROSS SERVERS.
var service = ['$http', '$q', 'MainAPI', '$cookies', function($http, $q, MainAPI, $cookies) {

  var service = {
    settings: {
      displayHandle: true,
      displayOrg: true,
    },
  };

  var cookie_name = 'scfr_settings';
  var api_url = process.env.API_URL;
  var canBeginWatch = false;

  init = function() {
    var cookie = $cookies.getObject(cookie_name);
    if(cookie) {
      service.settings = cookie;
    }
    else {
      service.setCurrentCookie();
    }

    canBeginWatch = true;
  };

  service.setCurrentCookie = function() {
    $cookies.putObject(cookie_name, service.settings, {path: '/'});
  };

  service.getSetting = function(settingName) {
    // Return value and not reference
    return angular.copy(service.settings[settingName]);
  };

  init();

  return service;
}];
