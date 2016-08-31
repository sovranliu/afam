// home page controller

$Controller.bind = function() {
	$Controller.methods.prepare();
};

$Controller.methods = function() {
	var loading = false;
	return {
		prepare:function() {
			this.initChart();

		},
		initChart:function() {
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
		                backgroundColor: [
		                    "#F7464A",
		                    "#46BFBD",
		                    "#FDB45C",
		                    "#949FB1",
		                    "#4D5360",
		                ],
		            }, {
		                data: [
		                    randomScalingFactor(),
		                    randomScalingFactor(),
		                    randomScalingFactor(),
		                    randomScalingFactor(),
		                    randomScalingFactor(),
		                ],
		                backgroundColor: [
		                    "#F7464A",
		                    "#46BFBD",
		                    "#FDB45C",
		                    "#949FB1",
		                    "#4D5360",
		                ],
		            }, {
		                data: [
		                    randomScalingFactor(),
		                    randomScalingFactor(),
		                    randomScalingFactor(),
		                    randomScalingFactor(),
		                    randomScalingFactor(),
		                ],
		                backgroundColor: [
		                    "#F7464A",
		                    "#46BFBD",
		                    "#FDB45C",
		                    "#949FB1",
		                    "#4D5360",
		                ],
		            }],
		            labels: [
		                "Red",
		                "Green",
		                "Yellow",
		                "Grey",
		                "Dark Grey"
		            ]
		        },
		        options: {
		            responsive: true
		        }
		    };
		    window.onload = function() {
		        var ctx = document.getElementById("chart-area").getContext("2d");
		        window.myPie = new Chart(ctx, config);
		    };
		},
		
	};
}();
