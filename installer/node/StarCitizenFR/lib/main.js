var _mainWindow;
var _utils = require("./utils");
var fs = require("fs");
var _utils2;
var domReadyHooked = false;

function SCFRDiscord(mainWindow) {
    _mainWindow = mainWindow;
    _utils2 = new _utils.Utils(mainWindow);
    hook();
}

function getUtils() {
    return _utils2;
}

function hook() {
  try {
      var webContents = getUtils().getWebContents();

      getUtils().log("Hooking dom-ready");
      webContents.on('dom-ready', domReady);

      webContents.on('did-finish-loading', function() {
          if(domReadyHooked) {
              return;
          }
          getUtils().log("Hooking did-finish-loading failsafe");
          domReady();
          getUtils().log("Hooked did-finish-loading failsafe");
      });

  }catch(err) {
      exit(err);
  }

}

function domReady() {
  domReadyHooked = true;
  var data = fs.readFileSync("resources/node_modules/StarCitizenFR/lib/StarCitizenFR.plugin.js").toString();
  _utils2.execJs(data);
}

SCFRDiscord.prototype.init = function(){};

module.exports = SCFRDiscord;
