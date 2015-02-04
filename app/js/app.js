'use strict';

var app = (function(document, $) {
	var docElem = document.documentElement,
		_userAgentInit = function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},
		_init = function() {
			$(document).foundation();
            // needed to use joyride
            // doc: http://foundation.zurb.com/docs/components/joyride.html
            $(document).on('click', '#start-jr', function () {
                $(document).foundation('joyride', 'start');
            });
			_userAgentInit();
		};
	return {
		init: _init
	};
})(document, jQuery);

(function() {
	app.init();
})();

// Global D3 Functions
function exec() {
	var endpoint = d3.select("#endpoint").property("value")
	var sparql = d3.select("#sparql").property("value")
	d3sparql.query(endpoint, sparql, render)
}
function toggle() {
	d3sparql.toggle()
}

// SPARQLverse

/**
 * Creates a visualization based on dynamic user input, instead of a textarea query
 */
function visualize() {
	// console.debug("Visualizing Query")
	var endpoint = d3.select("#endpoint").property("value")
	var sparql = visualizationquery
	d3sparql.query(endpoint, sparql, render)
}

// TODO: Create an SVXQuery object
// var SVXQuery = function(){
// 	this.query = "";
// }
