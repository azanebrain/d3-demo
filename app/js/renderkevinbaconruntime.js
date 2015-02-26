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
  d3sparql.scatterplotwithnodelabel(json, config)

  // Set filter values
  var daterange = document.getElementById("datefilter");
  SVXQuery.data = json.results.bindings;
  daterange.max = d3.max(SVXQuery.data, function(d) { return d.date.value; });
  daterange.min = d3.min(SVXQuery.data, function(d) { return d.date.value; });
  FilterDate.setDateFilter( daterange.defaultValue );
  // Remove the hidden class from the filters interface
  unhide('filters');

  // Setup secondary interactivity
  actorsInNode();
}

// need an initialize and a set of utility fncns?
function actorsInNode() {
  d3.select(graphlocation)
    .select('svg')
    .selectAll("g.nodeset")
    // Perform action when the user clicks an element
    .on("click", function(d,i) { return visualizeActorsInMovie(d.movieName.value); })
}

function visualizeActorsInMovie(movieTitle) {
  // console.debug("Finding actors in movie: " + movieTitle);

  // Get all of the actors in the selected film
  var sparql =
      "SELECT DISTINCT ?actorName " +
      "FROM <movie> " +
      "WHERE { " +
        "?movie <http://www.w3.org/2000/01/rdf-schema#label> '" + movieTitle + "'. " +
        "?movie <http://data.linkedmdb.org/resource/movie/actor> ?actor. " +
        "?actor <http://data.linkedmdb.org/resource/movie/actor_name> ?actorName.   " +
      "} " +
      "ORDER BY asc ( ?actorName ) ";
  //Query our endpoint and render the results
  d3sparql.query( SVXQuery.endpoint, sparql, renderActorsInMovie );
}

function renderActorsInMovie(json) {
  // Just a basic ugly table
  // d3sparql.htmltable(json);
  var config = {
    "key1": '',
    "key2": 'actorName',
    "label": '',
    "label": '',
  };
  console.warn('only picking up the last 2 actors... or ignoring the first 20');
  svx.d3sparql.forcegraph(json, config, 'target');
}
