print_output = function(val, replace) {
  if(replace) document.getElementById('process').innerHTML = val+"<br />";
  else document.getElementById('process').innerHTML += val+"<br />";
};

var asar = require('asar');
var wrench = require('wrench');
var fs = require('fs');
var registry = require('winreg');
var fkill = require('fkill');


var _discord_path;
var _appFolder = "/app";
var _appArchive = "/app.asar";
var _packageJson = _appFolder + "/package.json";
var _index = _appFolder + "/index.js";

var betterDiscord = false;

set_discord_path = function(reg) {
  var re = /"(.*)Discord\.exe"/;
  regex = re.exec(reg);

  if(regex[1]) _discord_path = regex[1]+"/resources";
};

defer = function(promise, callback) {
  if(typeof promise !== "undefined") callback();
  else window.setTimeOut(defer(promise, callback), 50);
};

instal = function() {

  var _discord_dir = new registry({
    hive: registry.HKCU,
    key: '\\SOFTWARE\\Classes\\Discord\\DefaultIcon',
  });

  _discord_dir.values(function(e, items) {
    if(!e) for (var i=0; i<items.length; i++) if(items[i].key == '\\SOFTWARE\\Classes\\Discord\\DefaultIcon') {set_discord_path(items[i].value);}
    fs.exists( _discord_path , function(exists) {
     if(!exists || _discord_dir === "" || !_discord_dir) print_output("NO DISCORD");
     else {

       print_output("Found discord");

      fkill('Discord.exe', {force:true}).then(function() {
        print_output("killed lol");
        if(fs.existsSync(_discord_path + "/node_modules/BetterDiscord")) {
          betterDiscord = true;
        }

        if(fs.existsSync(_discord_path + _appFolder + "/node_modules/StarCitizenFR")) {
           print_output("Deleting " + _discord_path + _appFolder + "/node_modules/StarCitizenFR" + " folder.");
           wrench.rmdirSyncRecursive(_discord_path + _appFolder + "/node_modules/StarCitizenFR");
           print_output("Deleted " + _discord_path + _appFolder + "/node_modules/StarCitizenFR" + " folder.");
       }

       if(!betterDiscord) {
         if(fs.existsSync(_discord_path + _appFolder)) {
             print_output("Deleting " + _discord_path + _appFolder + " folder.");
             wrench.rmdirSyncRecursive(_discord_path + _appFolder);
             print_output("Deleted " + _discord_path + _appFolder + " folder.");
         }

         print_output("Looking for app archive");
         if(fs.existsSync(_discord_path + _appArchive) && !betterDiscord) {
           print_output("App archive found at: " + _discord_path + _appArchive);
         }

         print_output("Extracting app archive");
         asar.extractAll(_discord_path + _appArchive, _discord_path + _appFolder);
       }

       print_output("Copying Plugin");
       //fs.mkdirSync(_discord_path + "/node_modules");
       fs.mkdirSync(_discord_path + _appFolder + "/node_modules/StarCitizenFR");
       wrench.copyDirSyncRecursive(__dirname + "/StarCitizenFR/", _discord_path + _appFolder + "/node_modules/StarCitizenFR", {forceDelete: true});


      fs.exists(_discord_path + _appFolder, function(exists) {
        if(exists) {
          print_output("Extracted to: " + _discord_path + _appFolder);
          print_output("Injecting index.js");

          var data = fs.readFileSync(_discord_path + _index).toString();

          data = data.replace("_interopRequireDefault(_GPUSettings);", "_interopRequireDefault(_GPUSettings);\nvar _StarCitizenFR = require('StarCitizenFR');\nvar _StarCitizenFR2;");
          data = data.replace("Utils.setFocused(mainWindow.isFocused());", "Utils.setFocused(mainWindow.isFocused());\n_StarCitizenFR2 = new _StarCitizenFR(mainWindow);");

          fs.writeFile(_discord_path + _index, data, function(err) {
            if(err) return print_output(err);
            print_output("Injected index.js");

            print_output("Fin de l'installation. Vous pouvez fermer l'installateur et démarer Discord !", true);
          });
        }
      });

       //var splice = fs.readFileSync("splice");


      });


     }
   });
  });

};


instal();
