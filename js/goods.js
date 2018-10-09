'use strict';

var NAMES_OF_SWEETS = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var PICTURES_OF_SWEETS = ['img/cards/gum-cedar.jpg', 'img/cards/gum-chile.jpg', 'img/cards/gum-eggplant.jpg', 'img/cards/gum-mustard.jpg', 'img/cards/gum-portwine.jpg', 'img/cards/gum-wasabi.jpg', 'img/cards/ice-cucumber.jpg', 'img/cards/ice-eggplant.jpg', 'img/cards/ice-garlic.jpg', 'img/cards/ice-italian.jpg', 'img/cards/ice-mushroom.jpg', 'img/cards/ice-pig.jpg', 'img/cards/marmalade-beer.jpg', 'img/cards/marmalade-caviar.jpg', 'img/cards/marmalade-corn.jpg', 'img/cards/marmalade-new-year.jpg', 'img/cards/marmalade-sour.jpg', 'img/cards/marshmallow-bacon.jpg', 'img/cards/marshmallow-beer.jpg', 'img/cards/marshmallow-shrimp.jpg', 'img/cards/marshmallow-spicy.jpg', 'img/cards/marshmallow-wine.jpg', 'img/cards/soda-bacon.jpg', 'img/cards/soda-celery.jpg', 'img/cards/soda-cob.jpg', 'img/cards/soda-garlic.jpg', 'img/cards/soda-peanut-grapes.jpg', 'img/cards/soda-russian.jpg'];
var CONTENT_OF_SWEETS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
// var CARDS_OF_SWEETS_LENGTH = 26;
var GOODS_IN_BASKET_LENGTH = 3;

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

// var cardsOfSweets = getDescription(NAMES_OF_SWEETS, PICTURES_OF_SWEETS, CONTENT_OF_SWEETS, CARDS_OF_SWEETS_LENGTH);
var cardList = document.querySelector('.catalog__cards');

var successHandler = function (cardsOfSweets) {
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
    sweetElement.querySelector('img').src = '../candyShop/img/cards/' + cardsOfSweets[i].picture;
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
    sweetElement.querySelector('.card__btn').dataset.indexNumber = i;
    cardFragment.appendChild(sweetElement);
  }
  cardList.appendChild(cardFragment);
  return cardsOfSweets;
  // userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

var errorHandler = function (errorMessage) {
  var node = document.createElement('div');
  node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  node.style.position = 'absolute';
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = '30px';

  node.textContent = errorMessage;
  document.body.insertAdjacentElement('afterbegin', node);
};

window.backend(successHandler, errorHandler);

var goodsInBasket = getDescription(NAMES_OF_SWEETS, PICTURES_OF_SWEETS, CONTENT_OF_SWEETS, GOODS_IN_BASKET_LENGTH);


document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
document.querySelector('.catalog__load').classList.add('visually-hidden');

/* for (var i = 0; i < cardsOfSweets.length; i++) {
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
  sweetElement.querySelector('.card__btn').dataset.indexNumber = i;
  cardFragment.appendChild(sweetElement);
}
cardList.appendChild(cardFragment);*/

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

// module4-task1

/* убрать все карточки товаров, показанные на странице в списке товаров и в корзине и показать сообщения о пустых блоках,
В случае со списком товаров нужно показать сообщение о загрузке списка товаров,
в случае с корзиной — сообщение о том, что блок ещё пустой.*/

document.querySelector('.catalog__load').classList.remove('visually-hidden');
document.querySelector('.goods__card-empty').classList.remove('visually-hidden');

/* var hidden = basketList.querySelectorAll('.goods_card');
for (var i = 0; i < hidden.lendth; i++) {
   hidden[i].classList.add('visually-hidden');
}*/

/* 1. Добавление выбранного товара в избранное.
При нажатии на кнопку избранного .card__btn-favorite в карточке товара,
этой кнопке должен добавляться класс card__btn-favorite--selected,
который помечал бы её как избранную.*/

cardList.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.classList.contains('card__btn-favorite')) {
    evt.preventDefault();
    target.classList.toggle('card__btn-favorite--selected');
  }
});

/* 2.Добавление выбранного товара в корзину и управление товаром в корзине
   Для корзины и для списка товаров должно существовать две независимых структуры данных.
   В корзину должны копироваться объекты из списка товаров, например с помощью метода Object.assign,
   Объект товара в корзине и в списке должны отличаться. Например объект, который описывает
   товар в корзине, должен иметь свойство для записи количества товара (например orderedAmount).
   Убрать у товара в корзине поля, которые не используются(оставшееся количество товара).
   Проверить, есть ли товар с таким именем в корзине и, если есть, вместо добавления увеличить кол-во на 1.
   В корзину невозможно добавить больше товаров, чем amount - обновлять amount у соответствующего товара.
   При изменении количества товаров в корзине обновлять блок корзины в шапке .main-header__basket.*/

