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
  // d3sparql.scatterplot(json, config)
  d3sparql.scatterplotwithnodelabel(json, config)
  // d3sparql.htmltable(json)
}


d3sparql.scatterplotwithnodelabel = function(json, config) {
  var head = json.head.vars
  var data = json.results.bindings

console.debug("Opts:");
console.dir(config);

  var opts = {
    "label_x":  config.label_x  || "label_x",
    "label_y":  config.label_y  || "label_y",
    "label_node":  config.label_node  || "",
    "var_x":    config.var_x    || head[0],
    "var_y":    config.var_y    || head[1],
    "var_r":    config.var_r    || head[2] || 5,
    "min_r":    config.min_r    || 1,
    "max_r":    config.max_r    || 20,
    "width":    config.width    || 850,
    "height":   config.height   || 300,
    "margin_x": config.margin_x || 80,
    "margin_y": config.margin_y || 40,
  }

  var extent_x = d3.extent(data, function(d) {return parseInt(d[opts.var_x].value)})
  var extent_y = d3.extent(data, function(d) {return parseInt(d[opts.var_y].value)})
  var extent_r = d3.extent(data, function(d) {return parseInt(d[opts.var_r].value)})
  var scale_x = d3.scale.linear().range([opts.margin_x, opts.width - opts.margin_x]).domain(extent_x)
  var scale_y = d3.scale.linear().range([opts.height - opts.margin_y, opts.margin_y]).domain(extent_y)
  var scale_r = d3.scale.linear().range([opts.min_r, opts.max_r]).domain(extent_r)
  var axis_x = d3.svg.axis().scale(scale_x)
  var axis_y = d3.svg.axis().scale(scale_y).orient("left")

  var svg = d3.select(graphlocation)
    .append("svg")
    .attr("width", opts.width)
    .attr("height", opts.height)
  var elem = svg.selectAll("g")
    .data(data)
  //Create and place the "blocks" containing the circle and the text
  var elemEnter = elem.enter()
    .append("g")
    .attr("class", "nodeset")
  var circle = elemEnter.append("circle")
    .attr("class", "node")
    .attr("cx", function(d) {return scale_x(d[opts.var_x].value)})
    .attr("cy", function(d) {return scale_y(d[opts.var_y].value)})
    .attr("r",  function(d) {return scale_r(d[opts.var_r].value)})

   /* Create the text for each block */
   elemEnter.append("text")
    .attr("class", "nodelabel")
    .attr("x", function(d) {return scale_x(d[opts.var_x].value) - 2 })
    .attr("y", function(d) {return scale_y(d[opts.var_y].value) - 2 })
    .text(function(d){return d[opts.label_node].value})
  var ax = svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (opts.height - opts.margin_y) + ")")
    .call(axis_x)
  var ay = svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + opts.margin_x + ",0)")
    .call(axis_y)
  ax.append("text")
    .attr("class", "label")
    .text(opts.label_x)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + ((opts.width - opts.margin_x) / 2) + "," + (opts.margin_y - 5) + ")")
  ay.append("text")
    .attr("class", "label")
    .text(opts.label_y)
    .style("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("x", 0 - (opts.height / 2))
    .attr("y", 0 - (opts.margin_x - 20))

  // default CSS/SVG
  ax.attr({
    "stroke": "black",
    "fill": "none",
  })
  ay.attr({
    "stroke": "black",
    "fill": "none",
  })
  circle.attr({
    "stroke": "gray",
    "stroke-width": "1px",
    "fill": "lightblue",
    "opacity": 0.5,
  })
  //svg.selectAll(".label")
  svg.selectAll("text").attr({
    "stroke": "none",
    "fill": "black",
    "font-size": "8pt",
    "font-family": "sans-serif",
  })
}
