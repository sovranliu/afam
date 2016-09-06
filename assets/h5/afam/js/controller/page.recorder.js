// record page controller

$Controller.bind = function() {
	$Controller.methods.prepare();
};

$Controller.methods = function() {
	var tick = 0;
	var code = 0;
	var path = null;
	var playing = false;
	var msg = {
		"start":"点击开始录音",
		"end":"再次点击可结束录音"
	};
	return {
		prepare:function() {
			var _this = this;
			$$('#btn_close').on('click',function(){
				bridge('window').call('close');
			});
			$$('.circle_lg').on('click',function(){
				_this.recordCircle(this)
			});
			$$('.media-list').on('click','.open-vertical-modal' ,function () {
				_this.path = $$(this).data('url');
				_this.openDialog();
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
			this.loadRecordHistory();
		},
		refreshTime:function() {
			tick++;
			var h = parseInt(tick / 60 / 60);
			var m = parseInt(tick / 60 % 60);
			var s = parseInt(tick % 60);
			$$('.audio-tips').html(('00' + h).substring(('00' + h).length - 2) + ':' + ('00' + m).substring(('00' + m).length - 2) + ':' + ('00' + s).substring(('00' + s).length - 2));
		},
		recordCircle:function(e) {
			var classname = $$(e).attr('class');
			var	isChange = classname.indexOf('active') == -1?false:true;
			if(!isChange){
				$$(e).addClass('active');
				$$('.audio-tips').html(msg['end']);
				$$('.js-audio-tool').removeClass('slideInUp animated').addClass('slideOutDown animated');
				bridge('recorder').call('start');
				this.tick = 0;
				this.code = setInterval('$Controller.methods.refreshTime()', 1000);
			}
			else{
				$$(e).removeClass('active')
				clearInterval(this.code);
				// $$('.audio-tips').html(msg['start']);
				$$('.js-audio-tool').removeClass('slideOutDown animated').show().addClass('slideInUp animated');
				path = bridge('recorder').call('end');
				console.log(path);
			}
		},
		loadRecordHistory:function() {
			$$.getJSON(S_DOMAIN + '/afam/rest/recordlHistory', {}, function(resp) {
				if(resp.code < 0) {
					bridge('window').call('tip', resp.msg || '录音历史服务错误');
					return;
				}
				var html = Template7.templates.template_record(resp.data);
				$$('.media-list ul').html(html);
			});
		},
		closeTool:function() {
			$$('.js-audio-tool').hide();
		},
		openDialog:function() {
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
		playOrStop:function(e) {
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
