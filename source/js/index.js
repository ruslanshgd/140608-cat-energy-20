'use strict';

var toogleMenu = document.querySelector('.toggle-menu');
var pageHeader = document.querySelector('.page-header__container');
var navigation = document.querySelector('.main-nav');

navigation.classList.remove('main-nav--open');
toogleMenu.classList.remove('toggle-menu--open');


toogleMenu.addEventListener('click', function() {
  toogleMenu.classList.toggle('toggle-menu--close');
  navigation.classList.toggle('main-nav--open');
});
