var directive = function() {
  return {
    template: require("html!../template/channel-members-user.tmpl.html"),
    restrict:'E',
    controller:'channel-members-user',
    scope: {
      user:'@',
    },
    replace: true,
  };
};
