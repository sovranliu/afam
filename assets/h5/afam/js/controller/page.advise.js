// advise page controller

$Controller.bind = function() {
	$Controller.methods.prepare();
};

$Controller.methods = function() {
	return {
		prepare:function() {
			$$('#btn_close').on('click',function(){
				bridge('window').call('close');
			});
			$$('.btn-submit').on('click',function(){
				bridge('window').call('tip', '提交成功，感谢您的参与');
				bridge('window').call('close');
			});
		}
	};
}();
