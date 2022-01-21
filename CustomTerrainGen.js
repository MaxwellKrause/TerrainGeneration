/*
LIST OF CONFIGURABLE VARS

height --make sure to set upper threshold
width --make sure to set upper threshold
tile size
hillYRange --the larger the bigger and more spontaneous the hills will be
hillXRange --the larger the value the wider the hills will be
hillYOffset this is used to select how much land you want below all of the hills, valleys will not extend below this number
*/
function CustomGen(canvas, draw, width, height, hillYOffset, hillYRange, hillXRange, minDistance) {
    var xArray = [];
    var yArray = [];
    //initiate(width, height); //makes a 2d array for the dimensions filled with "0"
    calculatePoints(width, xArray, yArray, hillXRange, hillYRange, hillYOffset, minDistance); //calculates the points that will e used with the connect quadratic, use imported inputs
    surfaceLineGen(xArray, yArray, draw); //generates a series of parabolas that make a curvy landscape
    //surfaceGen(width, height, tileArray); //populates the array with a single layer of "1" for the surface fo the generated terrain
}

function initiate(width, height) { //makes a 2d array for the size of the terrain filled with "0"
    for(let i = 0; i < width; i = i + 1) {
        tileArray[i] = [];
        for(let j = 0; j < height; j = j + 1) {
            tileArray[i][j] = "0";
        }
    }
}
function calculatePoints(width, xArray, yArray, hillXRange, hillYRange, hillYOffset, minDistance) {
    //section that calculates the points on the x-axis
    for(let i = 0; i < width; i = i + 1) {
        if(i == 0) { // adds a point for the first pixel in the canvas, makes the line not start at a random point
            xArray.push(i);
        }
        if(i == width-1) {
            xArray.push(i);
        }
        var random = Math.random() * 100;
        if(random < hillXRange) { //if the random num is < input % chance of new point ever pixel
            if(minDistance > 0) {
                if(i - minDistance > xArray[xArray.length-1]) { //if the user selected a minimun hill X displacement
                    xArray.push(i);
                }
            } else {
                xArray.push(i); //adds the x value (pix) into the end of the xArray
            }
        }
    }
    //section that calculates the pounts on the y-axis
    for(let i = 0; i < xArray.length; i = i + 1) {
        if(i == 0) {
            yArray.push((Math.floor(Math.random() * hillYRange)) + parseInt(hillYOffset)); //puts the starting height into the yArray
        }
        if(i == width-1) {
            yArray.push((Math.floor(Math.random() * hillYRange)) + parseInt(hillYOffset));
        }
        var yPoint = ((Math.floor(Math.random() * hillYRange)) + parseInt(hillYOffset));
        yArray.push(yPoint);
    }
}
function surfaceLineGen(xArray, yArray, draw) {
    var points = xArray.length;
    draw.strokeStyle = "blue";
    draw.lineWidth = 3;
    draw.beginPath();
    draw.moveTo(xArray[0], yArray[0]);
    for(var i = 0; i < points-2; i ++) {
        var xc = (xArray[i] + xArray[i+1]) / 2;
        var yc = (yArray[i] + yArray[i+1]) / 2;
        draw.quadraticCurveTo(xArray[i], yArray[i], xc, yc);
    }
    draw.quadraticCurveTo(xArray[i], yArray[i], xArray[i+1], yArray[i+1]);
    draw.stroke();
}