// client profit page controller

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
			this.adjustTabLinks();
		},
		getAId:function() {
			var s = location.search;
			if(-1 == s.indexOf("?")) {
				return;
			}
			s = s.substr(1);
			var arr_p = s.split("&");
			for(var i in arr_p) {
				if('' == arr_p[i].trim()) continue;
				var arr_kv = arr_p[i].split("=");
				if(2 != arr_kv.length) continue;
				if('aid' == arr_kv[0]) {
					return arr_kv[1].trim();
				}
			}
			return null;
		},
		refresh:function() {
			var _this = this;
			var aId = this.getAId();
			if(null == aId) {
				return;
			}
			$$.getJSON(S_DOMAIN + '/afam/rest/client/position', {"aid":aId}, function(resp) {
				if(resp.code < 0) {
					bridge('window').call('tip', resp.msg || '客户持仓服务错误');
					return;
				}
				var data = resp.data;
				var html = null;
				html = Template7.templates.template_position(data['stock']);
				$$('#stock_list').html(html);
				html = Template7.templates.template_position(data['fund']);
				$$('#fund_list').html(html);
				html = Template7.templates.template_position(data['product']);
				$$('#product_list').html(html);
			});
		},
		adjustTabLinks:function() {
			var _this = this;
			$$('a.tab-link').each(function callback() {
				var l = $$(this).attr('href');
				if(l.indexOf('aid=') >= 0 || l.indexOf('#') >= 0) return;
				if(l.indexOf('?') > 0) {
					l = l + '&aid=' + _this.getAId();
				}
				else {
					l = l + '?aid=' + _this.getAId();
				}
				$$(this).attr('href', l);
			});
		}
	};
}();
