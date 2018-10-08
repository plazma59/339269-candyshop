'use strict';

(function () {
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
    if (cardNumberInput.validity.patternMismatch) {
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
}());
