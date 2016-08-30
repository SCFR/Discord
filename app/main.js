StarCitizenFR.prototype.declareListener = function() {
  require("script!../vendor/jquery.mutation-summary.js");
  StarCitizenFR.$observerSummaryRoot = $(document);
  StarCitizenFR.$observerSummaryRoot.mutationSummary("connect", StarCitizenFR.prototype.$Listener, [{ all: true }]);
}

StarCitizenFR.prototype.$Listener = function(summaries){

  var listenedElems = [];
  var modifs = summaries[0];

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

        // Prevent checking this one again.
        happendModifs.splice(index, 1);
        return;
      }
    });
  }

  ListenTo("added", StarCitizenFR.prototype.addUserPopUpInfo , "div", false, "user-popout")

  $.each(listenedElems, function(index, listener) {

    if(listener.On === "added") {
      checkForElemInArray(listener, modifs.added);
    }

  });

}


StarCitizenFR.prototype.addUserPopUpInfo = function(elem) {
  elem = $(elem);

  var body = elem.find(".body");
  body.append("<div class=\"section scfr_custom\"><div class=\"label\"><!-- react-text: 300 -->Regarde USS, Ca marche !<!-- /react-text --></div></div>");


  console.log(body);
}

StarCitizenFR.prototype.start = function () {
  StarCitizenFR.prototype.declareListener();
};

StarCitizenFR.prototype.load = function () {

};

StarCitizenFR.prototype.unload = function () {}
;

StarCitizenFR.prototype.stop = function () {
  StarCitizenFR.$observerSummaryRoot.mutationSummary("disconnect");
};

StarCitizenFR.prototype.onMessage = function () {
  //called when a message iaaa received
};

StarCitizenFR.prototype.onSwitch = function () {
  //called when a saerver or channel is switched
};

StarCitizenFR.prototype.observer = function (e) {
  //raw MutationObserver event for each mutation
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
