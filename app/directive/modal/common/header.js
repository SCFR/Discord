var directive = function() {
  return {
    template: require("html!../../../template/modal/common/header.tmpl.html"),
    restrict:'E',
    transclude:true,
    replace: true,
  };
};
