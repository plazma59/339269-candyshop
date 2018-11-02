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
    var sugar = cards.filter(function (el) {
      return el.nutritionFacts.sugar === false;
    });
    var gluten = cards.filter(function (el) {
      return el.nutritionFacts.gluten === false;
    });
    var vegetarian = cards.filter(function (el) {
      return el.nutritionFacts.vegetarian === true;
    });
    for (var i = 0; i < quantity.length; i++) {
      if (quantity[i].parentNode.querySelector('.input-btn__label').textContent === window.util.QUALITIES[0]) {
        quantity[i].textContent = '(' + sugar.length + ')';
      }
      if (quantity[i].parentNode.querySelector('.input-btn__label').textContent === window.util.QUALITIES[1]) {
        quantity[i].textContent = '(' + vegetarian.length + ')';
      }
      if (quantity[i].parentNode.querySelector('.input-btn__label').textContent === window.util.QUALITIES[2]) {
        quantity[i].textContent = '(' + gluten.length + ')';
      }
    }
    var createFilterCatalog = function () {
      var filterCards = [];
      var createKinds = function () {
        for (var j = 0; j <= window.util.KINDS.length; j++) {
          var kind = cards.filter(function (el) {
            return el.kind === window.util.KINDS[j];
          });
          for (i = 0; i < quantity.length; i++) {
            if ((quantity[i].parentNode.querySelector('.input-btn__input').checked) &&
            (quantity[i].parentNode.querySelector('.input-btn__label').textContent === window.util.KINDS[j])) {
              filterCards = kind.reduce(function (coll, item) {
                coll.push(item);
                return coll;
              }, filterCards);
            }
          }
        }
        window.catalog.createCatalog(filterCards);
      };
      var createQualities = function (array) {
        var quality = document.querySelectorAll('.catalog__filter')[1];
        if (quality.children[0].querySelector('.input-btn__input').checked) {
          array = array.filter(function (el) {
            return !el.nutritionFacts.sugar;
          });
        }
        if (quality.children[1].querySelector('.input-btn__input').checked) {
          array = array.filter(function (el) {
            return el.nutritionFacts.vegetarian;
          });
        }
        if (quality.children[2].querySelector('.input-btn__input').checked) {
          array = array.filter(function (el) {
            return !el.nutritionFacts.gluten;
          });
        }
        window.catalog.createCatalog(array);
      };
      createKinds();
      if (filterCards.length === 0) {
        createQualities(cards);
      } else {
        createQualities(filterCards);
      }
    };

    var createCatalogAgain = function () {
      var count = 0;
      for (i = 0; i < quantity.length; i++) {
        if (!(quantity[i].parentNode.querySelector('.input-btn__input').checked)) {
          count++;
        }
      }
      if (count === quantity.length) {
        window.catalog.createCatalog(cards);
      }
    };
    document.addEventListener('click', createFilterCatalog);
    document.addEventListener('click', createCatalogAgain);
  };
  window.filter = {
    createFilters: createFilters,
  };
}());
