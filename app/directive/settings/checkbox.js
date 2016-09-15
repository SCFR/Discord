var directive = function() {
  return {
    template: require("html!../../template/settings/checkbox.tmpl.html"),
    restrict:'E',
    scope: {
      model:'=',
      text:'@',
      title:'@',
    },
    transclude:true,
    replace: true,
  };
};
