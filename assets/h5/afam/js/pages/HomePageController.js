/*jslint browser: true*/
/*global console*/

var AFA = AFA || {};
AFA.pages = AFA.pages || {};

AFA.pages.HomePageController = function (AFA, $$) {
  'use strict';
  // Init method
  	var index = {
  		init:function(){
  			this.bindActions();
  		},
  		bindActions:function(){
  			var _this = this;
  			//初始化广告轮播
  			this.swipe('.adver-wrap','.adver-pagination');
  			this.swipe('.lhb-wrap','.lhb-pagination');
  			this.swipe('.yz-wrap','.yz-pagination')
  		},
  		swipe:function(wrap,pagination){
  			console.log($$(wrap).html())
  			var options = {
			      'speed': 400,
			      'spaceBetween': 100,
			      'pagination':pagination,
			      'observer':true,//修改swiper自己或子元素时，自动初始化swiper
  				  'observeParents':true,//修改swiper的父元素时，自动初始化swiper
			      
			    };
			var mySwiper = AFA.swiper(wrap, options);   
		},
  	};
    index.init();
  
};