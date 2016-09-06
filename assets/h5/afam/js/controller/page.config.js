// user page controller

$Controller.bind = function() {
	$Controller.methods.prepare();
};

$Controller.methods = function() {
	return {
		prepare:function() {
			$$('#btn_close').on('click',function(){
				bridge('window').call('close');
			});
			$$('#btn_clear').on('click',function(){
				bridge('window').call('tip', '清理完毕');
			});
			$$('#btn_logout').on('click',function(){
				bridge('user').call('logout');
			});
		}
	};
}();
