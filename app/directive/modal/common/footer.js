var directive = function() {
  return {
    template: require("html!../../../template/modal/common/footer.tmpl.html"),
    restrict:'E',
    transclude:true,
    replace: true,
  };
};
