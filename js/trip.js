/*
* Author: Logan C. Urfer
* File: trip.js
* Purpose: This file holds the logic for creating a path around a set of nodes.
*/
class trip {
    constructor(graph) {
        this.graph = graph;
        this.path = [];
        this.availableNodes = [];
        this.canvas = this.graph.canvas;

        this.initializeNodes();
    }

    /*
    * Fills our availableNodes array, which holds all nodes available
    * to add to our trip path.
    */
    initializeNodes() {
        var i = 0;
        
        while (i < this.graph.numNodes)
            this.availableNodes[i] = i++;

    }

    /*
    * Checks to see if a given node is held in our available nodes array.
    *
    * @ param pos Holds the number of the node we wish search for
    * 
    * @ return True if node exists in availableNodes array, false if otherwise.
    */
    isNodeAvailable(pos) {
        var toRet = false;

        if (this.availableNodes.indexOf(pos) != -1)
            toRet = true;

        return toRet;
    }

    /*
    * Adds a passed node to our path and removes it from our availableNodes array
    *
    * @ param node The number of the node we wish to insert into our path
    */
    addToPath(node) {
        // append to our path array
        this.path.push(node);
        // remove from our available cities array
        this.availableNodes.splice(this.availableNodes.indexOf(node), 1);
    }

    /*
    * Calculates the total distance traveled (in pixels) to traverse our path.
    */
    calculateTotalDistance() {
        var totalDistance = 0;
        
        for (var i = 0; i < this.path.length - 1; i++) {
            totalDistance += this.graph.findDistance(this.path[i], this.path[i + 1]); 
        }
        
        return totalDistance;
    }
    
}
