var directive = function() {
  return {
    template: require("html!../template/member-list/member-status.tmpl.html"),
    restrict:'E',
    controller:'channel-members-user',
    scope: {
      user:'@',
    },
    replace: true,
  };
};
