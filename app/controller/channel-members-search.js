var controller = ['$scope', '$q', 'DiscordChannelAPI', function($scope, $q, channel) {

  channel.init();

  $scope.$watch("search", function(val) {
    if(val === "") channel.resetSearch();
    channel.searchMembers(val);
  });

  $scope.$on("channelChanged", function(e) {
    channel.init();    
  });

}];
