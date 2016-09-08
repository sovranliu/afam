// client list page controller

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
			$$('a.searchbar-clear').on('click', function() {
				_this.refresh('');
			});
			bridge('window').listen('onCommand', this.refresh);
			// 刷新客户列表
			_this.refresh('');
		},
		refresh:function(key) {
			var _this = this;
			$$.getJSON(S_DOMAIN + '/afam/rest/clients', {"key":key}, function(resp) {
				if(resp.code < 0) {
					bridge('window').call('tip', resp.msg || '客户列表服务错误');
					return;
				}
				var msgMap = bridge('user').call('unreadMessages');
				for(var i in resp.data) {
					if(undefined != msgMap[resp.data[i].im]) {
						resp.data[i].msgCount = msgMap[resp.data[i].im];
					}
				}
				var html = Template7.templates.template_clients(resp.data);
				$$('.client-list').html(html);
				bridge('window').call('adjustLinks');
				$$('.infinite-scroll').on('infinite', function () {
					$Controller.methods.load($$('.searchbar-input').val());
				});
			});
		},
		load:function(key) {
			var _this = this;
			if (loading) return;
			loading = true;
			$$.getJSON(S_DOMAIN + '/afam/rest/clients', {"key":key}, function(resp) {
				loading = false;
				if(resp.code < 0) {
					bridge('window').call('tip', resp.msg || '客户列表服务错误');
					return;
				}
				var itemCount = $$('.list-block li').length;
				var ITEM_COUNT_MAX = 300;
				if(itemCount >= ITEM_COUNT_MAX) {
					$Controller.f7.detachInfiniteScroll($$('.infinite-scroll'));
					$$('.infinite-scroll-preloader').remove();
					return;
				}
				var msgMap = bridge('user').call('unreadMessages');
				for(var i in resp.data) {
					if(undefined != msgMap[resp.data[i].im]) {
						resp.data[i].msgCount = msgMap[resp.data[i].im];
					}
				}
				var html = Template7.templates.template_clients(resp.data);
				$$('.client-list').append(html);
				bridge('window').call('adjustLinks');
			});
		}
	};
}();
