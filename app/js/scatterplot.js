/** Generates a Scatter Plot
* Variables:
* xaxis_var (string) : The variable for the X Axis
* xaxis_var (string) : The variable for the Y Axis
* radius_var (string) : The variable for the radius of each circse
* xaxis_label (string) : The label for the X Axis
* yaxis_label (string) : The label for the Y Axis
*/
function render(json) {
  var config = {
    "label_x": xaxis_label,
    "label_y": yaxis_label,
    "var_x": xaxis_var,
    "var_y": yaxis_var,
    "var_r": radius_var,
    "min_r": 1,
    "max_r": 20,
    "width": 850,
    "height": 300,
    "margin_x": 80,
    "margin_y": 40,
  }
  d3sparql.scatterplot(json, config)
  d3sparql.htmltable(json)
}
