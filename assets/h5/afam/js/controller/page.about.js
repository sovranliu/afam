// about page controller

$Controller.bind = function() {
	$Controller.methods.prepare();
};

$Controller.methods = function() {
	return {
		prepare:function() {
			$$('#btn_close').on('click',function(){
				bridge('window').call('close');
			});
			$$('#btn_check').on('click',function(){
				bridge('window').call('tip', '当前程序为最新版本');
			});
		}
	};
}();
