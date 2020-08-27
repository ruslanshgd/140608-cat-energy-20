'use strict';

var toogleMenu = document.querySelector('.toggle-menu');
var navigation = document.querySelector('.main-nav');

navigation.classList.remove('main-nav--open');

toogleMenu.addEventListener('click', function() {
  toogleMenu.classList.toggle('toggle-menu--close');
  navigation.classList.toggle('main-nav--open');
});
