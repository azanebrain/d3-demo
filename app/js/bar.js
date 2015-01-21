/** Generates a bar chart
 * Variables:
 * xaxis_label (string) : The label of the X axis
 * yaxis_label (string) : The label of the Y axis
 * xaxis_var (string) : The variable for the X axis
 * yaxis_var (string) : The variable for the Y axis
 */
function render(json) {
  var config = {
    "label_x": xaxis_label,
    "label_y": yaxis_label,
    "var_x": xaxis_var,
    "var_y": yaxis_var,
    "width":  700,  // canvas width
    "height": 300,  // canvas height
    "margin":  80,  // canvas margin
  }
  d3sparql.barchart(json, config)
}
