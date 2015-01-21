function render(json) {
  var config = {
    // for d3sparql.graph()
    // "key1": "taxid1",
    // "key2": "taxid2",
    // "label1": "name1",
    // "label2": "name2",
    // for d3sparql.forcegraph()
    "radius": function(d) {return 1 + d.label.length},
    "charge": -500,
    "distance": 50,
    "width": 1000,
    "height": 750,
  }
  d3sparql.forcegraph(json, config)
}
