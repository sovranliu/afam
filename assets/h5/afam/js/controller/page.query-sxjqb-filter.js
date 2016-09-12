// 搜寻金钱豹 page controller

$Controller.bind = function() {
	$Controller.methods.prepare();
};

$Controller.methods = function() {
	return {
		prepare:function() {
			var pickerDevice = $Controller.f7.picker({
			    input: '#scope',
			    cols: [
			        {
			            textAlign: 'center',
			            values: ['总部', '营业部', '团队', '名下']
			        }
			    ]
			});
			$$('#btn_close').on('click',function(){
				bridge('window').call('close');
			});
		}
	};
}();
