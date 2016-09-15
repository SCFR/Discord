var directive = function() {
  return {
    template: require("html!../../template/settings/control-group.tmpl.html"),
    restrict:'E',
    scope:{
      label:'@',
    },
    transclude: true,
    replace: true,
  };
};
