var directive = function() {
  return {
    template: require("html!../template/user-scfr-status.tmpl.html"),
    restrict:'E',
    replace: true,
  };
};
