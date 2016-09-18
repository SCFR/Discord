var directive = function() {
  return {
    template: require("html!../../../template/modal/common/content.tmpl.html"),
    restrict:'E',
    transclude:true,
    replace: true,
  };
};
