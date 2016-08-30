// client page controller

var $Controller = $Controller || {};
var $$ = null;

$Controller.init = function() {
	$Controller.f7 = new Framework7({"precompileTemplates":true});
	$$ = Dom7;
};
document.addEventListener("DOMContentLoaded", function() {
	$Controller.init();
}, false);
