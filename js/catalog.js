'use strict';
(function () {
  document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
  document.querySelector('.catalog__load').classList.add('visually-hidden');
  var cardList = document.querySelector('.catalog__cards');
  var cardFragment = document.createDocumentFragment();
  var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');

  window.data.cardsOfSweets.forEach(function (sweet) {
    var sweetElement = cardTemplate.cloneNode(true);
    if (sweet.amount > 5) {
      sweetElement.classList.add('card--in-stock');
    } else if (sweet.amount > 0) {
      sweetElement.classList.add('card--little');
    } else {
      sweetElement.classList.add('card--soon');
    }
    sweetElement.querySelector('.card__title').textContent = sweet.name;
    sweetElement.querySelector('img').src = sweet.picture;
    sweetElement.querySelector('.card__price').childNodes[0].textContent = sweet.price + ' ';
    sweetElement.querySelector('.card__weight').textContent = '/ ' + sweet.weight + ' Г';
    var elementRating = sweetElement.querySelector('.stars__rating');
    elementRating.classList.remove('stars__rating--five');
    elementRating.classList.add('stars__rating--one');
    if (sweet.rating.value === 1) {
      elementRating.classList.add('stars__rating--one');
    } else if (sweet.rating.value === 2) {
      elementRating.classList.add('stars__rating--two');
    } else if (sweet.rating.value === 3) {
      elementRating.classList.add('stars__rating--three');
    } else if (sweet.rating.value === 4) {
      elementRating.classList.add('stars__rating--four');
    } else {
      elementRating.classList.add('stars__rating--five');
    }
    sweetElement.querySelector('.star__count').textContent = sweet.rating.number;
    if (sweet.nutritionFacts.sugar) {
      sweetElement.querySelector('.card__characteristic').textContent = 'Содержит сахар. ' + sweet.nutritionFacts.energy + ' ккал';
    } else {
      sweetElement.querySelector('.card__characteristic').textContent = 'Без сахара. ' + sweet.nutritionFacts.energy + ' ккал';
    }
    sweetElement.querySelector('.card__composition-list').textContent = sweet.nutritionFacts.contents;
    sweetElement.querySelector('.card__btn').dataset.indexNumber = window.data.cardsOfSweets.indexOf(sweet);
    cardFragment.appendChild(sweetElement);
  });
  cardList.appendChild(cardFragment);

  /* var basketList = document.querySelector('.goods__cards');
  var basketFragment = document.createDocumentFragment();
  var basketTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');
  for (var j = 0; j < goodsInBasket.length; j++) {
    var goodInBasket = basketTemplate.cloneNode(true);
    goodInBasket.querySelector('.card-order__title').textContent = goodsInBasket[j].name;
    goodInBasket.querySelector('img').src = goodsInBasket[j].picture;
    goodInBasket.querySelector('.card-order__price').textContent = goodsInBasket[j].price + ' ₽';
    basketFragment.appendChild(goodInBasket);
  }
  basketList.appendChild(basketFragment);*/

  document.querySelector('.goods__cards').classList.remove('goods__cards--empty');
  document.querySelector('.goods__card-empty').classList.add('visually-hidden');

  document.querySelector('.catalog__load').classList.remove('visually-hidden');
  document.querySelector('.goods__card-empty').classList.remove('visually-hidden');

  cardList.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains('card__btn-favorite')) {
      evt.preventDefault();
      target.classList.toggle('card__btn-favorite--selected');
    }
  });

  var goodsInBasket = [];
  var basketList = document.querySelector('.goods__cards');
  var basketFragment = document.createDocumentFragment();
  var basketTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');

  cardList.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains('card__btn')) {
      evt.preventDefault();
      var indexOfGood = target.dataset.indexNumber;
      if (window.data.cardsOfSweets[indexOfGood].amount === 0) {
        var divEnd = document.createElement('div');
        divEnd.style.cssText = 'text-transform: uppercase; font-weight: bold; color: red; z-index: 10';
        divEnd.textContent = 'Все съели';
        target.parentNode.appendChild(divEnd);
        setTimeout(function () {
          target.parentNode.removeChild(divEnd);
        }, 3000);
      } else {
        var ind = goodsInBasket.findIndex(function (basketGood) {
          return basketGood.name === window.data.cardsOfSweets[indexOfGood].name;
        });
        if (ind === -1) {
          var newGoodIBasket = Object.assign({}, window.data.cardsOfSweets[indexOfGood]);
          newGoodIBasket.orderedAmount = 1;
          delete newGoodIBasket.amount;
          goodsInBasket.push(newGoodIBasket);
          var goodInBasket = basketTemplate.cloneNode(true);
          goodInBasket.querySelector('.card-order__title').textContent = newGoodIBasket.name;
          goodInBasket.querySelector('img').src = newGoodIBasket.picture;
          goodInBasket.querySelector('.card-order__price').textContent = newGoodIBasket.price + ' ₽';
          goodInBasket.querySelector('.card-order__count').value = newGoodIBasket.orderedAmount;
          basketFragment.appendChild(goodInBasket);
          basketList.appendChild(basketFragment);
        } else {
          goodsInBasket[ind].orderedAmount += 1;
          basketList.querySelectorAll('.card-order__count')[ind].value = goodsInBasket[ind].orderedAmount;
        }
        var orderedAmounts = [];
        goodsInBasket.forEach(function (el) {
          orderedAmounts.push(el.orderedAmount);
        });
        var totalAmount = orderedAmounts.reduce(function (result, num) {
          return result + num;
        }, 0);
        window.data.cardsOfSweets[indexOfGood].amount -= 1;
        document.querySelector('.main-header__basket').textContent = 'Сладостей в корзине: ' + totalAmount;
      }
    }
  });
}());
