// welcome page controller

$Controller.bind = function() {
    var options = {
		"bgcolor": "#fff",
		"fontcolor": "#fff"
	};
    var slides = [
		{
			"id": "slide0",
			"picture": "<div class='tutorialicon'><img src='image/welcome_1.jpg'/></div>",
		},
		{
			"id": "slide1",
			"picture": "<div class='tutorialicon'><img src='image/welcome_2.jpg'/></div>",
		},
		{
			"id": "slide2",
			"picture": "<div class='tutorialicon'><img src='image/welcome_3.jpg'/></div>",
			"text": "<a class='tutorial-close-btn' href='#'>立即体验</a>"

		}
	];
    $Controller.welcomescreen = $Controller.f7.welcomescreen(slides, options);
    $$(document).on('click', '.tutorial-close-btn', function () {
       bridge('window').call('close');
    });
    $$('.tutorial-open-btn').click(function () {
      $Controller.welcomescreen.open();  
    });
    $$(document).on('click', '.tutorial-next-link', function (e) {
      $Controller.welcomescreen.next(); 
    });
    $$(document).on('click', '.tutorial-previous-slide', function (e) {
      $Controller.welcomescreen.previous(); 
    });
};
