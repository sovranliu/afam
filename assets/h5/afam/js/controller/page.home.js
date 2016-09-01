// home page controller

$Controller.bind = function() {
	$Controller.methods.prepare();
};

$Controller.methods = function() {
	var loading = false;
	return {
		prepare:function() {
			// 初始化广告轮播
			this.swipe('.adver-wrap','.adver-pagination');
			this.swipe('.lhb-wrap','.lhb-pagination');
			this.swipe('.yz-wrap','.yz-pagination');
			this.initNav();
			this.initNews();
			this.sendGEO();
			// 加载数据
			this.loadBanner();
			this.loadTopTransaction();
			this.loadTopTransfer();
			this.loadNews();
		},
		initNav:function() {
			console.log($$(window))
			window.onscroll = function(){
				console.log(window);
				var top = $$(document).scrollTop();
			$Controller.views.main.hideNavbar();

			}
		},
		swipe:function(wrap,pagination) {
			var options = {
				'speed': 400,
				'pagination':pagination,
				'observer':true,
				'observeParents':true
			};
			var mySwiper = $Controller.f7.swiper(wrap, options);
		},
		sendGEO:function(){
			$$('.js-mark').on('click',function(){
				//TODO 发送经纬度等信息
				$Controller.f7.alert('签到成功！','');
			})
		},
		loadBanner:function() {
			$$.getJSON(S_DOMAIN + '/afam/rest/banner', {}, function(resp) {
				if(resp.code < 0) {
					bridge('window').call('tip', resp.msg || '广告服务错误');
					return;
				}
				var html = Template7.templates.template_banner(resp.data);
				$$('.adver-wrap .swiper-wrapper').html(html);
			});
		},
		loadTopTransaction:function() {
			$$.getJSON(S_DOMAIN + '/afam/rest/transactionTop', {}, function(resp) {
				if(resp.code < 0) {
					bridge('window').call('tip', resp.msg || '交易龙虎榜服务错误');
					return;
				}
				var html = null;
				html = Template7.templates.template_top_transaction(resp.data.slice(0, 3));
				$$('#top_transaction_1').html(html);
				html = Template7.templates.template_top_transaction(resp.data.slice(3, 6));
				$$('#top_transaction_2').html(html);
			});
		},
		loadTopTransfer:function() {
			$$.getJSON(S_DOMAIN + '/afam/rest/transferTop', {}, function(resp) {
				if(resp.code < 0) {
					bridge('window').call('tip', resp.msg || '银证转账服务错误');
					return;
				}
				var html = null;
				html = Template7.templates.template_top_transfer(resp.data.slice(0, 3));
				$$('#top_transfer_1').html(html);
				html = Template7.templates.template_top_transfer(resp.data.slice(3, 6));
				$$('#top_transfer_2').html(html);
			});
		},
		initNews:function() {
			$$('.infinite-scroll').on('infinite', function () {
				this.loadNews();
			});
		},
		loadNews:function() {
			if (loading) return;
			loading = true;
			$$.getJSON(S_DOMAIN + '/afam/rest/news', {"page":1}, function(resp) {
				loading = false;
				if(resp.code < 0) {
					bridge('window').call('tip', resp.msg || '资讯服务错误');
					return;
				}
				var itemCount = $$('.list-block li').length;
				var ITEM_COUNT_MAX = 60;
				if(itemCount >= ITEM_COUNT_MAX) {
					$Controller.f7.detachInfiniteScroll($$('.infinite-scroll'));
					$$('.infinite-scroll-preloader').remove();
					return;
				}
				var html = null;
				html = Template7.templates.template_news(resp.data);
				$$('.list-block ul').append(html);
			});
		}
	};
}();
