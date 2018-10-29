'use strict';
(function () {
  var successHandler = function (cards) {
    window.util.GOODS = cards;
    window.catalog.createCatalog(window.util.GOODS);
    window.catalog.createBasket(cards);
    window.slider.createSlider(cards);
    window.filter.createFilters(cards);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add = 'modal--error';
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.getGoods(successHandler, errorHandler);
}());
