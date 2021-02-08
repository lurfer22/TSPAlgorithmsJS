/*
* Author: Logan C. Urfer
* File: uGraph.js
* Purpose:  Represents an undirected graph comprised of nodes. Each node
*           holds an x point, y point, and an adjacency list. This class
*           is responsible for creating those nodes, calculating the distance
*           between the randomly generated nodes, and saving the distances
*           into the adjacency list of each node.
*
*/

class uGraph {
    constructor(numNodes, canv) {
        // number of nodes to be held in graph
        this.numNodes = numNodes;
        this.graph = [];
        this.canvas = canv;
        this.radius = this.canvas.circleRadius;

        // initialize each node
        this.initializeGraphNodes();
        // initialize each nodes weight in respect to eachother
        this.initializeGraphEdges();
    }

    /*
    * This function is responsible for generating nodes and placing them into our graph.
    * Each node is restricted from either; overlapping with eachother, or touching the boundary
    * of our canvas.
    */
    initializeGraphNodes() {
        // Generate nodes
        for (var i = 0; i < this.numNodes; i++) {
            // create a node with random x and y cords.
            var nodeToInsert = this.createNode();
            
            // if a node's (x,y) overlaps with another or a node
            // touches the canvas boundary, create a new
            // node
            while (this.checkIfNodesOverlap(nodeToInsert) || this.checkIfNodeTouchBoundaries(nodeToInsert)) {
                nodeToInsert = this.createNode();
                
            }

            // insert into our graph
            this.graph.push(nodeToInsert);
        }
    }

    /*
    * This function traverses each nodes held in our graph,
    * and asks our canvas object to draw it to the canvas.
    *
    */
    drawNodes() {
        this.canvas.clearCanvas();
        for (var i = 0; i < this.numNodes; i++) {
            var nodeToDraw = this.graph[i];

            this.canvas.drawCircle(nodeToDraw.x, nodeToDraw.y);
        }
    }
    
    /*
    * Calculates distance between all nodes in our graph and inserts
    * said distance into each nodes respective adjacency list.
    */
    initializeGraphEdges() {
        
        for (var fromNode = 0; fromNode < this.numNodes; fromNode++) {
            for (var toNode = fromNode; toNode < this.numNodes; toNode++) {
                // if fromNode = toNode, than no need to calculate distance because
                // they are same node. So, set to zero to imply that they are the 
                // same node in our adjacency list.
                if (fromNode === toNode) {
                    this.graph[fromNode].adjList[toNode] = 0;
                    this.graph[toNode].adjList[fromNode] = 0;
                } else {
                    var distance = this.calculateDistance(this.graph[fromNode], this.graph[toNode]);

                    // set distance in the adjacency lists of both nodes, so we don't
                    // have to traverse again for insertion.
                    this.graph[fromNode].adjList[toNode] = distance;
                    this.graph[toNode].adjList[fromNode] = distance;
                }   
            }
        }
    }

    /*
    * Generates a node with random x and y cords.
    *
    * @return A new node holding our randomly generated x and y cords.
    *
    */
    createNode() {
        // generate a random x value; 0 <= x <= (width of canvas)
        var randX = Math.floor(Math.random() * this.canvas.canvas.width);

        // generate a random y value; 0 <= y <= (height of canvas)
        var randY = Math.floor(Math.random() * this.canvas.canvas.height);

        return (new node(randX, randY));
        
    }

    /*
    * Checks to see if a given node overlaps any other node in our graph.
    *
    * @param nodeToCheck The node we want to check against all other nodes in graph
    * 
    * @return True if given nodes x and y cords overlap another nodes x and y cords,
    *         false if otherwise.
    */
    checkIfNodesOverlap(nodeToCheck) {
        var overlap = false;
        
        for (var i = 0; i < this.graph.length; i++) {
            var currNode = this.graph[i];

            // calculates the distance between our two nodes
            var distance = this.calculateDistance(currNode, nodeToCheck);
            


            // I multiply the radius by 4 to maintain a sizeable distance between
            // nodes. Need to multiply by a minimum of 2 or nodes will be too close
            // together.

            // if distance between both nodes is smaller than the size of our circle radius,
            // than nodes overlap.
            if (distance <= this.radius * 4) {
                overlap = true;
                break;
            }
        }
        return overlap;
    }
    
    /*
    * Checks to see if a given nodes touches the boundaries of our canvas.
    *
    * @param nodeToCheck The node we want to check.
    * 
    * @return True if node touches boundary, false if otherwise.
    */
    checkIfNodeTouchBoundaries(nodeToCheck) {
        
        var touchBoundaries = true;
        
        // multiply radius by 3 so nodes are a good distance away
        // from boundaries
        var radius = this.radius * 3;
        
        if (nodeToCheck.x >= radius && nodeToCheck.x <= (this.canvas.canvas.width - radius) && 
            nodeToCheck.y >= radius && nodeToCheck.y <= (this.canvas.canvas.height - radius)) {
 
            touchBoundaries = false;
        }

        return touchBoundaries;
    }

    /*
    * Calculates the distance between two coordinates via the pythagorean theorem.
    *
    * @param node1, node2 Nodes to calculate the distance between
    * 
    * @return The distance between node1 and node2
    */
    calculateDistance(node1, node2) {
        // distance = sqrt((x1 - x2) + (y1 - y2));
        var x = Math.pow((node1.x - node2.x), 2);
        var y = Math.pow((node1.y - node2.y), 2);
            
        var distance = Math.sqrt(x + y);        
        
        return distance;
    }

    /*
    * Used as a accessor to grab distance between nodes provides
    *
    * @param fromNode, toNode Integer values specifying which nodes to grab distance between.
    *
    */    
    findDistance(fromNode, toNode) {
        return (this.graph[fromNode].adjList[toNode]);
    
    }
}
