// client profit page controller

$Controller.bind = function() {
	$Controller.methods.prepare();
};

$Controller.methods = function() {
	return {
		prepare:function() {
			$$('#btn_close').on('click',function(){
				bridge('window').call('close');
			});
			this.load();
			this.adjustTabLinks();
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
		load:function() {
			var _this = this;
			var aId = this.getAId();
			if(null == aId) {
				return;
			}
			$$.getJSON(S_DOMAIN + '/afam/rest/client/profit', {"aid":aId}, function(resp) {
				if(resp.code < 0) {
					bridge('window').call('tip', resp.msg || '客户盈亏服务错误');
					return;
				}
				var data = resp.data;
				_this.renderOverview(data.overview);
				_this.renderLR(data.lr);
				_this.renderChart(data.chart);
			});
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
		renderOverview:function(o) {
			var html = Template7.templates.template_overview(o);
			$$('.client-list-wrap').html(html);
		},
		renderLR:function(l) {
			var d = [];
			var sentry = false;
			var item = null;
			for(var k in l) {
				if(sentry) {
					item['name2'] = k;
					item['value2'] = l[k];
					d.push(item);
				}
				else {
					item = {};
					item['name1'] = k;
					item['value1'] = l[k];
				}
				sentry = !sentry;
			}
			var html = Template7.templates.template_lr(d);
			$$('.page-content').append(html);
		},
		renderChart:function(c) {
			var randomScalingFactor = function() {
	            return Math.round(Math.random() * 100 * (Math.random() > 0.5 ? -1 : 1));
	        };
	        var randomColorFactor = function() {
	            return Math.round(Math.random() * 255);
	        };
	        var randomColor = function(opacity) {
	            return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
	        };
			var ds = [];
			for(var i in c.lines) {
				var item = {};
				item['label'] = c.lines[i].name;
				item['fill'] = false;
				item['data'] = c.lines[i].values;
				ds.push(item);
			}
	        var config = {
	            type: 'line',
	            data: {
	                labels: c.time,
	                datasets: ds
	            },
	            options: {
	                responsive: true,
	                legend: {
	                    position: 'bottom',
	                },
	                hover: {
	                    mode: 'label'
	                },
	                scales: {
	                    xAxes: [{
	                        display: true,
	                        scaleLabel: {
	                            display: false,
	                            labelString: '年月'
	                        }
	                    }],
	                    yAxes: [{
	                        display: true,
	                        scaleLabel: {
	                            display: false,
	                            labelString: '盈亏'
	                        }
	                    }]
	                },
	                title: {
	                    display: true,
	                    text: '折线图值(%)'
	                }
	            }
	        };
	        $$.each(config.data.datasets, function(i, dataset) {
	            var background = randomColor(0.5);
	            dataset.borderColor = background;
	            dataset.backgroundColor = background;
	            dataset.pointBorderColor = background;
	            dataset.pointBackgroundColor = background;
	            dataset.pointBorderWidth = 1;
	        });
			var ctx = document.getElementById("canvas").getContext("2d");
			window.myLine = new Chart(ctx, config);
		}
	};
}();
