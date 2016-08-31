var directive = function() {
  return {
    template: require("html!../template/modal-loggin.tmpl.html"),
    restrict:'E',
    replace: true,
  };
};
