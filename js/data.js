'use strict';

(function () {
  var getRandomMinMax = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var getRandomArray = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };
  var getRandomBoolean = function () {
    return Boolean(Math.round(Math.random()));
  };
  var findUnique = function (arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
      var str = arr[i];
      obj[str] = true;
    }
    return Object.keys(obj);
  };
  var getDescription = function (names, pictures, content, length) {
    var cards = [];
    for (var i = 0; i < length; i++) {
      cards[i] = {};
      cards[i].name = names[getRandomArray(names)];
      cards[i].picture = pictures[getRandomArray(pictures)];
      cards[i].amount = getRandomMinMax(0, 20);
      cards[i].price = getRandomMinMax(100, 1500);
      cards[i].weight = getRandomMinMax(30, 300);
      cards[i].rating = {};
      cards[i].rating.value = getRandomMinMax(1, 5);
      cards[i].rating.number = getRandomMinMax(10, 900);
      cards[i].nutritionFacts = {};
      cards[i].nutritionFacts.sugar = getRandomBoolean();
      cards[i].nutritionFacts.energy = getRandomMinMax(70, 500);
      var contentPoint = [];
      contentPoint.length = getRandomMinMax(1, content.length);
      for (var j = 0; j < contentPoint.length; j++) {
        contentPoint[j] = content[getRandomArray(content)];
      }
      cards[i].nutritionFacts.contents = findUnique(contentPoint).join(', ');
    }
    return cards;
  };

  var cardsOfSweets = getDescription(window.util.NAMES_OF_SWEETS, window.util.PICTURES_OF_SWEETS, window.util.CONTENT_OF_SWEETS, window.util.CARDS_OF_SWEETS_LENGTH);
  // var goodsInBasket = getDescription(window.util.NAMES_OF_SWEETS, window.util.PICTURES_OF_SWEETS, window.util.CONTENT_OF_SWEETS, window.util.GOODS_IN_BASKET_LENGTH);

  window.data = {
    cardsOfSweets: cardsOfSweets,
  };
}());
