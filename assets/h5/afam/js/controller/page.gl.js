
$Controller.bind = function() {
	$Controller.methods.prepare();
};

$Controller.methods = function() {
	var loading = false;
	return {
		prepare:function() {
			this.initLineChart();
		},
		initLineChart:function() {
			var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	        var randomScalingFactor = function() {
	            return Math.round(Math.random() * 100 * (Math.random() > 0.5 ? -1 : 1));
	        };
	        var randomColorFactor = function() {
	            return Math.round(Math.random() * 255);
	        };
	        var randomColor = function(opacity) {
	            return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
	        };

	        var config = {
	            type: 'line',
	            data: {
	                labels: ["January", "February", "March", "April", "May", "June", "July"],
	                datasets: [{
	                    label: "My First dataset",
	                    data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
	                    fill: false,
	                    borderDash: [5, 5],
	                }, {
	                    label: "My Second dataset",
	                    data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
	                    fill: false,
	                    borderDash: [5, 5],
	                }, {
	                    label: "My Third dataset - No bezier",
	                    data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
	                    lineTension: 0,
	                    fill: false,
	                }, {
	                    label: "My Fourth dataset",
	                    data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
	                    fill: false,
	                }]
	            },
	            options: {
	                responsive: false,
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
	                            display: true,
	                            labelString: 'Month'
	                        }
	                    }],
	                    yAxes: [{
	                        display: true,
	                        scaleLabel: {
	                            display: true,
	                            labelString: 'Value'
	                        }
	                    }]
	                },
	                title: {
	                    display: true,
	                    text: 'Chart.js Line Chart - Legend'
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

	        window.onload = function() {
	            var ctx = document.getElementById("canvas").getContext("2d");
	            window.myLine = new Chart(ctx, config);
	        };
		}
	};
}();
