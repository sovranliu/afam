// client profile page controller

$Controller.bind = function() {
	$Controller.methods.prepare();
};

$Controller.methods = function() {
	var name = null;
	var im = null;
	var tick = 0;
	return {
		prepare:function() {
			var _this = this;
			this.initNav();
			this.switchTab();
			$$('#btn_close').on('click',function(){
				bridge('window').call('close');
			});
			$$('#client_chat').on('click', function() {
				bridge('user').call('chat', _this.name, _this.im);
			});
			this.refresh();
			this.adjustTabLinks();
			bridge('window').listen('onCommand', this.refreshChatIcon);
			bridge('window').listen('onResume', this.refreshChatIcon);
		},
		shakeChatIcon:function() {
			if($$('#chat_icon').hasClass('red')) {
				$$('#chat_icon').removeClass('red');
			}
			else {
				$$('#chat_icon').addClass('red');
			}
		},
		refreshChatIcon:function() {
			var c = bridge('user').call('unreadMessages', this.im);
			if(c > 0) {
				if(0 == tick) {
					tick = setInterval('$Controller.methods.shakeChatIcon()', 500);
				}
			}
			else {
				if(tick > 0) {
					clearInterval(tick);
					tick = 0;
					if($$('#chat_icon').hasClass('red')) {
						$$('#chat_icon').removeClass('red');
					}
				}
			}
		},
		initNav:function() {
			$$('.page-content').on('scroll', function(){
				var top = $$(this).scrollTop();
				if(top >= 50){
					$Controller.views.main.hideNavbar()
				}else{
					$Controller.views.main.showNavbar()
				}
			});
		},
		initPieChart:function(a) {
			var randomScalingFactor = function() {
		        return Math.round(Math.random() * 100);
		    };
		    var randomColorFactor = function() {
		        return Math.round(Math.random() * 255);
		    };
		    var randomColor = function(opacity) {
		        return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
		    };
			var d = [];
			var c = [];
			var n = [];
			for(var k in a) {
				d.push(a[k]);
				c.push(randomColor());
				n.push(k);
			}
		    var config = {
		        type: 'pie',
		        data: {
		            datasets: [{
		                data: d,
		        		borderWidth:1,
		                backgroundColor: c
		            }],
		            labels: n
		        },
		        options: {
		            responsive: true,
		            legend: {
			            display: true,
			            position:'right',
			            labels: {
			                boxWidth:10
			            }
			        }
		        },
		    };
			var ctx = document.getElementById("chart-area").getContext("2d");
			window.myPie = new Chart(ctx, config);
		},
		switchTab:function() {
			$$('.js-tab-finacne i').on('click',function(){
				var index = $$(this).index();//0 - chart ; 1 - list
				if(index == 0){
					$$('.js-show-chart').addClass('active');
					$$(this).next().removeClass('active');
					$$('.client-chart-wrap').show();
					$$('.client-list-wrap').hide()
				}else{
					$$('.js-show-list').addClass('active');
					$$(this).prev().removeClass('active');
					$$('.client-chart-wrap').hide();
					$$('.client-list-wrap').show()
				}
			});
		},
		getAId:function() {
			var s = location.search;
			if(-1 == s.indexOf("?")) {
				return;
			}
			s = s.substr(1);
			var arr_p = s.split("&");
			for(var i in arr_p) {
				if('' == arr_p[i].trim()) continue;
				var arr_kv = arr_p[i].split("=");
				if(2 != arr_kv.length) continue;
				if('aid' == arr_kv[0]) {
					return arr_kv[1].trim();
				}
			}
			return null;
		},
		adjustTabLinks:function() {
			var _this = this;
			$$('a.tab-link').each(function callback() {
				var l = $$(this).attr('href');
				if(l.indexOf('aid=') > 0) return;
				if(l.indexOf('?') > 0) {
					l = l + '&aid=' + _this.getAId();
				}
				else {
					l = l + '?aid=' + _this.getAId();
				}
				$$(this).attr('href', l);
			});
		},
		refresh:function() {
			var _this = this;
			var aId = this.getAId();
			if(null == aId) {
				return;
			}
			$$.getJSON(S_DOMAIN + '/afam/rest/client/profile', {"aid":aId}, function(resp) {
				if(resp.code < 0) {
					bridge('window').call('tip', resp.msg || '客户概况服务错误');
					return;
				}
				var data = resp.data;
				_this.im = data.im;
				_this.name = data.name; ;
				if('female' == data.gender) {
					$$('.client-name').html(data.name + ' <i class="icon iconfont">&#xe67a;</i>');
				}
				else {
					$$('.client-name').html(data.name + ' <i class="icon iconfont">&#xe67b;</i>');
				}
				$$('.client-amount span').html(data.amount);
				$$('#client_aid span').html(data.accountId);
				$$('#client_phone span').html(data.phone);
				$$('#client_idcard span').html(data.idNumber + '/' + data.idcardExpire);
				var account = data.account;
				$$('#account_createdate').html(account.createDate);
				$$('#account_bank').html(account.bank);
				$$('#account_commission').html(account.commission);
				_this.initPieChart(data.assets);
				var kv = data.assets;
				for(var key in data.pay) {
					kv[key] = data.pay[key];
				}
				var html = Template7.templates.template_assets(kv);
				$$('.client-list-wrap').html(html);
				var risk = data.risk;
				$$('#risk-category').html(risk.category);
				$$('#risk-expire').html(risk.expire);
				$$('.client-other-wrap').html(data.tag);
				_this.refreshChatIcon();
			});
		}
	};
}();
