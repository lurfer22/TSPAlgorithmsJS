/*
* Author: Logan C. Urfer
* File: nearestNeighbor.js
* Purpose: Implements my interpretation of the Nearest Neighbor algorithm.
*          The Nearest Neighbor algorithm works as so.
*          1. Start with a random node between 0 and numNodes inclusive.
*          2. Find the closest neighboring node that has yet to be visited.
*          3. Repeat process until each node has been visited and return to the starting city.
* Note: This algorithm is sub-obtimal in terms of accuracy, but has a time complexity of O(n^2).
*
*/

class nearestNeighbor {
    constructor(ugraph) {
        // Grab a reference to our uGraph
        this.uGraph = ugraph;

        // grab a quick reference to the array of nodes in our graph
        this.graph = this.uGraph.graph;
        
        // Create a trip object to track our algorithms trip
        this.path = new trip(this.uGraph);
    
        this.findPath();
    
    }

    /*
    * This function implements the nearest neighbor algorithm to find 
    * a path that visits every node in our graph once.
    */
    findPath() {
        // Pick random value between 0 and numNodes inclusive
        // and set that as first node in trip
        var currCity = Math.floor(Math.random() * this.graph.length);
        // Add our start city to our path
        this.path.addToPath(currCity);
        
        // While our trips path is shorter than the total number of nodes available
        // in our graph, keep searching for nodes.
        while (this.path.path.length < this.graph.length) {
            // Find closest node to the last node in our trip
            var nextCity = this.findNearestNode(currCity);
            
            // Add closest available neighbor to path
            this.path.addToPath(nextCity);

            // Find next nearestNeighbor
            currCity = nextCity;
        }

        // Add the first node in our path to the end of our path
        // to create a cycle.
        this.path.addToPath(this.path.path[0]);
    }

    /*
    * This function take an integer and finds the node in the graph that is minimal
    * in distance while also stil having not been visited.
    * 
    * @param currNode An integer represting a node number
    *
    * @return An integer containing the closest city to currNode
    */
    findNearestNode(currNode) {
        // Grab the adjacency list of the node passed
        var neighbors = this.graph[currNode].adjList;
        var shortestPath = Number.MAX_VALUE;
        // Set an arbitrary number as our closest city
        var closestCity = 1;

        // Search through every node in our neighbors list
        for (var i = 0; i < neighbors.length; i++) {
            var currNode = neighbors[i];
            // if the current node is not 0 (it's not point to itself),
            // is available to move to and is a shorter distance than our 
            // current shortest distance, than set to the current city
            if (currNode !== 0 && currNode < shortestPath && this.path.isNodeAvailable(i)) {
                closestCity = i;
                shortestPath = currNode;
            }
        }
        
        return closestCity;
    }

    /*
    * Provides the drawing animation for our canvas. 
    */
    drawPath() {
        var animationTiming = 30; // in ms
        // Create local vars for our fields so we don't lose track of this.
        var graph = this.graph;
        var path = this.path.path;
        var canv = this.path.canvas;
        
        // Represents the current index of our path we are drawing a line for.
        var index = 0;

        // Update our canvas every (animationTiming) ms
        var id = setInterval(drawTheseLines, animationTiming);

        /*
        * Draws a line to our canvas.
        */
        function drawTheseLines() {
            if (index === path.length - 1) {
                clearInterval(id);
            } else { 
                var fromNode = graph[path[index]];
                var toNode = graph[path[index + 1]];
        
                var startX = fromNode.x;
                var startY = fromNode.y;
                var endX = toNode.x;
                var endY = toNode.y;
                    
                canv.drawLine(startX, startY, endX, endY, "blue");

                index++;
            }
        }
    }

    /*
    * Calculates the total distance of our path.
    */
    calculateDistance() {
        return this.path.calculateTotalDistance();
    }
}
