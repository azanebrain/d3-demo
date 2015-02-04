// var ActorRuntime = new SVX();
var targetActor = "";
var visualizationquery = "";

/**
 * Updates the query string that will be visualized
 */
function updateQuery() {
  // console.debug("Updating query vars");
  // Reset the variables based on user input
  targetActor = this.value; //Update the target actor
  //Rewrite the query with the custom vars
  visualizationquery = "SELECT ?movieName ?runTime (SUBSTR(?date, 1, 4) AS ?date) ?filmid ?directorid " +
    "(count(*) as ?numActors) " +
    "FROM <movie> WHERE { " +
    "?targetActor    <http://data.linkedmdb.org/resource/movie/actor_name> \"" + targetActor + "\". " +
    "?movie <http://data.linkedmdb.org/resource/movie/actor> ?targetActor. " +
    "?movie <http://data.linkedmdb.org/resource/movie/actor> ?actor. " +
    "?movie <http://www.w3.org/2000/01/rdf-schema#label> ?movieName. " +
    "?movie <http://data.linkedmdb.org/resource/movie/filmid> ?filmid. " +
    "?movie <http://data.linkedmdb.org/resource/movie/runtime> ?runTime. " +
    "?movie <http://purl.org/dc/terms/date> ?date. " +
    "?movie <http://data.linkedmdb.org/resource/movie/director> ?director. " +
    "?director <http://data.linkedmdb.org/resource/movie/director_directorid> ?directorid. " +
    //"filter ( ?date > \"2000\" ) " +
    "} " +
    "GROUP BY ?movieName ?runTime ?date ?filmid ?targetActor ?movie ?directorid " +
    "LIMIT 100";
  document.getElementById('sparql').innerHTML = visualizationquery;
}
/**
 * Update the actor list dropdown with the query results
 */
function populateDropdown(json) {
  var head = json.head.vars;
  var data = json.results.bindings;

  var config = {
    "target": "#actor-dropdown",
    "actorName": "actorName" //TODO: Do I need this?
  };

  // console.debug("Populating Dropdown: " + config.target);
  var select = d3.select(config.target) // Append <option> elements to the target dropdown menu
    .on("change", updateQuery); //Update the query when the user selects an actor
    // TODO: Make this an object
    // .on("change", SVXQuery.update); //Update the query when the user selects an actor
  var option = select.selectAll("option")
    .data(data)
    .enter()
    .append("option")
    .text( function(d) { return d["actorName"].value } );
}

/**
 * Regenerate the list of actors to choose from
 */
function refresh_actorList( ) {
  var endpoint = d3.select("#endpoint").property("value");
  // Create a query that gets actors with many film credits
  var sparql = "SELECT ?actorName (count(*) as ?numMovies) " +
    "FROM <movie> WHERE { " +
    "?actor    <http://data.linkedmdb.org/resource/movie/actor_name> ?actorName. " +
    "?movie <http://data.linkedmdb.org/resource/movie/actor> ?actor. " +
    "} " +
    "GROUP BY ?actorName " +
    "ORDER BY DESC ( ?numMovies ) " +
    "LIMIT 75";
  //Query our endpoint then populate the dropdown
  d3sparql.query( endpoint, sparql, populateDropdown );
}
