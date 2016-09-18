var directive = function() {
  return {
    template: require("html!../../template/modal/logout.tmpl.html"),
    restrict:'E',
    controller:'modal-logout',
    replace: true,
  };
};
