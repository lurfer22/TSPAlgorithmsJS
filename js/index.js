/*
* Author: Logan C. Urfer
* File: index.js
* Purpose: Controls the js logic of our web page.
*
*/

// Create a canvas where circles drawn are red
// and each circle has a 5px radius
var canv = new canvas("red", 5);
var graph;
var NN;
var time;

// Set the value of our nodes display to value of our range input
initializeRangeValue();

// Add a listener to the draw nodes button
$(document).on('click', '#redrawNodesBtn', function() {
    // Grab the number of nodes user has specified
    var numNodes = $("#customRange2")[0].value;
    
    // Create a new uGraph and draw its respective nodes to the canvas
    graph = new uGraph(numNodes, canv);
    graph.drawNodes();

    // Create a new trip that uses the nearest node algorithm.
    var start = Date.now();      
    NN = new nearestNeighbor(graph);
    time = (Date.now() - start);
});

// Adds a listenr to our find paths button
$(document).on('click', '#findPathsBtn', function() {
    // Draw our algorithms path to the screen
    NN.drawPath();
    // Add algorithm stats to the table.
    pushToRow(1, "Nearest Neighbor", NN.calculateDistance(), time);
});

/*
* Sets the value of the html tag with the nodes id
* to the value of our range input.
*/
function initializeRangeValue() {
    nodes.innerHTML = customRange2.value;
}

/*
* Pushes the stats of an algorithm to the table on our html
* page. 
*
* @param rowNum the number of the row we wish to push to
* @param name The name of the algorithm we are print
* @param distance The total distance of the algorithms calculated path
* @param time The time it took for the algorithm to calculate its path
*/
function pushToRow(rowNum, name, distance, time) {
    // locate table element
    var table = $("table")[0];
    
    // if table has more than one row, than delete the first row and replace with new stats
    if (table.rows.length > rowNum)
        removeRow(table, rowNum);

    // insert a new row into our table.
    var row = table.insertRow(rowNum);

    var col1 = row.insertCell(0);
    col1.innerHTML = name;
    var col2 = row.insertCell(1);
    col2.innerHTML = distance;
    var col3 = row.insertCell(2);
    col3.innerHTML = time;
}

/*
* Removes a row from the table element specified.
*
* @param table The table element found in our html page
* @param rowNum The row number we wish to delete from our table
*/
function removeRow(table, rowNum) {
    table.deleteRow(rowNum);
}
