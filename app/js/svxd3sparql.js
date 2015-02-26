//
// SPARQLverse d3sparql.js - An extension of d3sparql.js adding more features showing the power of enterprise graph analytics
//
//   Web site: http://github.com/sparqlcity/d3-demo
//   Copyright: 2015 (C) SPARQL City
//   Initial Copyright: 2013, 2014 (C) Toshiaki Katayama (ktym@dbcls.jp)
//   Initial version: 2013-01-28
//


var svx = {
  version: "sxvd3sparql.js version 2015-02-25",
  d3sparql: {}
}

svx.d3sparql.forcegraph = function (json, config, target) {
  console.dir(json.results.bindings)
  var graph = d3sparql.graph(json, config);

  var opts = {
    "radius":    config.radius    || function(d) {return 1 + d.label.length},
    "charge":    config.charge    || -500,
    "distance":  config.distance  || 50,
    "width":     config.width     || 1000,
    "height":    config.height    || 750,
    "label":     config.label     || false,  // optional
  }

  var svg = d3.select(graphlocation).select('svg')
  var link = svg.selectAll(".link")
    .data(graph.links)
    .enter()
    .append("line")
    .attr("class", "link")
  var node = svg.selectAll(".node")
    .data(graph.nodes)
    .enter()
    .append("g")
  var circle = node.append("circle")
    .attr("class", "node")
    .attr("r", opts.radius)
  var text = node.append("text")
    .text(function(d) {return d[opts.label || "label"]})
    .attr("class", "node")
  var force = d3.layout.force()
    .charge(opts.charge)
    .linkDistance(opts.distance)
    .size([opts.width, opts.height])
    .nodes(graph.nodes)
    .links(graph.links)
    .start()
  force.on("tick", function() {
    link.attr("x1", function(d) {return d.source.x})
        .attr("y1", function(d) {return d.source.y - 400 })
        .attr("x2", function(d) {return d.target.x})
        .attr("y2", function(d) {return d.target.y - 400 })
    text.attr("x", function(d) {return d.x})
        .attr("y", function(d) {return d.y - 400 })
    circle.attr("cx", function(d) {return d.x})
          .attr("cy", function(d) {return d.y - 400 })
  })
  node.call(force.drag)

  // default CSS/SVG
  link.attr({
    "stroke": "#999999",
  })
  circle.attr({
    "stroke": "black",
    "stroke-width": "1px",
    "fill": "lightblue",
    "opacity": 1,
  })
  text.attr({
    "font-size": "8px",
    "font-family": "sans-serif",
  })
}