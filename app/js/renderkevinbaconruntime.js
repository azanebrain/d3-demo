/** Generates a Scatter Plot
* Variables:
* xaxis_var (string) : The variable for the X Axis
* xaxis_var (string) : The variable for the Y Axis
* radius_var (string) : The variable for the radius of each circle
* xaxis_label (string) : The label for the X Axis
* yaxis_label (string) : The label for the Y Axis
* min_r (int) : The minimum radius of a node
* max_r (int) : The maximum radius of a node
*/
function render(json) {
  var config = {
    "label_x": xaxis_label,
    "label_y": yaxis_label,
    "label_node": node_label,
    "var_x": xaxis_var,
    "var_y": yaxis_var,
    "var_r": radius_var,
    "min_r": min_r,
    "max_r": max_r,
    "width": 850,
    "height": 300,
    "margin_x": 80,
    "margin_y": 40,
  }
  // d3sparql.scatterplotwithnodelabel(json, config)

  d3sparql.scatterplotwithnodelabel(json, config)

  // Remove the hidden class from the filters interface
  unhide('filters');
  // Set filter values
  var daterange = document.getElementById("datefilter");
  SVXQuery.data = json.results.bindings;
  daterange.max = d3.max(SVXQuery.data, function(d) { return d.date.value; });
  daterange.min = d3.min(SVXQuery.data, function(d) { return d.date.value; });
  FilterDate.setDateFilter( daterange.defaultValue );

}