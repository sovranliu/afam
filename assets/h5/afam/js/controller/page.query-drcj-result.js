//  当日成交 page controller

$Controller.bind = function() {
	$Controller.methods.prepare();
};

$Controller.methods = function() {
	return {
		prepare:function() {
			var _this = this;
			$$('#btn_close').on('click', function() {
				bridge('window').call('close');
			});
			// 刷新列表
			_this.refresh();
		},
		refresh:function() {
			var _this = this;
			$$.getJSON(S_DOMAIN + '/afam/rest/query/drcj', {}, function(resp) {
				if(resp.code < 0) {
					if(undefined != resp.msg) {
						bridge('window').call('tip', resp.msg);
					}
					return;
				}
				var html = Template7.templates.template_list(resp.data);
				$$('.client-list').html(html);
			});
		}
	};
}();
