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
        var _this = this;
        $$('.circle_lg').on('click',function(){
          _this.recordCircle(this)
        });
        $$('.open-vertical-modal').on('click', function () {
          _this.openDialog(this);
        }); 
        $$('.tab-history').on('click',this.closeTool)
      },
      recordCircle:function(e) {
          var classname = $$(e).attr('class'),
              isChange = classname.indexOf('active') == -1?false:true;
          var msg = {
            'start':'点击开始录音',
            'end':'再次点击结束录音'
          }
          if(!isChange){
            $$(e).addClass('active');
            $$('.audio-tips').html(msg['end']);
            $$('.js-audio-tool').removeClass('slideInUp animated').addClass('slideOutDown animated');
          }else{
            $$(e).removeClass('active')
            $$('.audio-tips').html(msg['start']);
            $$('.js-audio-tool').removeClass('slideOutDown animated').show().addClass('slideInUp animated');
          }
      },
      closeTool:function() {
        $$('.js-audio-tool').hide();
      },
      openDialog:function(e) {
          AFA.modal({
            'title':'请选择操作',
            verticalButtons: true,
            buttons: [
              {
                text: '播放',
                onClick: function() {
                  AFA.alert('You clicked first button!')
                }
              },
              {
                text: '上传',
                onClick: function() {
                  AFA.alert('You clicked second button!')
                }
              },
              {
                text: '删除',
                onClick: function() {
                  AFA.alert('You clicked third button!')
                }
              },
            ]
          })
      }
      
  }
  index.init();

};