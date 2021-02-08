/*
* Author: Logan C. Urfer
* File: node.js
* Purpose: Responsible for constructing our node object.
*          Each node object holds an x and y cord, along
*          with an adjacency list to keep track of distance 
*          to other nodes.
*
*/
class node {
    constructor(x, y) {
        this.adjList = [];       
        this.x = x;
        this.y = y;
        
    }
}
