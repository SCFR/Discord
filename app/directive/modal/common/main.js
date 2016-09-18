var directive = function() {
  return {
    template: require("html!../../../template/modal/common/main.tmpl.html"),
    restrict:'E',
    transclude:true,
    replace: true,
  };
};
