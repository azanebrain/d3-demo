/**
 * Populates a dropdown with the query results
 * Variables:
 * dropdown_target (string) : The ID of the target SELECT element
 * option_value (string) : The field being used to populate each OPTION element of the dropdown
 */
function populateDropdown(json) {
  var head = json.head.vars;
  var data = json.results.bindings;

  var config = {
    "dropdown_target": dropdown_target,
    "option_value": option_value
  };

  // console.debug("Populating Dropdown: " + config.target);
  var select = d3.select(config.dropdown_target) // Append <option> elements to the target dropdown menu
    .on("change", updateQuery); //Update the query when the user selects an actor
    // TODO: Make this an object
    // .on("change", SVXQuery.update); //Update the query when the user selects an actor
  var option = select.selectAll("option")
    .data(data)
    .enter()
    .append("option")
    .text( function(d) { return d[config.option_value].value } );
}
