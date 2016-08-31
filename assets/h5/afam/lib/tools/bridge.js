var g_port = 0;
var g_callback = {};

// bridge('ClassName').call('MethodName', Parameter_1, Parameter_2);
// bridge('ClassName').asyc('MethodName', Parameter_1, Parameter_2, function(data) {});

function bridge(name) {
	var clazz = name;
	var result = {};
	function call(method) {
		var a = [];
		for(var i = 1; i < arguments.length; i++) {
			a.push(arguments[i]);
		}
		return bridge_invoke(clazz, 0, method, a);
	}
	result['call'] = call;
	function asyc(method) {
		var a = [];
		for(var i = 1; i < arguments.length - 1; i++) {
			a.push(arguments[i]);
		}
		g_port++;
		if(g_port > 10000) {
			g_port = 1;
		}
		var p = g_port;
		g_callback['' + p] = arguments[arguments.length - 1];
		bridge_invoke(clazz, p, method, a);
	}
	result['asyc'] = asyc;
	return result;
}

function bridge_callback(p, r) {
	var f = g_callback['' + p];
	f(r);
	delete g_callback['' + p];
}

function bridge_invoke(c, p, m, a) {
	var r = 'bridge:';
	r += p;
	r += "//";
	r += c;
	r += '.';
	r += m;
	r += '(';
	for(var i = 0; i < a.length; i++) {
		var s = a[i];
		if(i > 0) {
			r += ',';
		}
		if('number' == typeof(s)) {
			r += s;
		}
		else if('string' == typeof(s)) {
			r += '\'' + s + '\'';
		}
		else if('object' == typeof(s)) {
			r += json2string(s);
		}
	}
	r += ')';
	return java2js(prompt(r, ''));
}

function java2js(s) {
	if(null == s || 'null' == s) {
		return null;
	}
	else if(0 == s.indexOf('\'') && s.length - 1 == s.lastIndexOf('\'')) {
		return s.substring(1, s.length - 1);
	}
	else if((0 == s.indexOf('{') && s.length - 1 == s.lastIndexOf('}')) || (0 == s.indexOf('[') && s.length - 1 == s.lastIndexOf(']'))){
		return eval('(' + s + ')');
	}
	else {
		return parseInt(s);
	}
}

function json2string(json) {
	if('number' == typeof(json)) {
		return json;
	}
	else if('boolean' == typeof(json)) {
		return json;
	}
	else if('string' == typeof(json)) {
		return '"' + json + '"';
	}
	else if('object' == typeof(json)) {
		if(null == json) {
			return 'null';
		}
		else if(json instanceof Function) {
			return json;
		}
		else if(json instanceof Array) {
			var r = '[';
			for(var i in json) {
				if(i > 0) {
					r += ',';
				}
				r += json2string(json[i]);
			}
			r += ']';
			return r;
		}
		else {
			var r = '{';
			var sentry = false;
			for(var i in json) {
				if(sentry) {
					r += ',';
				}
				else {
					sentry = true;
				}
				r += '"' + json2string(i) + '":';
				r += json2string(json[i]);
			}
			r += '}';
			return r;
		}
	}
}
