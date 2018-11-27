'use strict';
(function () {
  document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
  var fieldSets = document.querySelectorAll('fieldset');
  var cardList = document.querySelector('.catalog__cards');
  var deleteCatalog = function () {
    while (cardList.children[1]) {
      cardList.removeChild(cardList.children[1]);
    }
  };
  var createCatalog = function (cards) {
    window.catalog.deleteCatalog();
    document.querySelector('.catalog__load').classList.add('visually-hidden');
    fieldSets.forEach(function (el) {
      el.setAttribute('disabled', 'true');
    });
    var cardFragment = document.createDocumentFragment();
    var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
    for (var i = 0; i < cards.length; i++) {
      var sweetElement = cardTemplate.cloneNode(true);
      if (cards[i].amount > 5) {
        sweetElement.classList.add('card--in-stock');
      } else if (cards[i].amount > 0) {
        sweetElement.classList.add('card--little');
      } else {
        sweetElement.classList.add('card--soon');
      }
      sweetElement.querySelector('.card__title').textContent = cards[i].name;
      sweetElement.querySelector('img').src = '../candyShop/img/cards/' + cards[i].picture;
      sweetElement.querySelector('.card__price').childNodes[0].textContent = cards[i].price + ' ';
      sweetElement.querySelector('.card__weight').textContent = '/ ' + cards[i].weight + ' Г';
      var elementRating = sweetElement.querySelector('.stars__rating');
      elementRating.classList.remove('stars__rating--five');
      elementRating.classList.add('stars__rating--one');
      if (cards[i].rating.value === 1) {
        elementRating.classList.add('stars__rating--one');
      } else if (cards[i].rating.value === 2) {
        elementRating.classList.add('stars__rating--two');
      } else if (cards[i].rating.value === 3) {
        elementRating.classList.add('stars__rating--three');
      } else if (cards[i].rating.value === 4) {
        elementRating.classList.add('stars__rating--four');
      } else {
        elementRating.classList.add('stars__rating--five');
      }
      sweetElement.querySelector('.star__count').textContent = cards[i].rating.number;
      if (cards[i].nutritionFacts.sugar) {
        sweetElement.querySelector('.card__characteristic').textContent = 'Содержит сахар. ' + cards[i].nutritionFacts.energy + ' ккал';
      } else {
        sweetElement.querySelector('.card__characteristic').textContent = 'Без сахара. ' + cards[i].nutritionFacts.energy + ' ккал';
      }
      sweetElement.querySelector('.card__composition-list').textContent = cards[i].nutritionFacts.contents;
      sweetElement.querySelector('.card__btn').dataset.indexNumber = i;
      sweetElement.querySelector('.card__btn-favorite').dataset.indexNumber = i;
      window.filter.favouriteList.forEach(function (el) {
        if (el === cards[i]) {
          sweetElement.querySelector('.card__btn-favorite').classList.add('card__btn-favorite--selected');
        }
      });
      cardFragment.appendChild(sweetElement);
    }
    if (cards.length === 0) {
      var emptyTemplate = document.querySelector('#empty-filters').content.querySelector('.catalog__empty-filter').cloneNode(true);
      cardList.appendChild(emptyTemplate);
    } else {
      cardList.appendChild(cardFragment);
    }
  };
  document.querySelector('.goods__cards').classList.remove('goods__cards--empty');

  cardList.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains('card__btn-favorite')) {
      evt.preventDefault();
      target.classList.toggle('card__btn-favorite--selected');
    }
  });

  var createBasket = function (cards) {
    var goodsInBasket = [];
    var countAmounts = function () {
      var orderedAmounts = [];
      goodsInBasket.forEach(function (el) {
        orderedAmounts.push(el.orderedAmount);
      });
      var totalAmount = orderedAmounts.reduce(function (result, num) {
        return result + num;
      }, 0);
      return totalAmount;
    };
    var countSum = function () {
      var orderedSum = [];
      goodsInBasket.forEach(function (el) {
        orderedSum.push(el.orderedAmount * el.price);
      });
      var totalSum = orderedSum.reduce(function (result, num) {
        return result + num;
      }, 0);
      return totalSum;
    };
    var basketList = document.querySelector('.goods__cards');
    var basketFragment = document.createDocumentFragment();
    var basketTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');
    cardList.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.classList.contains('card__btn')) {
        evt.preventDefault();
        var nameOfGood = target.parentNode.parentNode.parentNode.querySelector('.card__title').textContent;
        var indexOfGood;
        cards.forEach(function (el) {
          if (el.name === nameOfGood) {
            indexOfGood = cards.indexOf(el);
          }
        });
        if (cards[indexOfGood].amount === 0) {
          var divEnd = document.createElement('div');
          divEnd.style.cssText = 'text-transform: uppercase; font-weight: bold; color: red; z-index: 10';
          divEnd.textContent = 'Все съели';
          target.parentNode.appendChild(divEnd);
          setTimeout(function () {
            target.parentNode.removeChild(divEnd);
          }, 3000);
        } else {
          var ind = goodsInBasket.findIndex(function (basketGood) {
            return basketGood.name === cards[indexOfGood].name;
          });
          if (ind === -1) {
            var newGoodIBasket = Object.assign({}, cards[indexOfGood]);
            newGoodIBasket.indexOfGood = indexOfGood;
            newGoodIBasket.orderedAmount = 1;
            delete newGoodIBasket.amount;
            goodsInBasket.push(newGoodIBasket);
            var goodInBasket = basketTemplate.cloneNode(true);
            goodInBasket.querySelector('.card-order__title').textContent = newGoodIBasket.name;
            goodInBasket.querySelector('img').src = '../candyShop/img/cards/' + newGoodIBasket.picture;
            goodInBasket.querySelector('.card-order__price').textContent = newGoodIBasket.price + ' ₽';
            goodInBasket.querySelector('.card-order__count').value = newGoodIBasket.orderedAmount;
            basketFragment.appendChild(goodInBasket);
            basketList.appendChild(basketFragment);
          } else {
            goodsInBasket[ind].orderedAmount += 1;
            basketList.querySelectorAll('.card-order__count')[ind].value = goodsInBasket[ind].orderedAmount;
          }
          countAmounts();
          cards[indexOfGood].amount -= 1;
          document.querySelector('.main-header__basket').textContent = 'Сладостей в корзине: ' + countAmounts();
          if (goodsInBasket.length > 0) {
            document.querySelector('.goods__card-empty').classList.add('visually-hidden');
            document.querySelector('.goods__total').classList.remove('visually-hidden');
            document.querySelector('.goods__total-count').childNodes[0].textContent = 'Итого за ' + countAmounts() + ' товаров:';
            document.querySelector('.goods__total-count').childNodes[1].textContent = countSum() + ' ₽';
            fieldSets.forEach(function (el) {
              el.removeAttribute('disabled');
            });
          }
        }
      }
    });
    basketList.addEventListener('click', function (evt) {
      evt.preventDefault();
      var target = evt.target;
      if (target.classList.contains('card-order__btn--increase')) {
        var basketIncrease = target.parentNode.parentNode.parentNode.querySelector('.card-order__title').textContent;
        goodsInBasket.forEach(function (el) {
          if (el.name === basketIncrease && cards[el.indexOfGood].amount > 0) {
            el.orderedAmount += 1;
            cards[el.indexOfGood].amount -= 1;
            basketList.querySelectorAll('.card-order__count')[goodsInBasket.indexOf(el)].value = el.orderedAmount;
          }
        });
      }
      if (target.classList.contains('card-order__btn--decrease')) {
        var basketDecrease = target.parentNode.parentNode.parentNode.querySelector('.card-order__title').textContent;
        goodsInBasket.forEach(function (el) {
          if (el.name === basketDecrease) {
            if (el.orderedAmount === 1) {
              cards[el.indexOfGood].amount += el.orderedAmount;
              goodsInBasket.splice(goodsInBasket.indexOf(el), 1);
              basketList.removeChild(target.parentNode.parentNode.parentNode);
            } else {
              el.orderedAmount -= 1;
              cards[el.indexOfGood].amount += 1;
              basketList.querySelectorAll('.card-order__count')[goodsInBasket.indexOf(el)].value = el.orderedAmount;
            }
          }
        });
      }
      if (target.classList.contains('card-order__close')) {
        var basketDeleted = target.parentNode.querySelector('.card-order__title').textContent;
        goodsInBasket.forEach(function (el) {
          if (el.name === basketDeleted) {
            cards[el.indexOfGood].amount += el.orderedAmount;
            goodsInBasket.splice(goodsInBasket.indexOf(el), 1);
            basketList.removeChild(target.parentNode);
          }
        });
      }
      countAmounts();
      document.querySelector('.main-header__basket').textContent = 'Сладостей в корзине: ' + countAmounts();
      document.querySelector('.goods__total-count').childNodes[0].textContent = 'Итого за ' + countAmounts() + ' товаров:';
      document.querySelector('.goods__total-count').childNodes[1].textContent = countSum() + ' ₽';
      if (goodsInBasket.length === 0) {
        document.querySelector('.goods__card-empty').classList.remove('visually-hidden');
        document.querySelector('.goods__total').classList.add('visually-hidden');
        fieldSets.forEach(function (el) {
          el.setAttribute('disabled', 'true');
        });
      }
    });
  };

  window.catalog = {
    createCatalog: createCatalog,
    createBasket: createBasket,
    deleteCatalog: deleteCatalog
  };
}());
