var directive = function() {
  return {
    template: require("html!../template/pop-out-user-info.tmpl.html"),
    restrict:'E',
    scope: {
      user:'=',
    },
    replace: true,
  };
};
