'use strict';

(function () {
  var rangeFilter = document.querySelector('.range__filter');
  var rangeFilterLine = rangeFilter.querySelector('.range__fill-line');
  var priceMin = document.querySelector('.range__price--min');
  var priceMax = document.querySelector('.range__price--max');
  var priceHandleLeft = rangeFilter.querySelector('.range__btn--left');
  var priceHandleRight = rangeFilter.querySelector('.range__btn--right');
  var rangeFilterCoords = rangeFilter.getBoundingClientRect();
  var rangeFilterStyle = getComputedStyle(rangeFilter);
  var rangeButtonStyle = getComputedStyle(rangeFilter.querySelector('.range__btn'));
  var rangeFilterStyleWidth = parseInt(rangeFilterStyle.width, 10);
  var rangeButtonWidth = parseInt(rangeButtonStyle.width, 10);
  var priceHandleCenter = rangeButtonWidth / 2;
  var allPrices = window.data.cardsOfSweets.map(function (el) {
    return el.price;
  });
  var maxPrice = Math.max.apply(null, allPrices);
  var minPrice = Math.min.apply(null, allPrices);

  var getPriceText = function (price, priceHandle) {
    price.textContent = minPrice + Math.round(parseInt((priceHandle.offsetLeft + priceHandleCenter), 10) / rangeFilterStyleWidth * (maxPrice - minPrice));
  };
  getPriceText(priceMin, priceHandleLeft);
  getPriceText(priceMax, priceHandleRight);

  priceHandleLeft.onmousedown = function (evt) {
    evt.preventDefault();
    var priceHandleLeftCoords = priceHandleLeft.getBoundingClientRect();
    var shiftX = event.clientX - priceHandleLeftCoords.left;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    function onMouseMove(event) {
      var newLeft = event.clientX - shiftX - rangeFilterCoords.left;
      if (newLeft < 0) {
        newLeft = 0;
      }
      if (newLeft > priceHandleRight.offsetLeft) {
        newLeft = priceHandleRight.offsetLeft;
      }
      priceHandleLeft.style.left = newLeft + 'px';
      rangeFilterLine.style.left = priceHandleLeft.style.left;
      getPriceText(priceMin, priceHandleLeft);
    }
    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  };
  priceHandleLeft.ondragstart = function () {
    return false;
  };

  priceHandleRight.onmousedown = function (evt) {
    evt.preventDefault();
    var priceHandleRightCoords = priceHandleRight.getBoundingClientRect();
    var shiftX = event.clientX - priceHandleRightCoords.left;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    function onMouseMove(event) {
      var newLeft = event.clientX - shiftX - rangeFilterCoords.left;
      var rightEdge = rangeFilter.offsetWidth - priceHandleRight.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }
      if (newLeft < priceHandleLeft.offsetLeft) {
        newLeft = priceHandleLeft.offsetLeft;
      }
      priceHandleRight.style.left = newLeft + 'px';
      rangeFilterLine.style.right = rangeFilter.offsetWidth - priceHandleRight.offsetLeft + 'px';
      getPriceText(priceMax, priceHandleRight);
    }
    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  };
  priceHandleRight.ondragstart = function () {
    return false;
  };
}());
