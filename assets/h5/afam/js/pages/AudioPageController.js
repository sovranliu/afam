/*jslint browser: true*/
/*global console*/

var AFA = AFA || {};
AFA.pages = AFA.pages || {};

AFA.pages.AudioPageController = function (AFA, $$) {
  'use strict';
  
  // Init method
  (function () {
    $$('.circle_lg').on('click',function(){
      var classname = $$(this).attr('class');
      var isChange = classname.indexOf('active') == -1?false:true;
      if(!isChange){
        $$(this).addClass('active')
      }else{
        $$(this).removeClass('active')
      }
    })
  
  }());

};