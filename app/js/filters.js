/* Filters to interact with data through generated graphs
 * This file organizes filters by what metric is being filtered (date, person, film nome) and then by the type of graphic (scatterplot, line, histogram)
 */

/**
 * Filter out films created before a specific date
 */
var FilterDate = new function() {
  var self = this;

  // Set the datefilter variabl so it isn't rechecked for every node
  self.setDateFilter = function(){
    datefilter = d3.select("#datefilter").property("value");
  }

  // Update the text value of the date filter
  self.updateDateFilterText = function(val){
    d3.select("#datefilterval").text( val );
  }
  /**
   * Make a comparison and return an attribute value
   * data: The data returned by the original query
   * valid: The value to return if the comparison is true
   * valid: The value to return if the comparison is false
   */
  self.evaluateAttribute = function (data, valid, invalid) {
    // console.debug('data.date.value: ' + data.date.value);
    // console.debug('datefilter: ' + datefilter);
    if ( data.date.value < datefilter ) {
      // console.debug('Node date is LESS than filter. Returning valid: ' + valid);
      return valid;
    } else {
      // console.debug('Node date is GREATER than filter. Returning invalid: ' + invalid);
      return invalid;
    }
  }

  // Filter date for a scatterplot
  self.scatterplotMin = function () {
    self.setDateFilter(); //Update the date filter value in case it has been changed
    // Iterate through the nodes and hide those that fail the filter test
    var nodeset = d3.select(graphlocation).selectAll("svg").data(globaldata);
    nodeset.selectAll("g.nodeset")
      .style('visibility', function(d){ return self.evaluateAttribute(d, 'hidden', 'visible'); });
  }

  // Initialize other variables
  self.setDateFilter();

};
