// home page controller

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
			})
		},
	};
}();
