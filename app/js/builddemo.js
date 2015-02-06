// var ActorRuntime = new SVX();
var targetActor = "";
var visualizationquery = "";

/**
 * Updates the query string that will be visualized
 */
function updateQuery() {
  // console.debug("Updating query vars");
  // Reset the variables based on user input
  targetActor = document.getElementById('actor-dropdown').value; //Update the target actor
  datefilter = document.getElementById('datefilter').value; //The date
  // datefiltercompare = document.getElementById('datefiltercompare').value;
  datefiltercompare = document.querySelector('input[name="datefiltercompare"]:checked').value;
  //Rewrite the query with the custom vars
  visualizationquery = "SELECT ?movieName ?runTime (SUBSTR(?date, 1, 4) AS ?date) ?filmid " +
    "(count(*) as ?numActors) " +
    "FROM <movie> WHERE { " +
    "?targetActor    <http://data.linkedmdb.org/resource/movie/actor_name> \"" + targetActor + "\". " +
    "?movie <http://data.linkedmdb.org/resource/movie/actor> ?targetActor. " +
    "?movie <http://data.linkedmdb.org/resource/movie/actor> ?actor. " +
    "?movie <http://www.w3.org/2000/01/rdf-schema#label> ?movieName. " +
    "?movie <http://data.linkedmdb.org/resource/movie/filmid> ?filmid. " +
    "?movie <http://data.linkedmdb.org/resource/movie/runtime> ?runTime. " +
    "?movie <http://purl.org/dc/terms/date> ?date. ";
  // Add a filter if the user has defined one
  // Note: No need to confirm the value of the comparison operator since Greater Than is selected by default
  if ( datefilter != '' ) {
    visualizationquery += "filter ( ?date " + datefiltercompare + " \"" + datefilter + "\" ) ";
  }
  visualizationquery +=
    "} " +
    "GROUP BY ?movieName ?runTime ?date ?filmid ?targetActor ?movie " +
    "LIMIT 100";
  console.debug("Updated to this query: " + visualizationquery);
  document.getElementById('sparql').innerHTML = visualizationquery; //Update the query text xok
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
