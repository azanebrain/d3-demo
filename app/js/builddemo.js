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
