var directive = function() {
  return {
    template: require("html!../template/pop-out-user-info.tmpl.html"),
    restrict:'E',
    controller:'popout-user',
    scope: {
      user:'=',
    },
    replace: true,
  };
};
