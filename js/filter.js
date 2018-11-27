'use strict';
(function () {
  var quantity = document.querySelectorAll('.input-btn__item-count');
  var checkBoxes = document.querySelector('.catalog__sidebar').querySelectorAll('.input-btn__input');
  var favouriteList = [];
  var compareGoodsMaxPrice = function (goodA, goodB) {
    return goodB.price - goodA.price;
  };
  var compareGoodsMinPrice = function (goodA, goodB) {
    return goodA.price - goodB.price;
  };
  var compareGoodsRating = function (goodA, goodB) {
    if (goodB.rating.value === goodA.rating.value) {
      return goodB.rating.number - goodA.rating.number;
    }
    return goodB.rating.value - goodA.rating.value;
  };
  var createFilters = function (cards) {
    var filterCards = [];
    var availableList = [];
    window.debounce.removeDebounce(window.catalog.createCatalog(window.slider.createSlider(cards)));

    window.util.KINDS.forEach(function (elem) {
      var kind = cards.filter(function (el) {
        return el.kind === elem;
      });
      for (var i = 0; i < quantity.length; i++) {
        if (quantity[i].parentNode.querySelector('.input-btn__label').textContent === elem) {
          quantity[i].textContent = '(' + kind.length + ')';
        }
      }
    });
    var sugar = cards.filter(function (el) {
      return !el.nutritionFacts.sugar;
    });
    quantity[5].textContent = '(' + sugar.length + ')';
    var vegetarian = cards.filter(function (el) {
      return el.nutritionFacts.vegetarian;
    });
    quantity[6].textContent = '(' + vegetarian.length + ')';
    var gluten = cards.filter(function (el) {
      return !el.nutritionFacts.gluten;
    });
    quantity[7].textContent = '(' + gluten.length + ')';

    quantity[8].textContent = '(0)';
    document.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.classList.contains('card__btn-favorite')) {
        evt.preventDefault();
        var indexOfFavourite = target.dataset.indexNumber;
        var countFavourites = function (cards1) {
          for (var i = 0; i < favouriteList.length; i++) {
            if (favouriteList[i] === cards1[indexOfFavourite]) {
              favouriteList.splice(favouriteList[i], 1);
              quantity[8].textContent = '(' + favouriteList.length + ')';
              return;
            }
          }
          favouriteList.push(cards1[indexOfFavourite]);
        };
        if (quantity[9].parentNode.querySelector('.input-btn__input').checked) {
          countFavourites(availableList);
        } else if (quantity[8].parentNode.querySelector('.input-btn__input').checked) {
          countFavourites(favouriteList);
        } else if (filterCards.length !== 0) {
          countFavourites(filterCards);
        } else {
          countFavourites(window.slider.createSlider(cards));
        }
        quantity[8].textContent = '(' + favouriteList.length + ')';
      }
    });

    var countAvailable = function () {
      var count = 0;
      cards.forEach(function () {
        if (cards.amount !== 0) {
          count++;
        }
      });
      quantity[9].textContent = '(' + count + ')';
    };
    countAvailable();

    var filterSorting = document.querySelectorAll('.catalog__filter')[4].querySelectorAll('.input-btn__input');
    var sortCatalog = function (cards2) {
      if (filterSorting[1].checked) {
        cards2.sort(compareGoodsMaxPrice);
      } else if (filterSorting[2].checked) {
        cards2.sort(compareGoodsMinPrice);
      } else if (filterSorting[3].checked) {
        cards2.sort(compareGoodsRating);
      }
      window.debounce.removeDebounce(window.catalog.createCatalog(cards2));
    };

    var createFilterCatalog = function () {
      filterCards = [];
      window.debounce.removeDebounce(window.catalog.createCatalog(window.slider.createSlider(cards)));
      sortCatalog(window.slider.createSlider(cards));
      var createKinds = function () {
        for (var j = 0; j <= window.util.KINDS.length; j++) {
          var kind = cards.filter(function (el) {
            return el.kind === window.util.KINDS[j];
          });
          for (var i = 0; i < quantity.length; i++) {
            if ((quantity[i].parentNode.querySelector('.input-btn__input').checked) &&
            (quantity[i].parentNode.querySelector('.input-btn__label').textContent === window.util.KINDS[j])) {
              filterCards = kind.reduce(function (coll, item) {
                coll.push(item);
                return coll;
              }, filterCards);
            }
          }
        }
        var extra = [];
        filterCards.forEach(function (el) {
          if (window.slider.createSlider(cards).indexOf(el) === -1) {
            extra.push(el);
          }
        });
        extra.forEach(function (el) {
          filterCards.splice(filterCards.indexOf(el), 1);
        });
        window.debounce.removeDebounce(window.catalog.createCatalog(filterCards));
        sortCatalog(filterCards);
      };

      var createQualities = function (array) {
        var quality = document.querySelectorAll('.catalog__filter')[1];
        if (quality.children[0].querySelector('.input-btn__input').checked) {
          array = array.filter(function (el) {
            return !el.nutritionFacts.sugar;
          });
        }
        if (quality.children[1].querySelector('.input-btn__input').checked) {
          array = array.filter(function (el) {
            return el.nutritionFacts.vegetarian;
          });
        }
        if (quality.children[2].querySelector('.input-btn__input').checked) {
          array = array.filter(function (el) {
            return !el.nutritionFacts.gluten;
          });
        }
        window.debounce.removeDebounce(window.catalog.createCatalog(array));
        sortCatalog(array);
      };

      var createFavouritesOrAvailable = function () {
        quantity[8].parentNode.querySelector('.input-btn__input').type = 'radio';
        quantity[9].parentNode.querySelector('.input-btn__input').type = 'radio';
        if (quantity[8].parentNode.querySelector('.input-btn__input').checked) {
          window.debounce.removeDebounce(window.catalog.createCatalog(favouriteList));
          sortCatalog(favouriteList);
        } else if (quantity[9].parentNode.querySelector('.input-btn__input').checked) {
          availableList = [];
          cards.forEach(function (el) {
            if (el.amount !== 0) {
              availableList.push(el);
            }
          });
          window.debounce.removeDebounce(window.catalog.createCatalog(availableList));
          sortCatalog(availableList);
        }
      };

      createKinds();
      if (filterCards.length === 0) {
        createQualities(window.slider.createSlider(cards));
      } else {
        createQualities(filterCards);
      }
      createFavouritesOrAvailable();
    };

    var createCatalogAgain = function (evt) {
      var count = 0;
      for (var i = 0; i < quantity.length; i++) {
        if (!(quantity[i].parentNode.querySelector('.input-btn__input').checked)) {
          count++;
        }
      }
      var target = evt.target;
      if (target.classList.contains('catalog__submit')) {
        evt.preventDefault();
        checkBoxes.forEach(function (el) {
          el.checked = false;
        });
        filterSorting[0].checked = true;
        window.debounce.removeDebounce(window.catalog.createCatalog(cards));
        sortCatalog(cards);
        filterCards = [];
        availableList = [];
      }
      if (count === quantity.length) {
        window.debounce.removeDebounce(window.catalog.createCatalog(window.slider.createSlider(cards)));
        sortCatalog(window.slider.createSlider(cards));
        filterCards = [];
        availableList = [];
      }
    };
    document.querySelector('.catalog__sidebar').addEventListener('click', createFilterCatalog);
    document.querySelector('.catalog__sidebar').addEventListener('mouseup', createFilterCatalog);
    document.querySelector('.catalog__sidebar').addEventListener('click', createCatalogAgain);
    document.querySelector('.catalog__sidebar').addEventListener('mouseup', createCatalogAgain);
  };
  window.filter = {
    createFilters: createFilters,
    favouriteList: favouriteList
  };
}());