cardList.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.classList.contains('card__btn')) {
    evt.preventDefault();
    var indexOfGood = target.dataset.indexNumber;
    if (successHandler.cardsOfSweets[indexOfGood].amount === 0) {
      var divEnd = document.createElement('div');
      divEnd.style.cssText = 'text-transform: uppercase; font-weight: bold; color: red; z-index: 10';
      divEnd.textContent = 'Все съели';
      target.parentNode.appendChild(divEnd);
      setTimeout(function () {
        target.parentNode.removeChild(divEnd);
      }, 3000);
    } else {
      var ind = goodsInBasket.findIndex(function (basketGood) {
        return basketGood.name === cardsOfSweets[indexOfGood].name;
      });
      if (ind === -1) {
        var newGoodIBasket = Object.assign({}, cardsOfSweets[indexOfGood]);
        newGoodIBasket.orderedAmount = 1;
        delete newGoodIBasket.amount;
        goodsInBasket.push(newGoodIBasket);
      } else {
        goodsInBasket[ind].orderedAmount += 1;
      }
      var orderedAmounts = [];
      goodsInBasket.forEach(function (el) {
        orderedAmounts.push(el.orderedAmount);
      });
      var totalAmount = orderedAmounts.reduce(function (result, num) {
        return result + num;
      }, 0);
      cardsOfSweets[indexOfGood].amount -= 1;
      document.querySelector('.main-header__basket').textContent = 'Сладостей в корзине: ' + totalAmount;
    }
  }
});

/* 3. Существует два способа получения товара: доставка и самовывоз. При переключении способа доставки,
 ниже, пользователь видит формы, соответствующие выбранному варианту.
 Если выбрана доставка курьером, отображается форма адреса, если выбран самовывоз: форма выбора
 ближайшего метро.
 Скрытые поля формы должны быть неактивны.
 Например, если выбран самовывоз, поля формы отвечающие за ввод адреса должны заблокироваться.
 В этом случае можно использовать делегирование, так как кнопка,  включающая блок и сам блок связаны
 через разметку.
 Поскольку после нажатия на таб не нужно дополнительно выяснять, какой именно таб был нажат
 (эта информация находится в ID evt.target) и какой блок нужно показать
 (ID таргета соответствует класс блока, который нужно показать), обработчик будет достаточно простым.
 Единственное, что нужно учесть в этом сценарии — то, что открытую вкладку нужно спрятать,
 добавив ей класс visually-hidden*/

document.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.id === 'deliver__store') {
    document.querySelector('.deliver__store').classList.remove('visually-hidden');
    document.querySelector('.deliver__courier').classList.add('visually-hidden');
  } else if (target.id === 'deliver__courier') {
    document.querySelector('.deliver__courier').classList.remove('visually-hidden');
    document.querySelector('.deliver__store').classList.add('visually-hidden');
  }
});

/* 4. Процесс перетаскивания состоит из трёх этапов: захват элемента, перемещение и отпускание.
  Пока что можем описать только отпускание, которое будет приводить к изменению значения блоков .range__price.
  Для этого добавим на каждый пин слайдера .range__btn обработчик события mouseup, который будет согласно ТЗ
  изменять границы минимальной и максимальной цены. Для начала можно считать что фильтр работает от 0 до 100.
  Например, если правый пин range__btn--right отстоит от левого края шкалы на 70%, при отпускании мыши,
  в .range__price--max должно записываться 70.*/

document.addEventListener('mouseup', function (evt) {
  var target = evt.target;
  var catalogFilterBlock = getComputedStyle(document.querySelector('.catalog__filter'));
  var catalogFilterBlockWidth = parseInt(catalogFilterBlock.width, 10);
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
});

// module4-task2

