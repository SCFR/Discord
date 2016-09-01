var service = ['$http', '$q', function($http, $q) {
  var service = {};

  var api_url = "https://3bdce9eb.ngrok.io/wp-json/";

  service.user = {
    "isConnected": false,
    "info": {},
  }

  service.userIsConnected = function() {
    var url = api_url + "Discord/IsLoggedIn";
    var p   = $http.get(url).then( function(data) {
      if(data.data === true || data.data === "true") service.user.isConnected = true;
      service.user.isConnected = false;
    });
    service.user.isConnected = p;
  }

  service.getUserInfo = function() {
    var url = api_url + "Discord/GetUserInfo/";
    $q.when(service.user.isConnected, function() {
      if(service.user.isConnected === true) {
        var p   = $http.get(url).then( function(data) {
          if(data.data.error === false)
          service.user.info = data.data;
        });

        service.user.info = p;
      }
    });
  }

  service.attemptLogin = function(username, password) {
    var url = api_url + "Discord/Login";
    var p = $http.get(url,{params: {username:username, password:password}}).then(function(data) {
      console.log("login return");
      console.log(data);
      console.log(data.headers("Set-Cookie"));
      $q.when(service.getUserInfo(), function(){console.log(service.user);})
      return data;
    });

    return p;
  }

  init = function() {
    console.log("SCFR API init");
    service.userIsConnected();
    service.getUserInfo();
  }

  init();

  return service;
}];
