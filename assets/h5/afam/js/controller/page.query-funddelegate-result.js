//  当日新股申购 page controller

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
		}
	};
}();
