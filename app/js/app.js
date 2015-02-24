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
//render() is unique to each function and can be found in each visualization script

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

/**
 * Refreshes the query string that will be visualized
 * Used mainly in dynamic query building examples
 */
function refreshQuery() {
	updateQuery();
}

/**
 * Unhides an element
 * @param target (string) [required] : The ID of the target div to unhide
 */
function unhide(target) {
	d3.select('#' + target).classed('hidden', false);
}

//updateQuery() is unique to each function and can be found in each visualization script

/**
 * This object stores information about the current query and dataset
 */
var SVXQuery = new function(){
	var that = this;
	// The query to be sent to the system
	that.query = "";
	// The returnset to be visualized
	that.data = "";
	// Target div for the visualization
	// Currently unused as the graphlocation is set in d3sparql.js
	// that.location = "#graph";
}
