// page controller base module

var S_DOMAIN = 'http://121.40.90.141';

var $Controller = {"views":{}};
var $$ = null;

document.addEventListener("DOMContentLoaded", function() {
	$$ = Dom7;
	if(undefined != $Controller["init"]) {
		$Controller.init();
	}
	if(undefined == $Controller["f7"]) {
		$Controller.f7 = new Framework7({"precompileTemplates":true});
	}
	if(undefined == $Controller.views["main"]) {
		$Controller.views.main = $Controller.f7.addView('.view-main', {});
	}
	if(undefined != $Controller["bind"]) {
		$Controller.bind();
	}
}, false);
