SCFRFindReact = function(){};

// findReact
// Takes a dom element and tries to return its ReactInstance.
// @param elem a dom element
// @return ReactInstance or null
SCFRFindReact.findReact = function(elem) {
  // Make sure dom is a native js dom object
  var dom = $(elem)[0];

  // Search for reactInternal
  for (var key in dom)
    if (key.startsWith("__reactInternalInstance$")) {
      var compInternals = dom[key]._currentElement;
      var compWrapper = compInternals._owner;
      var comp = compWrapper._instance;
      return comp;
    }
  return null;
};

// getProps
// Takes a dom element and tries to return its properties
// @param elem a dom element
// @return properties object or null
SCFRFindReact.getProps = function(elem) {
  var react = SCFRFindReact.findReact(elem);
  if(react) return react.props;
  return null;
};

// updateComponent
// Forces update on a React Component
// @param elem a dom element or react component
// @return {boolean} whever the component was updated or not.
SCFRFindReact.updateComponent = function(elem) {
  var getType = {};
  if(elem && elem.updater && elem.updater.enqueueForceUpdate && getType.toString.call(elem.updater.enqueueForceUpdate) === '[object Function]')
    elem.updater.enqueueForceUpdate(elem);
  else if(elem) return SCFRFindReact.updateComponent(SCFRFindReact.findReact(elem));
  else return false;
};