/* В этом задании мы опишем сценарии взаимодействия пользователя с формой отправки данных и саму отправку.
Вам нужно проверить разметку вашего проекта и добавить соответствующие атрибуты и типы полей в разметку форм.
Всем обязательным полям нужно добавить значение required.
Проверить, правильные ли типы стоят у нужных полей и проставить этим полям дополнительные атрибуты,
органичивающие длину значения, верхнюю и нижнюю границу и т.д.
В разметке задаётся и адрес, на который отправляются данные формы. В шестом разделе мы выполним задание,
в котором мы перепишем механизм отправки данных, но пока что, достаточно убедиться, что у соответствующих тегов form
прописаны правильные атрибуты.

Для проверки правильности номера карты нужно написать функцию, которая проверяет номер по Алгоритму Луна.
Нужно разделить введённый номер карты на отдельные символы и циклом получить их сумму,
умножая при этом нечётные позиции на два и складывая их числа между собой, если сумма больше или равна 10.
Если полученная сумма не кратна 10: 64 % 10 !== 0, введённый номер неверен.

Если форма заполнена верно, то должна показываться страница с успешно отправленными данными,
если же форма пропустила какие-то некорректные значения, то будет показана страница с допущенными ошибками.
В идеале у пользователя не должно быть сценария при котором он может отправить некорректную форму.

Рядом с номером карты отображается статус карты. Пока данные не введены или не все данные корректны,
отображается статус «Не определён». Когда все введённые данные корректны, статус карты меняется на «Одобрен».
*/

var cardForm = document.querySelectorAll('form')[1];
var cardNumberInput = cardForm.querySelector('#payment__card-number');
var cardDateInput = cardForm.querySelector('#payment__card-date');
var cardCvcInput = cardForm.querySelector('#payment__card-cvc');
var cardHolderInput = cardForm.querySelector('#payment__cardholder');
var okPage = document.querySelectorAll('.modal')[1];
var checkCardNumber = function (cardNumber) {
  var arr = cardNumber.split('').map(function (char, index) {
    var digit = parseInt(char, 10);
    if ((index + cardNumber.length) % 2 === 0) {
      var digitX2 = digit * 2;
      return digitX2 > 9 ? digitX2 - 9 : digitX2;
    }
    return digit;
  });
  return !(arr.reduce(function (a, b) {
    return a + b;
  }, 0) % 10);
};
cardNumberInput.addEventListener('invalid', function () {
  if (cardNumberInput.validity.tooShort || cardNumberInput.validity.tooLong) {
    cardNumberInput.setCustomValidity('Номер карты должен состоять из 16-ти цифр');
  } else if (!checkCardNumber(cardNumberInput.value)) {
    cardNumberInput.setCustomValidity('Вы ввели номер карты неверно');
  } else if (cardNumberInput.validity.valueMissing) {
    cardNumberInput.setCustomValidity('Обязательное поле');
  } else {
    cardNumberInput.setCustomValidity('');
  }
});
cardDateInput.addEventListener('invalid', function () {
  if (cardDateInput.validity.patternMismatch) {
    cardDateInput.setCustomValidity('Введите срок действия карты в формате мм/гг');
  } else if (cardDateInput.validity.valueMissing) {
    cardDateInput.setCustomValidity('Обязательное поле');
  } else {
    cardDateInput.setCustomValidity('');
  }
});
cardCvcInput.addEventListener('invalid', function () {
  if (cardCvcInput.validity.patternMismatch) {
    cardCvcInput.setCustomValidity('Введите 3-х значный CVC-код');
  } else if (cardCvcInput.validity.valueMissing) {
    cardCvcInput.setCustomValidity('Обязательное поле');
  } else {
    cardCvcInput.setCustomValidity('');
  }
});
cardHolderInput.addEventListener('invalid', function () {
  if (cardHolderInput.validity.valueMissing) {
    cardHolderInput.setCustomValidity('Обязательное поле');
  } else {
    cardHolderInput.setCustomValidity('');
  }
});
cardForm.addEventListener('input', function () {
  if (cardNumberInput.checkValidity() && cardDateInput.checkValidity() && cardCvcInput.checkValidity() && cardHolderInput.checkValidity()) {
    cardForm.querySelector('.payment__card-status').textContent = 'Одобрен';
  } else {
    cardForm.querySelector('.payment__card-status').textContent = 'Не определён';
  }
});
cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  okPage.classList.remove('modal--hidden');
});
okPage.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.classList.contains('modal__close')) {
    okPage.classList.add('modal--hidden');
  }
});

/* var divWrongNumber = document.createElement('div');
divWrongNumber.style.cssText = 'font-weight: bold; border: 1px solid black; background-color: white; display: none';
divWronчgNumber.textContent = 'Вы ввели номер карты неверно';
cardForm.querySelector('.payment__input-wrap--card-number').appendChild(divWrongNumber);
cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  if (!checkCardNumber(cardNumberInput.value)) {
    divWrongNumber.style.display = 'block';
    setTimeout(function () {
      divWrongNumber.style.display = 'none';
    }, 2000);
  } else {
    okPage.classList.remove('modal--hidden');
  }
});*/

// 5.1 Слайдер

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
var allPrices = cardsOfSweets.map(function (el) {
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
