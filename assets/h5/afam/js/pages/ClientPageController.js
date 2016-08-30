/*jslint browser: true*/
/*global console*/

var AFA = AFA || {};
AFA.pages = AFA.pages || {};

AFA.pages.ClientPageController = function (AFA, $$) {
  'use strict';
  // Init method
  	var index = {
  		init:function(){
  			this.bindActions();
  		},
  		bindActions:function() {
  			var _this = this;
        this.loadMore();
        $$('.searchbar-input').on('input propertychange',function(){
        })
  		},
  		loadMore:function() {
        var loading = false;
        var lastIndex = $$('.list-block li').length;
        var maxItems = 60;
        var itemsPerLoad = 20;
        $$('.infinite-scroll').on('infinite', function () {
          if (loading) return;
          loading = true;
          setTimeout(function () {
            loading = false;
            if (lastIndex >= maxItems) {
              AFA.detachInfiniteScroll($$('.infinite-scroll'));
              $$('.infinite-scroll-preloader').remove();
              return;
            }
            var html = '';
            for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
              html += '<ul class="clearfix">\
                                <li><div class="item-title">客户'+i+'</div></li>\
                                <li><div class="item-title gray">30062754 </div></li>\
                                <li><div class="item-title red">15,233,000,22 </div></li>\
                            </ul>';
            }
            $$('.client-list').append(html);
            lastIndex = $$('.list-block li').length;
          }, 1000);
        });   
      }
  	};
    index.init();
  
};