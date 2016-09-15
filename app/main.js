StarCitizenFR.prototype.addUserPopUpInfo = function(elem) {
  elem = $(elem);
  var userID = BdApi.getUserIdByName(elem.find('span.username').html());
  var body = elem.find(".body");

  console.log("append");
  console.log(userID[0]);
  console.log("____");
  StarCitizenFR.prototype.appendDirective(body, "<scfr-pop-out-user user='"+userID[0]+"'></scfr-pop-out-user>");
}

StarCitizenFR.prototype.addMainSettings = function(elem) {
  StarCitizenFR.prototype.callAngularFunction("scfr_main","addMainSettings",elem);
}

StarCitizenFR.prototype.appendDirective = function(elem, directive) {
  return StarCitizenFR.prototype.callAngularFunction("scfr_main", "addDirective", {elem: elem, directive: directive});
}

StarCitizenFR.prototype.start = function () {
  StarCitizenFR.prototype.angularBootstrap();
  StarCitizenFR.prototype.addSCFRStatus();
};

StarCitizenFR.prototype.addSCFRStatus = function() {
  var account = $('.channels-wrap');
  StarCitizenFR.prototype.appendDirective(account, "<scfr-user-scfr-status></scfr-user-scfr-status>");
}

StarCitizenFR.prototype.callAngularFunction = function(controller, func, args) {
  var scope = $("[ng-controller='"+controller+"']").scope();
  scope[func](args);
  scope.$apply();
}

StarCitizenFR.prototype.angularBootstrap = function() {
  $("#app-mount").attr("ng-controller", "scfr_main");
  StarCitizenFR.$app = require("./app.js").app;
}

StarCitizenFR.prototype.load = function () {

};

StarCitizenFR.prototype.unload = function () {};

StarCitizenFR.prototype.stop = function () {};

StarCitizenFR.prototype.onMessage = function () {
  //called when a message iaaa received
};

StarCitizenFR.prototype.onSwitch = function () {
  //called when a saerver or channel is switched
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
  }

  ListenTo = function(on, callback, type, id, className) {
    listenedElems.push({On: on, Callback: callback, elemType: type, elemId: id, elemClass: className});
  }

  checkForElemInArray = function(listenered, happendModifs) {
    $.each(happendModifs, function(index, testElem) {
      if(isElem(testElem, listenered.elemType, listenered.elemId, listenered.elemClass)) {
        // callBack
        listenered.Callback(testElem);
        return;
      }
      else {
        checkForElemInArray(listenered, testElem.childNodes);
      }
    });
  }

  ListenTo("added", StarCitizenFR.prototype.addUserPopUpInfo , "div", false, "user-popout")
  ListenTo("added", StarCitizenFR.prototype.addMainSettings , "form", false, "user-settings-modal")

  $.each(listenedElems, function(index, listener) {

    if(listener.On === "added") {
      checkForElemInArray(listener, modifs.addedNodes);
    }

  });
};

StarCitizenFR.prototype.getSettingsPanel = function () {
  return "Settings Panel";
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
