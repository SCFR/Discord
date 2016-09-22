// MAIN SETTINGS SERVICE
// HOLDS SC.FR INFORMATION FOR ALL DISCORD USER ACROSS SERVERS.
var service = ['$http', '$q', 'MainAPI', function($http, $q, MainAPI) {

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
    var cookie = $.cookie(cookie_name);

    if(cookie) {
      service.settings = cookie;
    }
    else {
      service.setCurrentCookie();
    }

    canBeginWatch = true;
  };

  service.setCurrentCookie = function() {
    $.cookie(cookie_name, service.settings, { expires: 3650, path: '/' });
  };

  service.getSetting = function(settingName) {
    // Return value and not reference
    return angular.copy(service.settings[settingName]);
  };

  init();

  return service;
}];
