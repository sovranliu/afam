// client profile page controller

$Controller.bind = function() {
	$Controller.methods.prepare();
};

$Controller.methods = function() {
	var loading = false;
	return {
		prepare:function() {
			this.initNav();
			this.initPieChart();
			this.switchTab();
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
		initPieChart:function() {
			var randomScalingFactor = function() {
		        return Math.round(Math.random() * 100);
		    };
		    var randomColorFactor = function() {
		        return Math.round(Math.random() * 255);
		    };
		    var randomColor = function(opacity) {
		        return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
		    };
		    var config = {
		        type: 'pie',
		        data: {
		            datasets: [{
		                data: [
		                    randomScalingFactor(),
		                    randomScalingFactor(),
		                    randomScalingFactor(),
		                    randomScalingFactor(),
		                    randomScalingFactor(),
		                ],
		        		borderWidth:1,

		                backgroundColor: [
		                    "#ff6668",
		                    "#01c195",
		                    "#f9c051",
		                    "#999999",
		                    "#44a0ea",
		                ],
		            }],
		            labels: [
		                "Red",
		                "Green",
		                "Yellow",
		                "Grey",
		                "Blue"
		            ]
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
		    window.onload = function() {
		        var ctx = document.getElementById("chart-area").getContext("2d");
		        window.myPie = new Chart(ctx, config);
		    };
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
			var arr_p = str.split("&");
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
		refresh:function() {
			var aId = this.getAId();
			if(null == aId) {
				return;
			}
			$$.getJSON(S_DOMAIN + '/afam/rest/clientprofile', {"aid":aId}, function(resp) {
				if(resp.code < 0) {
					bridge('window').call('tip', resp.msg || '客户概况服务错误');
					return;
				}
				var data = resp.data;
				$$('#client_name').text(data.name);
				$$('#client_chart').on('click', function() {
					bridge('user').call('chat', data.name, data.im);
				});
			});
		}
	};
}();
