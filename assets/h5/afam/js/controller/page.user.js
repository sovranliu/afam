// user page controller

$Controller.bind = function() {
	$Controller.methods.prepare();
};

$Controller.methods = function() {
	return {
		prepare:function() {
			this.refresh();
			$$('i.js-refresh').on('click', this.refresh);
		},
		refresh:function() {
			$$.getJSON(S_DOMAIN + '/afam/rest/user/overview', {}, function(resp) {
				if(resp.code < 0) {
					if(undefined != resp.msg && resp.msg.length > 0) {
						bridge('window').call('tip', resp.msg);
					}
					return;
				}
				var data = resp.data;
				var isFirst = (''==$$('.user-photo img').attr('src'));
				$$('.user-photo img').attr('src', data.head);
				$$('p.user-name').html(data.name);
				$$('.user-time span').html(data.lastLoginTime);
				var html = '';
				var j = {};
				var i = 0;
				for(var key in data.performances) {
					j[key] = data.performances[key];
					if(i >= 3) {
						html += Template7.templates.template_performance(j);
						j = {};
						i = 0;
					}
					else {
						i++;
						
					}
				}
				$$('.user-data-wrap').html(html);
				if(!isFirst) {
					bridge('window').call('tip', '刷新成功');
				}
			});
		}
	};
}();
