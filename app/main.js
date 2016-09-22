StarCitizenFR.prototype.addUserPopUpInfo = function(elem) {
  elem = $(elem);
  var userID = StarCitizenFR.prototype.getUserIdyElem(elem);
  var body = elem.find(".body");

  StarCitizenFR.prototype.appendDirective(body, "<scfr-pop-out-user user='"+userID+"'></scfr-pop-out-user>");
};

StarCitizenFR.prototype.getUserIdyElem = function(elem) {
  var props = SCFRFindReact.getProps(elem);
  if(props && props.user) return props.user.id;
  return null;
};

StarCitizenFR.prototype.addMainSettings = function(elem) {
  StarCitizenFR.prototype.callAngularFunction("scfr_main","addMainSettings",elem);
};

StarCitizenFR.prototype.hookMemberStatus = function(elem) {
  if(elem && !$(elem).find(".scfr-member-status").html() ? true : false) {
    var user_id = StarCitizenFR.prototype.getUserIdyElem( elem );
    StarCitizenFR.prototype.appendDirective(elem, "<scfr-channel-member-user user='"+user_id+"'></scfr-channel-member-user>");
  }
};

StarCitizenFR.prototype.hookAllMembersStatus = function() {
  $("div.member.member-status").each(function() {
    StarCitizenFR.prototype.hookMemberStatus($(this));
  });
};


StarCitizenFR.prototype.memberActivity = function(elem, modifs) {
    var user_id = StarCitizenFR.prototype.getUserIdyElem( elem );
    return StarCitizenFR.prototype.callAngularFunction("scfr_main", "broadcast", {event: "memberActivity", args: user_id});
};

StarCitizenFR.prototype.appendDirective = function(elem, directive, force, prepend) {
  return StarCitizenFR.prototype.callAngularFunction("scfr_main", "addDirective", {elem: elem, directive: directive, force: force, prepend: prepend});
};

StarCitizenFR.prototype.start = function () {
  StarCitizenFR.prototype.angularBootstrap();
  StarCitizenFR.prototype.addSCFRStatus();
  StarCitizenFR.prototype.initObserver();

  //StarCitizenFR.prototype.appBootStrap();
};

StarCitizenFR.prototype.hookSearchBar = function() {
  StarCitizenFR.prototype.appendDirective($('.channel-members-wrap'), "<scfr-channel-member-search></scfr-channel-member-search>", false, true);
};

StarCitizenFR.prototype.appBootStrap = function() {
  StarCitizenFR.prototype.hookAllMembersStatus();
  StarCitizenFR.prototype.hookSearchBar();
};

StarCitizenFR.prototype.addSCFRStatus = function() {
  var account = $('.channels-wrap');
  StarCitizenFR.prototype.appendDirective(account, "<scfr-user-scfr-status></scfr-user-scfr-status>", true);
};

StarCitizenFR.prototype.callAngularFunction = function(controller, func, args) {
  var scope = $("[ng-controller='"+controller+"']").scope();
  if(scope) {
    scope[func](args);
    if(scope && !scope.$$phase) scope.$apply();
  }
  else window.setTimeout(function() {
    StarCitizenFR.prototype.callAngularFunction(controller, func, args);
  }, 1000);
};

StarCitizenFR.prototype.init = function() {
  StarCitizenFR.prototype.handleBetterDiscord();
};

StarCitizenFR.prototype.handleBetterDiscord = function() {
  function defer() {
    if (window.jQuery) StarCitizenFR.prototype.start();
    else setTimeout(function() { defer(); }, 50);
  }

  function loadScript(url, callback) {
    var script = document.createElement("script");
      script.type = "text/javascript";

        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    if(typeof bdVersion !== "undefined") betterDiscord = true;
    else betterDiscord = false;

  if(!betterDiscord) loadScript("https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js", function () { StarCitizenFR.prototype.start(); });
  else defer();

};


StarCitizenFR.prototype.observer = function (e) {
  //raw MutationObserver event for each mutation
  var listenedElems = [];
  var modifs = e;

  isElem = function(elem, type, id, className) {
    elem = $(elem);
    if(type && !elem.is(type)) return false;
    if(id && elem.attr('id') !== id) return false;
    if(className && !elem.hasClass(className)) return false;

    return true;
  };

  ListenTo = function(on, callback, type, id, className) {
    listenedElems.push({On: on, Callback: callback, elemType: type, elemId: id, elemClass: className});
  };

  checkForElemInArray = function(listenered, happendModifs) {
    $.each(happendModifs, function(index, testElem) {
      if(isElem(testElem, listenered.elemType, listenered.elemId, listenered.elemClass)) {
        // callBack
        listenered.Callback(testElem, modifs);
        return;
      }
      else {
        checkForElemInArray(listenered, testElem.childNodes);
      }
    });
  };

  ListenTo("added", StarCitizenFR.prototype.addUserPopUpInfo , "div", false, "user-popout");
  ListenTo("added", StarCitizenFR.prototype.addMainSettings , "form", false, "user-settings-modal");
  ListenTo("added", StarCitizenFR.prototype.hookMemberStatus , "div", false, "member-status");

  ListenTo("added", StarCitizenFR.prototype.memberActivity , "div", false, "member-activity");
  ListenTo("removed", StarCitizenFR.prototype.memberActivity , "div", false, "member-activity");
  if(modifs.target.classList.contains('title-wrap') || modifs.target.classList.contains('chat')) StarCitizenFR.prototype.callAngularFunction("scfr_main", "broadcast", {event: "channelChanged"});

  $.each(listenedElems, function(index, listener) {

    if(listener.On === "added") {
      checkForElemInArray(listener, modifs.addedNodes);
      checkForElemInArray(listener, modifs.removedNodes);
    }

  });

  //console.log(modifs);
//removedNodes:
//div.member-activity
};

StarCitizenFR.prototype.initObserver = function() {
  mainObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (typeof StarCitizenFR.prototype.observer !== "undefined") StarCitizenFR.prototype.observer(mutation);
    });
  });

  mainObserver.observe(document, {
    childList: true,
    subtree: true
  });
};

StarCitizenFR.prototype.angularBootstrap = function() {
  $("#app-mount").attr("ng-controller", "scfr_main");
  StarCitizenFR.$app = require("./app.js").app;
};

StarCitizenFR.prototype.getName = function () {
  return "StarCitizenFR";
};

StarCitizenFR.prototype.getDescription = function () {
  return "This is the Description";
};

StarCitizenFR.prototype.getVersion = function () {
  return "0.1.0";
};

StarCitizenFR.prototype.getAuthor = function () {
  return "Super d";
};
