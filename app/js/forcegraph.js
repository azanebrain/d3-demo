/** Generates a Force Graph
* Variables:
* key1 (string) : The first key
* key2 (string) : The second key
* label1 (string) : The first label
* label2 (string) : The second label
*/
function render(json) {
  var config = {
    // for d3sparql.graph()
    "key1": key1,
    "key2": key2,
    "label1": label1,
    "label2": label2,
    // for d3sparql.forcegraph()
    "radius": function(d) {return 1 + d.label.length},
    "charge": -500,
    "distance": 50,
    "width": 1000,
    "height": 750,
  }
  d3sparql.forcegraph(json, config)
}
