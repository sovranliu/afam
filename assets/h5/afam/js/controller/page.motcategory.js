// MOT category page controller

$Controller.bind = function() {
	$Controller.methods.prepare();
};

$Controller.methods = function() {
	return {
		prepare:function() {
			var _this = this;
			this.load();
			$$('#btn_close').on('click',function(){
				bridge('window').call('close');
			});
		},
		load:function() {
			$$.getJSON(S_DOMAIN + '/afam/rest/client/mot/category', {}, function(resp) {
				if(resp.code < 0) {
					if(undefined != resp.msg && resp.msg.length > 0) {
						bridge('window').call('tip', resp.msg);
					}
					return;
				}
				var data = resp.data;
				var html = Template7.templates.template_category(data);
				$$('.list-block ul').html(html);
				bridge('window').call('adjustLinks');
				$$('.list-block li').on('click',function(){
					$$(this).find('.item-after').remove();
				});
			});
		}
	};
}();
