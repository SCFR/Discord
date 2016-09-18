var directive = function() {
  return {
    template: require("html!../../template/modal/login.tmpl.html"),
    restrict:'E',
    controller:'modal-login',
    replace: true,
  };
};
