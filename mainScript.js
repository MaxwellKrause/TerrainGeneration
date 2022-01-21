var canvas = document.getElementById("generation_canvas");
var draw = canvas.getContext("2d");
var previousInterface;
//resize the canvas to the size of the browser
function resizeCanvas() {
    document.getElementById('generation_canvas').setAttribute('width', 10000);
    document.getElementById('generation_canvas').setAttribute('height', 2000);
}
function changeType() {
    if(window.getComputedStyle(quadratic_pannel).getPropertyValue("display") == "block") {
        document.getElementById("quadratic_pannel").style.display = "none";
        document.getElementById("noise_pannel").style.display = "block";
    }
    else {
        document.getElementById("quadratic_pannel").style.display = "block";
        document.getElementById("noise_pannel").style.display = "none";
    }
}
//when generate button is pressed grab needed variables
function submitted() {
    if(window.getComputedStyle(quadratic_pannel).getPropertyValue("display") == "block") {
        var width = document.getElementById("width").value;
        var height = document.getElementById("height").value;
        var hillYOffset =  document.getElementById("hillOffset").value;
        var hillYRange =  document.getElementById("HillYRange").value;
        var hillXRange =  document.getElementById("HillXRange").value;
        var minDistance =  document.getElementById("minDistance").value;
        document.getElementById("generation_canvas").width = width;
        document.getElementById("generation_canvas").height = height;
        CustomGen(canvas, draw, width, height, hillYOffset, hillYRange, hillXRange, minDistance);
        if(document.getElementById("chooseTile").checked) {
            ConvertToTiles();
        }
    }
    else {

    }
}
function ConvertToTiles() {
    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;
    var hillYOffset =  document.getElementById("hillOffset").value;
    var tileSize = 20;
    convertToTiles(width, height, hillYOffset, tileSize, draw);
}
function tileOptions() {
    document.getElementById("tile_options_pannel").style.display = "block";
    if(window.getComputedStyle(quadratic_pannel).getPropertyValue("display") == "block") {
        document.getElementById("quadratic_pannel").style.display = "none";
        previousInterface = "quadratic_pannel";
    }
    else {
        document.getElementById("noise_pannel").style.display = "none";
        previousInterface = "noise_pannel";
    }
}
resizeCanvas();
submitted();