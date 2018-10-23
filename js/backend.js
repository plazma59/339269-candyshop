'use strict';

(function () {
  var urlGet = 'https://js.dump.academy/candyshop/data';
  var cardsOfSweets = [];
  var getGoods = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
        cardsOfSweets = xhr.response;
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', urlGet);
    xhr.send();
  };

  var urlPost = 'https://js.dump.academy/candyshop';

  var postInfo = function (data, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.open('POST', urlPost);
    xhr.send(data);
  };

  window.backend = {
    getGoods: getGoods,
    postInfo: postInfo,
    cardsOfSweets: cardsOfSweets
  };
})();

