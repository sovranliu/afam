// page controller base module

var S_DOMAIN = 'http://121.40.90.141';

var $Controller = {"views":{}};
var $$ = null;

document.addEventListener("DOMContentLoaded", function() {
	$$ = Dom7;
	if(undefined == $Controller["tools"]) {
		$Controller.tools = {
			"adjustLinks":function() {
				var allLinks = document.getElementsByTagName('a');
				if (allLinks) {
					var i;
					for (i=0; i < allLinks.length; i++) {
						var link = allLinks[i];
						var target = link.getAttribute('target');
						if (target && target == '_blank') {
							link.setAttribute('target','_self');
							link.href = 'new://'+link.href;
						}
					}
				}
			}
		};
	}
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
