'use strict';
(function () {
  var createFilters = function (cards) {
    var quantity = document.querySelectorAll('.input-btn__item-count');
    window.util.KINDS.forEach(function (elem) {
      var kind = cards.filter(function (el) {
        return el.kind === elem;
      });
      for (var i = 0; i < quantity.length; i++) {
        if (quantity[i].parentNode.querySelector('.input-btn__label').textContent === elem) {
          quantity[i].textContent = '(' + kind.length + ')';
        }
      }
    });
    document.querySelector('.catalog__filter').addEventListener('click', function () {
      var filterCards = [];
      for (var j = 0; j <= window.util.KINDS.length; j++) {
        var kind = cards.filter(function (el) {
          return el.kind === window.util.KINDS[j];
        });
        for (var i = 0; i < quantity.length; i++) {
          if ((quantity[i].parentNode.querySelector('.input-btn__input').checked) &&
          (quantity[i].parentNode.querySelector('.input-btn__label').textContent === window.util.KINDS[j])) {
            filterCards = kind.reduce(function (coll, item) {
              coll.push(item);
              return coll;
            }, filterCards);
          }
        }
      }
    });
  };
  window.filter = {
    createFilters: createFilters,
  };
}());
