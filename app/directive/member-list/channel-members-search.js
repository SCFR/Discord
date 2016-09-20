var directive = function() {
  return {
    template: require("html!../../template/member-list/channel-members-search.tmpl.html"),
    restrict:'E',
    controller:'channel-members-search',
    replace: true,
  };
};
