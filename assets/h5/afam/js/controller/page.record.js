// record page controller

$Controller.bind = function() {
	$Controller.methods.prepare();
};

$Controller.methods = function() {
	var path = null;
	var playing = false;
	var msg = {
		"start":"点击开始录音",
		"end":"点击结束录音"
	};
	return {
		"prepare":function() {
			var _this = this;
			$$('.circle_lg').on('click',function(){
				_this.recordCircle(this)
			});
			$$('.open-vertical-modal').on('click', function () {
				_this.openDialog(this);
			}); 
			$$('.tab-history').on('click',this.closeTool);
			$$('#btn_play').on('click',function() {
				_this.playOrStop();
			});
			$$('#btn_save').on('click',function() {
				bridge('window').call('tip', '保存成功！');
				$$('.audio-tips').html(msg['start']);
				$$('.js-audio-tool').removeClass('slideInUp animated').addClass('slideOutDown animated');
			});
		},
		"recordCircle":function(e) {
			var classname = $$(e).attr('class');
			var	isChange = classname.indexOf('active') == -1?false:true;
			if(!isChange){
				$$(e).addClass('active');
				$$('.audio-tips').html(msg['end']);
				$$('.js-audio-tool').removeClass('slideInUp animated').addClass('slideOutDown animated');
				bridge('recorder').call('start');
			}
			else{
				$$(e).removeClass('active')
				$$('.audio-tips').html(msg['start']);
				$$('.js-audio-tool').removeClass('slideOutDown animated').show().addClass('slideInUp animated');
				path = bridge('recorder').call('end');
			}
		},
		"closeTool":function() {
			$$('.js-audio-tool').hide();
		},
		"openDialog":function(e) {
			var _this = this;
			$Controller.f7.modal({
				"title":"请选择操作",
				"verticalButtons": true,
				"buttons": [
					{
						text: "播放",
						onClick: function() {
							_this.playOrStop();
						}
					},
					{
						text: "上传",
						onClick: function() {
							bridge('recorder').call('upload', path);
						}
					},
					{
						text: "删除",
						onClick: function() {
							bridge('window').call('tip', '删除成功！');
						}
					},
				]
			});
		},
		"playOrStop":function(e) {
			if(playing) {
				bridge('recorder').call('stop');
				playing = false;
			}
			else {
				bridge('recorder').call('play', path);
				playing = true;
			}
		}
	};
}();
