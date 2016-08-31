// client page controller

$Controller.bind = function() {
	$Controller.methods.prepare();
};

$Controller.methods = function() {
	return {
		"prepare":function() {
			//
			$$('.searchbar-input').on('inputpropertychange', function() {
				this.refresh(this.val());
			});
			$$('.infinite-scroll').on('infinite', function () {
				this.load($$('.searchbar-input').val());
			});
			// 加载数据
			this.refresh('');
		},
		"refresh":function(key) {
			$$.getJSON(S_DOMAIN + '/afam/rest/clients', {"key":key}, function(resp) {
				if(resp.code < 0) {
					bridge('window').call('tip', resp.msg || '客户列表服务错误');
					return;
				}
				var html = Template7.templates.template_clients(resp.data);
				$$('.client-list').html(html);
			});
		},
		"load":function(key) {
			$$.getJSON(S_DOMAIN + '/afam/rest/clients', {"key":key}, function(resp) {
				if(resp.code < 0) {
					bridge('window').call('tip', resp.msg || '客户列表服务错误');
					return;
				}
				var html = Template7.templates.template_clients(resp.data);
				$$('.client-list').append(html);
			});
		}
	};
}();
