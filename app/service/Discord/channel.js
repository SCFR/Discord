// MAIN USERS SERVICE
// HOLDS SC.FR INFORMATION FOR ALL DISCORD USER ACROSS SERVERS.
// AND HOLDS ORGS ASWELL
var service = ['$q', 'UsersAPI', function($q, UsersAPI) {
  var service = {
    noMembers:true,
  };

  var api_url = window.SCFR_API;
  var channelMembers;
  var channelMembersbackup;
  var membersGroups;
  var membersList;

  service.init = function() {
    if($(".channel-members-wrap").length) {
      service.noMembers = false;

      // Get React component
      channelMembers = SCFRFindReact.findReact($(".channel-members-wrap"));
      memberGroups = channelMembers.state.memberGroups;

      memberList = generateMemberList();

      // Back-up for restore.
      channelMembersbackup = angular.copy(channelMembers);


      //SCFRFindReact.updateComponent()

    }
    else service.noMembers = true;
  };

  generateMemberList = function() {
    r = [];
    angular.forEach(memberGroups, function(group) {
      angular.forEach(group.users, function(user) {
        r.push(user);
      });
    });

    return r;
  };

  service.returnWantedMembers = function(val) {

    var membergrp = [];
    var naturalSearch = [];



    angular.forEach(memberList,function(user) {
      var user_id = user.user.id;
      var user_registered = UsersAPI.getRegisteredUser(user_id);
      var org = UsersAPI.getRegisteredUserOrg(user_id);

      // Discord Nick + username
      if(naturalSearch.indexOf(user) === -1 && (user.nick && user.nick.toLowerCase().indexOf(val.toLowerCase()) >= 0) || (user.user && user.user.username && user.user.username.toLowerCase().indexOf(val.toLowerCase()) >= 0) ) naturalSearch.push(user);
      // SCFR Org
      if(naturalSearch.indexOf(user) === -1 && org && (org.SSID.toLowerCase().indexOf(val.toLowerCase()) >= 0 || org.title.toLowerCase().indexOf(val.toLowerCase()) >= 0 ) ) naturalSearch.push(user);
      // SCFR Handle
      if(naturalSearch.indexOf(user) === -1 && user_registered && (user_registered.handle.toLowerCase().indexOf(val.toLowerCase()) >= 0) ) naturalSearch.push(user);

    });

      membergrp.push({
        darken:false,
        key:"group-scfr-natural",
        sorted:true,
        title:"Résultats",
        users: naturalSearch,
      });

    return membergrp;
  };


  service.resetSearch = function() {
    channelMembers.state.memberGroups = channelMembersbackup.state.memberGroups;
    SCFRFindReact.updateComponent(channelMembers);
    service.init();
  };

  service.searchMembers = function(val) {
    if(val === "" || !val) return service.resetSearch();
    else {
      channelMembers.state.memberGroups = service.returnWantedMembers(val);
      SCFRFindReact.updateComponent(channelMembers);
    }
  };



  return service;
}];
