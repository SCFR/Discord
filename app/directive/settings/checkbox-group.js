var directive = function() {
  return {
    template: require("html!../../template/settings/checkbox-group.tmpl.html"),
    restrict:'E',
    transclude: true,
    replace: true,
  };
};
