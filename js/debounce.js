'use strict';
(function () {
  var lastTimeout;
  var removeDebounce = function (func) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, window.util.DEBOUNCE_INTERVAL);
  };
  window.debounce = {
    removeDebounce: removeDebounce
  };
})();
