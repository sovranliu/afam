/*jslint browser: true*/
/*global console*/

var AFA = AFA || {};
AFA.pages = AFA.pages || {};

AFA.pages.AudioPageController = function (AFA, $$) {
  'use strict';
  
  // Init method
  var index = {
      init:function() {
        this.bindActions();
      },
      bindActions:function() {
        $$('.circle_lg').on('click',this.recordCircle);
      },
      recordCircle:function(e) {
          var classname = $$(this).attr('class'),
              isChange = classname.indexOf('active') == -1?false:true;
          var msg = {
            'start':'点击开始录音',
            'end':'再次点击结束录音'
          }
          if(!isChange){
            $$(this).addClass('active');
            $$('.audio-tips').html(msg['end']);
          }else{
            $$(this).removeClass('active')
            $$('.audio-tips').html(msg['start']);
            this.openInput();
          }
      },
      //显示底部输入框
      openInput:function() {

      }
  }
  index.init();

};