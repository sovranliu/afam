// products page controller

$Controller.bind = function() {
	$Controller.methods.prepare();
};

$Controller.methods = function() {
	return {
		prepare:function() {
			$$('#btn_close').on('click',function(){
				bridge('window').call('close');
			});
			this.refresh();
		},
		refresh:function() {
			var _this = this;
			$$.getJSON(S_DOMAIN + '/afam/rest/tzlc', {}, function(resp) {
				if(resp.code < 0) {
					bridge('window').call('tip', resp.msg || '服务错误');
					return;
				}
				var data = resp.data;
				var html = Template7.templates.template_tzlc(resp.data);
				$$('#tzlc_list').html(html);
			});
			$$.getJSON(S_DOMAIN + '/afam/rest/zxyb', {}, function(resp) {
				if(resp.code < 0) {
					bridge('window').call('tip', resp.msg || '服务错误');
					return;
				}
				var data = resp.data;
				var html = Template7.templates.template_zxyb(resp.data);
				$$('#zxyb_list').html(html);
			});
		}
	};
}();
