/*jslint browser: true*/
/*global console*/

var AFA = AFA || {};
AFA.pages = AFA.pages || {};

AFA.pages.IndexPageController = function (AFA, $$) {
  'use strict';
  
  // Init method
  (function () {
    var options = {
      'speed': 400,
      'spaceBetween': 100,
      'pagination':'.swiper-pagination'
      
    };
    var mySwiper = AFA.swiper('.swiper-container', options);   
  
  }());

};