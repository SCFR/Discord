
  $( document ).ready(function() {
    // Needs to emulate BetterDiscord OBSERVER.
    initObserver = function() {
      mainObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (typeof StarCitizenFR.prototype.observer !== "undefined") StarCitizenFR.prototype.observer(mutation);
        });
      });

      mainObserver.observe(document, {
        childList: true,
        subtree: true
      });
    };


      StarCitizenFR.prototype.start();
      console.log(window.scfrappmain);
      initObserver();

  });
