var directive = function() {
  return {
    template: require("html!../template/modal-loggin.tmpl.html"),
    restrict:'E',
    controller:'modal-loggin',
    replace: true,
  };
};
