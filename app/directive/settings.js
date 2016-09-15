var directive = function() {
  return {
    template: require("html!../template/settings.tmpl.html"),
    restrict:'E',
    controller:'settings',
    replace: true,
  };
};
