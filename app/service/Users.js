// MAIN USERS SERVICE
// HOLDS SC.FR INFORMATION FOR ALL DISCORD USER ACROSS SERVERS.
// AND HOLDS ORGS ASWELL
var service = ['$http', '$q', 'MainAPI', function($http, $q, MainAPI) {
  var service = {
    users: {},
    orgs: {},
  };

  var api_url = process.env.API_URL;

  fetchUser = function(discord_id) {
    var url   = api_url + "Discord/User/"+discord_id;

    var p = $http.get(url,{params:{'scfr-token': MainAPI.scfrToken}}).success(function(data) {
      if(data && data.error === false) service.users[discord_id] = handleUserData(data.msg);
      else service.users[discord_id] = "NOT_REGISTERED";

      return service.users[discord_id];
    });
    return p;
  };

  fetchOrg = function(ssid) {
    var url   = api_url + "Discord/Org/"+ssid;

    $http.get(url,{params:{'scfr-token': MainAPI.scfrToken}}).then(function(data) {
      if(data.data && data.data.error === false) service.orgs[ssid] = data;
      else service.orgs[ssid] = "NOT_REGISTERED";
    });

    service.orgs[ssid] = $q.defer();
  };

  service.getUsersInGuild = function(ssid) {

  };

  service.getGuildsBySSIDOrName = function(value) {

  };

  service.getRegisteredUser = function(discord_id) {
    if(service.users[discord_id] && service.users[discord_id] !== "NOT_REGISTERED") return service.users[discord_id];
    return false;
  };

  service.getRegisteredUserOrg = function(discord_id) {
    var user = service.getRegisteredUser(discord_id);
    if(user && user.org && service.orgs[user.org] && service.orgs[user.org] !== "NOT_REGISTERED") return service.orgs[user.org];
    return false;
  };

  handleUserData = function(data) {
    if(data.org && data.org.SSID) {
      var sid = data.org.SSID;
      service.orgs[data.org.SSID] = data.org;
      data.org = sid;
    }
    return data;
  };

  service.getUserInfo = function(discord_id, force) {
    if(!service.users[discord_id] || force) return fetchUser(discord_id);
    return service.users[discord_id];
  };

  service.getOrgInfo = function(ssid, force) {
    if(!service.orgs[ssid] || force) service.orgs[ssid] = fetcOrg(ssid);
    return service.orgs[ssid];
  };

  return service;
}];
