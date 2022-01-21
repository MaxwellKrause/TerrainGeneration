/* 
this is the file which converts the generated quadratic line to
a downloadale text file after rendering the line into tiles
*/

function convertToTiles(width, height, hillYOffset, tileSize, draw) {
    var tileArray = []
    var counter1 = 0;
    var counter2 = 0;
    for(let i = 0; i < width; i = i + tileSize) {//gets all cords for tiles
        var found = false;
        var j = 0;
        //goes through the y and finds the point that is part of the quadratic line\
        while(found == false) {
            counter1++;
            j = j + 3; 
            var pix = draw.getImageData(i, j, 1, 1).data;
            var color = rgbToHex(pix[0], pix[1], pix[2]);
            if(color == draw.strokeStyle) {
                counter2++;
                var yVal = j - (j % tileSize);
                found = true;
                tileArray.push({x:i, y:yVal})
            }
        }
    }
    draw.fillStyle = "white";
    draw.fillRect(0, 0, width, height);
    draw.fillStyle = "green";
    displayTiles(tileArray, tileSize, height);
}

function displayTiles(tileArray, tileSize, height) {
    var dirtLayer = true;
    var dirtNumber = 3;
    var grassDepth = 2;
    for(let i = 0; i < tileArray.length; i = i + 1) {
        for(let j = 0; j < grassDepth; j = j + 1) {
            draw.fillStyle = "green";
            draw.fillRect(tileArray[i].x, tileArray[i].y + (tileSize * (j - 1)), tileSize, tileSize);
        }
        for(let j = tileArray[i].y + tileSize; j < height; j = j + tileSize) {
            draw.fillStyle = "rgb(100, 100, 100)";
            draw.fillRect(tileArray[i].x, j, tileSize, tileSize);
        }
        if(dirtLayer == true) {
            for(let j = tileArray[i].y + tileSize; j < tileArray[i].y + ((dirtNumber + grassDepth) * tileSize); j = j + tileSize) {
                draw.fillStyle = "rgb(200, 100, 50)";
                draw.fillRect(tileArray[i].x, j, tileSize, tileSize);
            }
        }
    }
}

function rgbToHex(red, green, blue) {
    var rgb = blue | (green << 8) | (red << 16);
    return '#' + (0x1000000 + rgb).toString(16).slice(1)
}