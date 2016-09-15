// MAIN USERS SERVICE
// HOLDS SC.FR INFORMATION FOR ALL DISCORD USER ACROSS SERVERS.
var service = ['$http', '$q', 'MainAPI', function($http, $q, MainAPI) {
  var service = {
    users: {},
  };

  var api_url = window.SCFR_API;

  fetchUser = function(discord_id) {
    console.log(discord_id);
    var url   = api_url + "Discord/User/"+discord_id;

    $http.get(url,{params:{'scfr-token': MainAPI.scfrToken}}).then(function(data) {
      if(data.data && data.data.error === false) service.users[discord_id] = data;
      else service.users[discord_id] = "NOT_REGISTERED";
    });

    service.users[discord_id] = $q.defer();
  }

  service.getUserInfo = function(discord_id, force) {
    console.log(discord_id);
    if(!service.users[discord_id] || force) service.users[discord_id] = fetchUser(discord_id);
    //return service.users[discord_id];
  }

  return service;
}];
