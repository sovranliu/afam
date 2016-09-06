// user page controller

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
			$$('#div_name').on('click',function(){
				_this.alert('name', '姓名', $$(this).find('.item-after').html());
			});
			$$('#div_head').on('click',function(){
				_this.alert('head', null);
			});
			$$('#div_phone').on('click',function(){
				_this.alert('phone', '手机号码', $$(this).find('.item-after').html());
			});
			$$('#div_tel').on('click',function(){
				_this.alert('tel', '座机', $$(this).find('.item-after').html());
			});
			$$('#div_mail').on('click',function(){
				_this.alert('mail', '邮箱', $$(this).find('.item-after').html());
			});
		},
		load:function() {
			$$.getJSON(S_DOMAIN + '/afam/rest/user/info', {}, function(resp) {
				if(resp.code < 0) {
					if(undefined != resp.msg && resp.msg.length > 0) {
						bridge('window').call('tip', resp.msg);
					}
					return;
				}
				var data = resp.data;
				$$('#lab_name').html(data.name);
				$$('#lab_phone').html(data.phone);
				$$('#lab_tel').html(data.tel);
				$$('#lab_mail').html(data.mail);
			});
		},
		alert:function(k, t, d) {
			var _key = k;
			if('head' == _key) {
				bridge('window').asyc('inputImage', function(d) {
					
				});
				return;
			}
			bridge('window').asyc('inputText', t, d, function(d) {
				if('name' == _key) {
					$$('#lab_name').html(d);
				}
				else if('phone' == _key) {
					$$('#lab_phone').html(d);
				}
				else if('tel' == _key) {
					$$('#lab_tel').html(d);
				}
				else if('mail' == _key) {
					$$('#lab_mail').html(d);
				}
			});
		}
	};
}();
