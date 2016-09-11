// MAIN USERS SERVICE
// HOLDS SC.FR INFORMATION FOR ALL DISCORD USER ACROSS SERVERS.
var service = ['$http', '$q', 'MainAPI', function($http, $q, MainAPI) {
  var service = {};

  service.users = {};
  var api_url = window.SCFR_API;

  service.fetchUser = function(discord_id) {
    var url   = api_url + "Discord/User/"+discord_id;
    var p     = $http.get(url,{params:{'scfr-token': MainAPI.scfrToken}}).then( function(data) {
      if(data.data.error === false) service.users[discord_id] = data.data;
      else service.users[discord_id] = "NOT_REGISTERED";
    });
    service.users[discord_id] = p;
  }

  service.getUserInfo = function(discord_id, force) {
    if(!service.users[discord_id] || force) service.fetchUser(discord_id);
    return service.users[discord_id];
  }

  return service;
}];
