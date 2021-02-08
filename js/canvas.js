/*
* Author: Logan C. Urfer
* File: canvas.js
* Purpose: Responsible for making all changes to our html canvas.
*/

class canvas {
    constructor(circleColor, circleRadius) {
        // Grab canvas object from html
        this.canvas = $('#myCanvas')[0];
        this.ctx = this.canvas.getContext("2d");
        this.circleRadius = circleRadius;
        this.circleColor = circleColor;
        // Set width of canvas to size of container
        this.resizeCanvas();

        // Resize our canvas if width of viewport is changed
        $(window).resize(this.resizeCanvas.bind(this));
    }

    /*
    * Resizes our canvas if viewport is changed, allows for a bit of responsiveness
    * in the webpage.
    *
    */
    resizeCanvas() {
        this.canvas.width = $('#canvasContainer')[0].clientWidth;
    }

    /*
    * Draws a circle at point (x, y) on our canvas. Uses class fields
    * circleRadius to determine size.
    *
    * @ param x X value of our point
    * @ param y Y value of our point
    */
    drawCircle(x, y) {
        this.ctx.beginPath();

        this.ctx.fillStyle = this.circleColor;
        this.ctx.arc(x, y, this.circleRadius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        
        this.ctx.closePath();

    }

    /*
    * Draws a line from (x1, y1) to (x2, y2) on our canvas.
    *
    * @ param startX X value of point to draw from
    * @ param startY Y value of point to draw from
    * @ param endX X value of point to draw to
    * @ param endY Y value of point to draw to
    */
    drawLine(startX, startY, endX, endY, lineColor) {
        // Force new shapes to be drawn behind existing canvas content
        this.ctx.globalCompositeOperation = "destination-over";

        this.ctx.beginPath();
        
        this.ctx.strokeStyle = lineColor;
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        
        this.ctx.closePath();
        
    }
    
    /*
    * Erases all things on our canvas. Generally used for redrawing animations.
    *
    */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


