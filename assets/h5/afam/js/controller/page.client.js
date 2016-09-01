// home page controller

$Controller.bind = function() {
	$Controller.methods.prepare();
};

$Controller.methods = function() {
	var loading = false;
	return {
		prepare:function() {
			var _this = this;
			$$('.searchbar-input').on('input propertychange', function() {
				_this.refresh($$(this).find('input').val());
			});
			
			// ¼ÓÔØÊý¾Ý
			_this.refresh('');
		},
		refresh:function(key) {
			var _this = this;
			$$.getJSON(S_DOMAIN + '/afam/rest/clients', {"key":key}, function(resp) {
				if(resp.code < 0) {
					bridge('window').call('tip', resp.msg || '¿Í»§ÁÐ±í·þÎñ´íÎó');
					return;
				}
				var html = Template7.templates.template_clients(resp.data);
				$$('.client-list').html(html);
				console.log($$('.infinite-scroll'));
				$$('.infinite-scroll').on('infinite', function () {
					console.log(234);
					$Controller.methods.load($$('.searchbar-input').val());
				});
			});
		},
		load:function(key) {
			if (loading) return;
			loading = true;
			$$.getJSON(S_DOMAIN + '/afam/rest/clients', {"key":key}, function(resp) {
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
				$$('.client-list').append(html);
			});
		}
	};
}();
