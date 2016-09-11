var service = ['$http', '$q', function($http, $q) {
  var service = {};

  var api_url = "https://1524dae9.ngrok.io/wp-json/";

  service.user = {
    "isConnected": false,
    "info": {},
  }

  service.userIsConnected = function() {
    var url   = api_url + "Discord/IsValidToken";
    var p     = $http.get(url,{params: { 'scfr-token': service.scfrToken }}).then( function(data) {
      if(data.data.error == false && data.data.msg == "USER_IS_LOGGED_IN") service.user.isConnected = true;
      else service.user.isConnected = false;
    });
    service.user.isConnected = p;
  }

  service.getUserInfo = function() {
    var url = api_url + "Discord/GetUserInfo/";
    $q.when(service.user.isConnected, function() {
      if(service.user.isConnected === true) {
        var p   = $http.get(url,{params:{'scfr-token': service.scfrToken}}).then( function(data) {
          console.log(data.data);
          if(data.data.error === false) service.user.info = data.data.msg;
        });

        service.user.info = p;
      }
    });
  }

  service.attemptLogin = function(username, password) {
    var url = api_url + "Discord/Login";
    var p = $http.get(url,{params: {username:username, password:password}}).then(function(data) {
      if(data.data.error === false && data.data.msg.status == "USER_TOKEN") {
        service.setNewToken(data.data.msg.token);
        $q.when(service.getUserInfo(), function(){console.log(service.user);});
      }
      return data;
    });

    return p;
  }

  service.setNewToken = function(token) {
    service.scfrToken = token;
    $.cookie("scfr-token", token, { expires: 365, path: '/' });
  }

  handleAuth = function() {
    var cookie = $.cookie("scfr-token");
    if(cookie) {
      service.scfrToken = cookie;
      service.userIsConnected();
      service.getUserInfo();
    }
    else {

    }
  }

  init = function() {
    console.log("SCFR API init");
    handleAuth();
  }

  init();

  return service;
}];
