var service = ['$http', '$q', function($http, $q) {
  var service = {};

  var api_url = process.env.API_URL;
  service.user = {
    "isConnected": false,
    "info": {},
  };
  defaultUser = angular.copy(service.user);

  service.userIsConnected = function() {
    var url   = api_url + "Discord/IsValidToken";
    var p     = $http.get(url,{params: { 'scfr-token': service.scfrToken }}).then( function(data) {
      if(data.data.error === false && data.data.msg == "USER_IS_LOGGED_IN") service.user.isConnected = true;
      else service.user.isConnected = false;
    });
    service.user.isConnected = p;
  };

  service.getUserInfo = function() {
    var url = api_url + "Discord/GetUserInfo/";
    $q.when(service.user.isConnected, function() {
      if(service.user.isConnected === true) {
        var p   = $http.get(url,{params:{'scfr-token': service.scfrToken}}).then( function(data) {
          if(data.data.error === false) service.user.info = data.data.msg;
        });

        service.user.info = p;
      }
    });
  };

  service.attemptLogin = function(username, password) {
    var url = api_url + "Discord/Login";
    var p = $http.get(url,{params: {username:username, password:password}}).then(function(data) {
      if(data.data.error === false && data.data.msg.status == "USER_TOKEN") {
        service.setNewToken(data.data.msg.token);
        service.user.isConnected = true;
        $q.when(service.getUserInfo(), function(){});
        return true;
      }
      return data.data;
    });

    return p;
  };

  service.logOut = function() {
    if($.removeCookie("scfr-token", {path: '/'})) {
      service.user = angular.copy(defaultUser);
      return true;
    }
    return false;
  };

  service.setNewToken = function(token) {
    service.scfrToken = token;
    $.cookie("scfr-token", token, { expires: 365, path: '/' });
  };

  handleAuth = function() {
    var cookie = $.cookie("scfr-token");
    if(cookie) {
      service.scfrToken = cookie;
      service.userIsConnected();
      service.getUserInfo();
    }
    else {
    }
  };

  init = function() {
    handleAuth();
  };

  init();

  return service;
}];
