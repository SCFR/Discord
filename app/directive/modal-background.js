var directive = function() {
  return {
    template: require("html!../template/modal.tmpl.html"),
    restrict:'E',
    replace: true,
  };
};
