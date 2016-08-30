// welcome page controller

$Controller.bind = function() {
    var options = {
		"bgcolor": "#0da6ec",
		"fontcolor": "#fff"
	};
    var slides = [
		{
			"id": "slide0",
			"picture": "<div class='tutorialicon'>♥</div>",
			"text": "Welcome to AFA."
		},
		{
			"id": "slide1",
			"picture": "<div class='tutorialicon'>✲</div>",
			"text": "The Most Professional Advisor APP"
		},
		{
			"id": "slide2",
			"picture": "<div class='tutorialicon'>♫</div>",
			"text": "Support By Shanghai Team"
		},
		{
			"id": "slide3",
			"picture": "<div class='tutorialicon'>☆</div>",
			"text": "<a class='tutorial-close-btn' href='#'>Get it, Now</a>"
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
