// about page controller

$Controller.bind = function() {
	$Controller.methods.prepare();
};

$Controller.methods = function() {
	return {
		prepare:function() {
			//日历初始化
			var calendarDateFormat = $Controller.f7.calendar({
			    input: '#calendar-default',
			    dateFormat: 'DD, MM dd, yyyy'
			});
			//下拉选择初始化
			var pickerDevice = $Controller.f7.picker({
			    input: '#picker-device',
			    cols: [
			        {
			            textAlign: 'center',
			            values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3']
			        }
			    ]
			});
			//$$('.btn-search').on('click',this.loadUrl);
		},
		loadUrl:function(){
			$Controller.views.main.router.loadPage('xgsg-result.html');
		}
	};
}();
