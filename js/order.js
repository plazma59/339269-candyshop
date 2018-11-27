'use strict';

(function () {
  document.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.id === 'payment__card') {
      document.querySelector('.payment__card-wrap').classList.remove('visually-hidden');
      document.querySelector('.payment__cash-wrap').classList.add('visually-hidden');
    } else if (target.id === 'payment__cash') {
      document.querySelector('.payment__cash-wrap').classList.remove('visually-hidden');
      document.querySelector('.payment__card-wrap').classList.add('visually-hidden');
      document.querySelector('.payment__card-wrap').querySelectorAll('input').forEach(function (el) {
        el.setAttribute('disabled', 'true');
      });
    }
  });
  document.querySelector('.deliver__courier').querySelectorAll('input').forEach(function (el) {
    el.setAttribute('disabled', 'true');
  });
  document.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.id === 'deliver__courier') {
      document.querySelector('.deliver__courier').classList.remove('visually-hidden');
      document.querySelector('.deliver__store').classList.add('visually-hidden');
      document.querySelector('.deliver__courier').querySelectorAll('input').forEach(function (el) {
        el.removeAttribute('disabled');
      });
    } else if (target.id === 'deliver__store') {
      document.querySelector('.deliver__store').classList.remove('visually-hidden');
      document.querySelector('.deliver__courier').classList.add('visually-hidden');
      document.querySelector('.deliver__courier').querySelectorAll('input').forEach(function (el) {
        el.setAttribute('disabled', 'true');
      });
    }
  });
  document.addEventListener('click', function (evt) {
    var target = evt.target;
    var subwayImage = cardForm.querySelector('.deliver__store-map-wrap').querySelector('img');
    if (target.parentNode.classList.contains('deliver__store-item')) {
      subwayImage.src = 'img/map/' + target.value + '.jpg';
      subwayImage.alt = target.textContent;
    }
  });

  var cardForm = document.querySelectorAll('form')[1];
  var cardNumberInput = cardForm.querySelector('#payment__card-number');
  var cardDateInput = cardForm.querySelector('#payment__card-date');
  var cardCvcInput = cardForm.querySelector('#payment__card-cvc');
  var cardHolderInput = cardForm.querySelector('#payment__cardholder');
  var userNameInput = cardForm.querySelector('#contact-data__name');
  var userPhoneInput = cardForm.querySelector('#contact-data__tel');
  var userEmailInput = cardForm.querySelector('#contact-data__email');
  var adressStreetInput = cardForm.querySelector('#deliver__street');
  var adressHouseInput = cardForm.querySelector('#deliver__house');
  var adressFloorInput = cardForm.querySelector('#deliver__floor');
  var adressRoomInput = cardForm.querySelector('#deliver__room');
  var requiredInputs = [cardNumberInput, cardDateInput, cardHolderInput, cardCvcInput, userNameInput, userPhoneInput, adressStreetInput, adressHouseInput, adressRoomInput];
  var errorPage = document.querySelectorAll('.modal')[0];
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
    } else {
      cardNumberInput.setCustomValidity('');
    }
  });
  cardDateInput.addEventListener('invalid', function () {
    if (cardDateInput.validity.patternMismatch) {
      cardDateInput.setCustomValidity('Введите срок действия карты в формате мм/гг');
    } else {
      cardDateInput.setCustomValidity('');
    }
  });
  cardCvcInput.addEventListener('invalid', function () {
    if (cardCvcInput.validity.patternMismatch) {
      cardCvcInput.setCustomValidity('Введите 3-х значный CVC-код');
    } else {
      cardCvcInput.setCustomValidity('');
    }
  });
  userEmailInput.addEventListener('invalid', function () {
    if (userEmailInput.validity.typeMismatch) {
      userEmailInput.setCustomValidity('Введите верный электронный адрес');
    } else {
      userEmailInput.setCustomValidity('');
    }
  });
  adressFloorInput.addEventListener('invalid', function () {
    if (adressFloorInput.validity.patternMismatch) {
      adressFloorInput.setCustomValidity('Введите целое число больше нуля');
    } else {
      adressFloorInput.setCustomValidity('');
    }
  });
  requiredInputs.forEach(function (el) {
    el.addEventListener('invalid', function () {
      if (el.validity.valueMissing) {
        el.setCustomValidity('Обязательное поле');
      } else {
        el.setCustomValidity('');
      }
    });
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
    var showOkBlock = function () {
      okPage.classList.remove('modal--hidden');
    };
    var showErrorBlock = function () {
      errorPage.classList.remove('modal--hidden');
    };
    window.backend.postInfo(new FormData(cardForm), showOkBlock, showErrorBlock);
  });
  document.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains('modal__close')) {
      okPage.classList.add('modal--hidden');
      errorPage.classList.add('modal--hidden');
    }
  });
  document.addEventListener('keydown', function (evt) {
    if (!(okPage.classList.contains('modal--hidden')) && evt.keyCode === window.util.ESC) {
      okPage.classList.add('modal--hidden');
    }
    if (!(errorPage.classList.contains('modal--hidden')) && evt.keyCode === window.util.ESC) {
      errorPage.classList.add('modal--hidden');
    }
  });
}());
