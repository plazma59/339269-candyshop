'use strict';

var NAMES_OF_SWEETS = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var PICTURES_OF_SWEETS = ['img/cards/gum-cedar.jpg', 'img/cards/gum-chile.jpg', 'img/cards/gum-eggplant.jpg', 'img/cards/gum-mustard.jpg', 'img/cards/gum-portwine.jpg', 'img/cards/gum-wasabi.jpg', 'img/cards/ice-cucumber.jpg', 'img/cards/ice-eggplant.jpg', 'img/cards/ice-garlic.jpg', 'img/cards/ice-italian.jpg', 'img/cards/ice-mushroom.jpg', 'img/cards/ice-pig.jpg', 'img/cards/marmalade-beer.jpg', 'img/cards/marmalade-caviar.jpg', 'img/cards/marmalade-corn.jpg', 'img/cards/marmalade-new-year.jpg', 'img/cards/marmalade-sour.jpg', 'img/cards/marshmallow-bacon.jpg', 'img/cards/marshmallow-beer.jpg', 'img/cards/marshmallow-shrimp.jpg', 'img/cards/marshmallow-spicy.jpg', 'img/cards/marshmallow-wine.jpg', 'img/cards/soda-bacon.jpg', 'img/cards/soda-celery.jpg', 'img/cards/soda-cob.jpg', 'img/cards/soda-garlic.jpg', 'img/cards/soda-peanut-grapes.jpg', 'img/cards/soda-russian.jpg'];
var CONTENT_OF_SWEETS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];

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
var getDescription = function (cards, names, pictures, content) {
  for (var i = 0; i < cards.length; i++) {
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
};

var cardsOfSweets = [];
cardsOfSweets.length = 26;
getDescription(cardsOfSweets, NAMES_OF_SWEETS, PICTURES_OF_SWEETS, CONTENT_OF_SWEETS);

var goodsInBasket = [];
goodsInBasket.length = 3;
getDescription(goodsInBasket, NAMES_OF_SWEETS, PICTURES_OF_SWEETS, CONTENT_OF_SWEETS);

document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
document.querySelector('.catalog__load').classList.add('visually-hidden');

var cardList = document.querySelector('.catalog__cards');
var cardFragment = document.createDocumentFragment();
var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');

for (var i = 0; i < cardsOfSweets.length; i++) {
  var sweetElement = cardTemplate.cloneNode(true);
  if (cardsOfSweets[i].amount > 5) {
    sweetElement.classList.add('card--in-stock');
  } else if (cardsOfSweets[i].amount > 0) {
    sweetElement.classList.add('card--little');
  } else {
    sweetElement.classList.add('card--soon');
  }
  sweetElement.querySelector('.card__title').textContent = cardsOfSweets[i].name;
  sweetElement.querySelector('img').src = cardsOfSweets[i].picture;
  sweetElement.querySelector('.card__price').childNodes[0].textContent = cardsOfSweets[i].price + ' ';
  sweetElement.querySelector('.card__weight').textContent = '/ ' + cardsOfSweets[i].weight + ' Г';
  var elementRating = sweetElement.querySelector('.stars__rating');
  elementRating.classList.remove('stars__rating--five');
  elementRating.classList.add('stars__rating--one');
  if (cardsOfSweets[i].rating.value === 1) {
    elementRating.classList.add('stars__rating--one');
  } else if (cardsOfSweets[i].rating.value === 2) {
    elementRating.classList.add('stars__rating--two');
  } else if (cardsOfSweets[i].rating.value === 3) {
    elementRating.classList.add('stars__rating--three');
  } else if (cardsOfSweets[i].rating.value === 4) {
    elementRating.classList.add('stars__rating--four');
  } else {
    elementRating.classList.add('stars__rating--five');
  }
  sweetElement.querySelector('.star__count').textContent = cardsOfSweets[i].rating.number;
  if (cardsOfSweets[i].nutritionFacts.sugar) {
    sweetElement.querySelector('.card__characteristic').textContent = 'Содержит сахар. ' + cardsOfSweets[i].nutritionFacts.energy + ' ккал';
  } else {
    sweetElement.querySelector('.card__characteristic').textContent = 'Без сахара. ' + cardsOfSweets[i].nutritionFacts.energy + ' ккал';
  }
  sweetElement.querySelector('.card__composition-list').textContent = cardsOfSweets[i].nutritionFacts.contents;
  cardFragment.appendChild(sweetElement);
}
cardList.appendChild(cardFragment);

var basketList = document.querySelector('.goods__cards');
var basketFragment = document.createDocumentFragment();
var basketTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');
for (var j = 0; j < goodsInBasket.length; j++) {
  var goodInBasket = basketTemplate.cloneNode(true);
  goodInBasket.querySelector('.card-order__title').textContent = goodsInBasket[j].name;
  goodInBasket.querySelector('img').src = goodsInBasket[j].picture;
  goodInBasket.querySelector('.card-order__price').textContent = goodsInBasket[j].price + ' ₽';
  basketFragment.appendChild(goodInBasket);
}
basketList.appendChild(basketFragment);

document.querySelector('.goods__cards').classList.remove('goods__cards--empty');
document.querySelector('.goods__card-empty').classList.add('visually-hidden');

/* 4. Процесс перетаскивания состоит из трёх этапов: захват элемента, перемещение и отпускание.
  Пока что можем описать только отпускание, которое будет приводить к изменению значения блоков .range__price.
  Для этого добавим на каждый пин слайдера .range__btn обработчик события mouseup, который будет согласно ТЗ
  изменять границы минимальной и максимальной цены. Для начала можно считать что фильтр работает от 0 до 100.
  Например, если правый пин range__btn--right отстоит от левого края шкалы на 70%, при отпускании мыши,
  в .range__price--max должно записываться 70.*/

/* var catalogFilterBlock = getComputedStyle(document.querySelector('.catalog__filter'));
var catalogFilterBlockWidth = parseInt(catalogFilterBlock.width, 10);
 document.addEventListener('mouseup', function (evt) {
  var target = evt.target;
  var rangePrice = function () {
    return Math.round(target.offsetLeft / catalogFilterBlockWidth * 100);
  };
  if (target.classList.contains('range__btn')) {
    if (target.classList.contains('range__btn--right')) {
      document.querySelector('.range__price--max').textContent = rangePrice();
    } else if (target.classList.contains('range__btn--left')) {
      document.querySelector('.range__price--min').textContent = rangePrice();
    }
  }
  console.log(document.querySelector('.range__price--min').textContent);
});*/

/* 5.1 Описать полный цикл Drag n Drop для пина слайдера: добавить обработчики событий mousedown, mousemove и mouseup на пины. Обработчики mousemove и mouseup должны добавляться только при вызове обработчика mousedown.
Обработчик mousemove должен запускать логику изменения положения пина: в нём должны вычисляться новые координаты пина
на основании смещения, применяться через стили к элементу и записываться в поле заданной цены (с поправкой на то, что
в это поле записываются координаты середины пина).
Каждому из ползунков фильтра нужно добавить такое ограничение, чтобы они не могли быть перемещены дальше другого ползунка.
Левый ползунок не может быть правее правого ползунка и правый не может быть дальше левого.
Крайние значения для каждого из ползунков нужно определять в начале перетаскивания.
Расчёт координат пина и их запись в поле должны дублироваться и в обработчике mouseup, потому что в некоторых
случаях, пользователь может нажать мышь на слайдере, но никуда его не переместить. */

var rangeFilter = document.querySelector('.range__filter');
var rangeFilterLine = rangeFilter.querySelector('.range__fill-line');
var priceMin = document.querySelector('.range__price--min');
var priceMax = document.querySelector('.range__price--max');
var priceHandleLeft = rangeFilter.querySelector('.range__btn--left');
var priceHandleRight = rangeFilter.querySelector('.range__btn--right');

var rangeFilterCoords = rangeFilter.getBoundingClientRect();
var rangeFilterStyle = getComputedStyle(rangeFilter);
var rangeFilterStyleWidth = parseInt(rangeFilterStyle.width, 10);
var rangeButtonStyle = getComputedStyle(rangeFilter.querySelector('.range__btn'));
var rangeButtonWidth = parseInt(rangeButtonStyle.width, 10);
var allPrices = cardsOfSweets.map(function (el) {
  return el.price;
});
var maxPrice = Math.max.apply(null, allPrices);
var minPrice = Math.min.apply(null, allPrices);

var getPriceText = function (price, priceHandle) {
  price.textContent = minPrice + Math.round(parseInt((priceHandle.offsetLeft + priceHandle.offsetWidth / 2), 10) / rangeFilterStyleWidth * (maxPrice - minPrice));
};
var getCoords = function (priceHandle, evt) {
  priceHandle.style.left = evt.pageX - priceHandle.offsetWidth / 2 + 'px';
  priceHandle.style.top = rangeFilter.offsetTop + 'px';
};

getPriceText(priceMin, priceHandleLeft);
getPriceText(priceMax, priceHandleRight);

priceHandleLeft.onmousedown = function (evt) {
  moveAt(evt);
  document.body.appendChild(priceHandleLeft);
  function moveAt(e) {
    getCoords(priceHandleLeft, e);
    if (priceHandleLeft.style.left < rangeFilter.offsetLeft + 'px') {
      priceHandleLeft.style.left = rangeFilterCoords.left + 'px';
    }
    if (priceHandleLeft.style.left > priceHandleRight.offsetLeft + 'px') {
      priceHandleLeft.style.left = priceHandleRight.offsetLeft + 'px';
    }
    rangeFilterLine.style.left = priceHandleLeft.style.left;
  }
  document.onmousemove = function (event) {
    moveAt(event);
  };
  priceHandleLeft.onmouseup = function () {
    document.onmousemove = null;
    priceHandleLeft.onmouseup = null;
  };
};

priceHandleRight.onmousedown = function (evt) {
  moveAt(evt);
  document.body.appendChild(priceHandleRight);
  function moveAt(e) {
    getCoords(priceHandleRight, e);
    if (priceHandleRight.style.left > rangeFilter.offsetLeft + rangeFilterStyleWidth + 'px') {
      priceHandleRight.style.left = rangeFilterCoords.right - rangeButtonWidth + 'px';
    }
    if (priceHandleRight.style.left < priceHandleLeft.offsetLeft + 'px') {
      priceHandleRight.style.left = priceHandleLeft.offsetLeft + 'px';
    }
    rangeFilterLine.style.right = rangeFilterStyleWidth - (priceHandleRight.offsetLeft) + 'px';
  }
  document.onmousemove = function (event) {
    moveAt(event);
  };
  priceHandleRight.onmouseup = function () {
    document.onmousemove = null;
    priceHandleRight.onmouseup = null;
  };
};
