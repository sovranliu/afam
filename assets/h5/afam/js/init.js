/*jslint browser: true*/
/*global console, Framework7, angular, Dom7*/

var AFA = AFA || {};

AFA.init = (function () {
  'use strict';
  
  var exports = {};
  
  document.addEventListener("DOMContentLoaded", function(event) { 
    // Initialize app
    var fw7App = new Framework7(),
      fw7ViewOptions = {
        dynamicNavbar: true,
        domCache: true
      },
      mainView = fw7App.addView('.view-main', fw7ViewOptions),
      $$ = Dom7,
      //ipc = new AFA.pages.WelcomePageController(fw7App, $$)
      //ipc_index = new AFA.pages.HomePageController(fw7App, $$)
      //ipc_audio = new AFA.pages.AudioPageController(fw7App, $$)
      ipc_client = new AFA.pages.ClientPageController(fw7App, $$)
  });
  
  return exports;

}());