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

  var createSlider = function (cards) {
    var allPrices = cards.map(function (el) {
      return el.price;
    });
    var maxPrice = Math.max.apply(null, allPrices);
    var minPrice = Math.min.apply(null, allPrices);

    var getPriceTextMin = function (price, priceHandle) {
      price.textContent = minPrice + Math.round(parseInt((priceHandle.offsetLeft), 10) / rangeFilterStyleWidth * (maxPrice - minPrice));
      return price.textContent;
    };
    var getPriceTextMax = function (price, priceHandle) {
      price.textContent = minPrice + Math.round(parseInt((priceHandle.offsetLeft), 10) / rangeFilterStyleWidth * (maxPrice - minPrice));
      return price.textContent;
    };
    getPriceTextMin(priceMin, priceHandleLeft);
    getPriceTextMax(priceMax, priceHandleRight);

    var priceList = [];
    var createPrices = function () {
      priceList = [];
      cards.forEach(function (el) {
        if (el.price >= +getPriceTextMin(priceMin, priceHandleLeft) && el.price <= +getPriceTextMax(priceMax, priceHandleRight)) {
          priceList.push(el);
        }
      });
    };
    createPrices();

    document.querySelector('.range__count').textContent = '(' + priceList.length + ')';

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
        getPriceTextMin(priceMin, priceHandleLeft);
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
        priceHandleRight.style.left = newLeft + rangeButtonWidth + 'px';
        rangeFilterLine.style.right = rangeFilter.offsetWidth - priceHandleRight.offsetLeft + 'px';
        getPriceTextMax(priceMax, priceHandleRight);
      }
      function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
      }
    };
    priceHandleRight.ondragstart = function () {
      return false;
    };
    document.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.classList.contains('catalog__submit')) {
        evt.preventDefault();
        priceMin.textContent = minPrice;
        priceMax.textContent = maxPrice;
        priceHandleLeft.style.left = 0 + 'px';
        rangeFilterLine.style.left = priceHandleLeft.style.left;
        priceHandleRight.style.left = rangeFilterStyleWidth + 'px';
        rangeFilterLine.style.right = rangeFilter.offsetWidth - priceHandleRight.offsetLeft + 'px';
        document.querySelector('.range__count').textContent = '(' + cards.length + ')';
      }
    });
    return priceList;
  };
  window.slider = {
    createSlider: createSlider
  };
}());
