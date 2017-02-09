const HexesAdjacent = [
    [0, 4, 8, 12, 7, 3], [1, 5, 9, 13, 8, 4], [2, 6, 10, 14, 9, 5],
    [7, 12, 17, 22, 16, 11], [8, 13, 18, 23, 17, 12], [9, 14, 19, 24, 18, 13], [10, 15, 20, 25, 19, 14],
    [16, 22, 28, 33, 27, 21], [17, 23, 29, 34, 28, 22], [18, 24, 30, 35, 29, 23], [19, 25, 31, 36, 30, 24], [20, 26, 32, 37, 31, 25],
    [28, 34, 39, 43, 38, 33], [29, 35, 40, 44, 39, 34], [30, 36, 41, 45, 40, 35], [31, 37, 42, 46, 41, 36],
    [39, 44, 48, 51, 47, 43], [40, 45, 49, 52, 48, 44], [41, 46, 50, 53, 49, 45]
];
function Hex(position, resource, diceValue, poly=null, hex=null, selected=false) {
    this.position = position;
    this.resource = resource;
    this.diceValue = diceValue;
    this.poly = poly;
    this.hex = hex;
    this.selected = selected;
    this.adj = HexesAdjacent[this.position];
    this.info = function() {
        return("Position: " + this.position + " resource: " + this.resource + " color: " + this.color + " dice value: " + this.diceValue);
    }
    this.setPosition = function(newPos) {
        this.position = newPos;
        this.adj = HexesAdjacent[newPos];
        this.hex.events.onInputDown.add(hexShowAdj, {adj: this.adj});
    };
    this.hex.events.onInputDown.add(hexShowAdj, {adj: this.adj});
    this.hex.events.onInputUp.add(hexHideAdj, {adj: this.adj});
}
function hexShowAdj(hex) {
    this.adj.forEach(function(city){
        gb.cities[city].sprite.frame = 1;
    });
}
function hexHideAdj(hex) {
    this.adj.forEach(function(city){
        gb.cities[city].sprite.frame = 4;
    });
}
function generateHexPoints() {
    /** Creates a Phaser.Point for each hex vertex in the game board. 
     *  The orientation is such that the flat sides of the hexes are left and right.
     *
     *  @return 2d array of Phaser.Point indexed by rows ie. [row][column]
    */
    var x = [];
    var y = [];
    // rows of Phaser.Point
    var row1 = [];
    var row2 = [];
    var row3 = [];
    var row4 = [];
    var row5 = [];
    var row6 = [];
    var row7 = [];
    var row8 = [];
    var row9 = [];
    var row10 = [];
    var row11 = [];
    var row12 = [];
    var rows = [];
    for (var i = 0; i < 11; i++) {
        x.push(HEX_ORIGIN_X + (i * (HEX_X_OVERLAP)));
    }    
    y.push(HEX_ORIGIN_Y);
    for (i = 1; i < 12; i++) {
        if ((i % 2) == 0) {
            y.push(y[i - 1] + HEX_SIDE_LENGTH);
        } else {
            y.push(y[i - 1] + HEX_Y_OVERLAP);
        }
    }
    
    //row 1 starts on x[3], uses y[0]
    var j = 0;
    var thePoint;
    for (i = 3; i <= 7; i += 2) {
        thePoint = new Phaser.Point(x[i], y[j]);
        row1.push(thePoint); 
    }
    rows.push(row1);
    // Row 2 starts on x[2], uses y[1]
    j = 1;
    for (i = 2; i <= 8; i += 2) {
        thePoint = new Phaser.Point(x[i], y[j]);
        row2.push(thePoint); 
    }
    rows.push(row2);
    // Row 3 starts on x[2], uses y[2]
    j = 2;
    for (i = 2; i <= 8; i += 2) {
        thePoint = new Phaser.Point(x[i], y[j]);
        row3.push(thePoint); 
    }
    rows.push(row3);
    // Row 4 starts on x[1], uses y[3]
    j = 3;
    for (i = 1; i <= 9; i += 2) {
        thePoint = new Phaser.Point(x[i], y[j]);
        row4.push(thePoint); 
    }
    rows.push(row4);
    // Row 5
    j = 4;
    for (i = 1; i <= 9; i += 2) {
        thePoint = new Phaser.Point(x[i], y[j]);
        row5.push(thePoint); 
    }
    rows.push(row5);
    // Row 6
    j = 5;
    for (i = 0; i <= 10; i += 2) {
        thePoint = new Phaser.Point(x[i], y[j]);
        row6.push(thePoint); 
    }
    rows.push(row6);
    // Row 7
    j = 6;
    for (i = 0; i <= 10; i += 2) {
        thePoint = new Phaser.Point(x[i], y[j]);
        row7.push(thePoint); 
    }
    rows.push(row7);
    // Row 8
    j = 7;
    for (i = 1; i <= 9; i += 2) {
        thePoint = new Phaser.Point(x[i], y[j]);
        row8.push(thePoint); 
    }
    rows.push(row8);
    // Row 9
    j = 8;
    for (i = 1; i <= 9; i += 2) {
        thePoint = new Phaser.Point(x[i], y[j]);
        row9.push(thePoint); 
    }
    rows.push(row9);
    // Row 10
    j = 9;
    for (i = 2; i <= 8; i += 2) {
        thePoint = new Phaser.Point(x[i], y[j]);
        row10.push(thePoint); 
    }
    rows.push(row10);
    // Row 11
    j = 10;
    for (i = 2; i <= 8; i += 2) {
        thePoint = new Phaser.Point(x[i], y[j]);
        row11.push(thePoint); 
    }
    rows.push(row11);
    // Row 12
    j = 11;
    for (i = 3; i <= 7; i += 2) {
        thePoint = new Phaser.Point(x[i], y[j]);
        row12.push(thePoint); 
    }
    rows.push(row12);
    return rows;
}

/**
 * Create a Phaser.Polygon that defines a hexagon
 * @param rowArr row indices of hex points clockwise from topmost point
 * @param colArr column indices of hex points clockwise from topmost point
 * @param hexPoints 2d array of Phaser.Point, defining all hexagon vertices on
 *      the game board 
 * @return Phaser.Polygon at specified coordinates
 */
function generatePolygon(rowArr, colArr, hexPoints) {
    
    var poly = new Phaser.Polygon(hexPoints[rowArr[0]][colArr[0]], hexPoints[rowArr[1]][colArr[1]],
        hexPoints[rowArr[2]][colArr[2]], hexPoints[rowArr[3]][colArr[3]], hexPoints[rowArr[4]][colArr[4]],
        hexPoints[rowArr[5]][colArr[5]]);
   
    return poly;
}

/**
 * Define hexagon tiles on the game board
 * @param hexPoints 2d array of Phaser.Point, defining all hexagon vertices on 
 *      the game board
 * @return array of Phaser.Polygon, in order top->bottom, left->right
 */
function generateHexPolys(hexPoints) {
    var hexPoly1 = generatePolygon([0, 1, 2, 3, 2, 1],[0, 1, 1, 1, 0, 0], hexPoints);
    var hexPoly2 = generatePolygon([0, 1, 2, 3, 2, 1],[1, 2, 2, 2, 1, 1], hexPoints);
    var hexPoly3 = generatePolygon([0, 1, 2, 3, 2, 1],[2, 3, 3, 3, 2, 2], hexPoints);
    var hexPoly4 = generatePolygon([2, 3, 4, 5, 4, 3],[0, 1, 1, 1, 0, 0], hexPoints);
    var hexPoly5 = generatePolygon([2, 3, 4, 5, 4, 3],[1, 2, 2, 2, 1, 1], hexPoints);
    var hexPoly6 = generatePolygon([2, 3, 4, 5, 4, 3],[2, 3, 3, 3, 2, 2], hexPoints);
    var hexPoly7 = generatePolygon([2, 3, 4, 5, 4, 3],[3, 4, 4, 4, 3, 3], hexPoints);
    var hexPoly8 = generatePolygon([4, 5, 6, 7, 6, 5],[0, 1, 1, 0, 0, 0], hexPoints);
    var hexPoly9 = generatePolygon([4, 5, 6, 7, 6, 5],[1, 2, 2, 1, 1, 1], hexPoints);
    var hexPoly10 = generatePolygon([4, 5, 6, 7, 6, 5],[2, 3, 3, 2, 2, 2], hexPoints);
    var hexPoly11 = generatePolygon([4, 5, 6, 7, 6, 5],[3, 4, 4, 3, 3, 3], hexPoints);
    var hexPoly12 = generatePolygon([4, 5, 6, 7, 6, 5],[4, 5, 5, 4, 4, 4], hexPoints);
    var hexPoly13 = generatePolygon([6, 7, 8, 9, 8, 7],[1, 1, 1, 0, 0, 0], hexPoints);
    var hexPoly14 = generatePolygon([6, 7, 8, 9, 8, 7],[2, 2, 2, 1, 1, 1], hexPoints);
    var hexPoly15 = generatePolygon([6, 7, 8, 9, 8, 7],[3, 3, 3, 2, 2, 2], hexPoints);
    var hexPoly16 = generatePolygon([6, 7, 8, 9, 8, 7],[4, 4, 4, 3, 3, 3], hexPoints);
    var hexPoly17 = generatePolygon([8, 9, 10, 11, 10, 9],[1, 1, 1, 0, 0, 0], hexPoints);
    var hexPoly18 = generatePolygon([8, 9, 10, 11, 10, 9],[2, 2, 2, 1, 1, 1], hexPoints);
    var hexPoly19 = generatePolygon([8, 9, 10, 11, 10, 9],[3, 3, 3, 2, 2, 2], hexPoints);
    
    var theHexes = [hexPoly1, hexPoly2, hexPoly3, hexPoly4, hexPoly5, hexPoly6,
        hexPoly7, hexPoly8, hexPoly9, hexPoly10, hexPoly11, hexPoly12, hexPoly13,
        hexPoly14, hexPoly15, hexPoly16, hexPoly17, hexPoly18, hexPoly19];
    graphics.beginFill(0xFFFFFF);
    theHexes.forEach(function(hex){
        
        graphics.drawPolygon(hex);
        
    });
    graphics.endFill();
    return theHexes;
}

/**
 * Create a hexagon tile image on the game board
 * @param point Phaser.Point coordinates of top point of this hexagon
 * @param theResource the resource of this tile
 * @return Phaser.Sprite containing a resource icon, scaled and rotated for
 *      game board dimensions
 */
function generateHexSprite(point, theResource) {
    // Hex sprite image is scaled for a board width of 1700px
    var scale = BOARD_HEIGHT / 1700;
    console.log(scale);
    const startingAlpha = 1;
    const xPad = HEX_ORIGIN_X;
    const yPad = HEX_ORIGIN_Y + HEX_HEIGHT / 2;
    var theSprite = game.add.sprite(point.x + xPad, point.y + yPad, "hex_sheet");
    theSprite.inputEnabled = true;
    theSprite.scale.x = theSprite.scale.y = scale;
    theSprite.frame = theResource;
    theSprite.alpha = startingAlpha;
    theSprite.angle = 30;
    theSprite.anchor.setTo(0.5, 0.5);
    //theSprite.events.onInputOver.add(noAlpha);
    //theSprite.events.onInputOut.add(halfAlpha);
    return theSprite;
}
function noAlpha(theSprite) {
    theSprite.alpha = 1;
}
function halfAlpha(theSprite) {
    theSprite.alpha = 0.5;
}
function generateHexes(hexPolys, resourceOrder, diceValues) {
    var resources = ["lumber", "wool", "wheat", "bricks", "ore", "desert"];
    var colors = [0x8F5F54, 0x737C84, 0xF9D355, 0xD8474B, 0x2A4348, 0xE0BB91];
    var hexes = [];
    for (var i = 0; i < hexPolys.length; i++) {
        var theResource = resources[resourceOrder[i]];
        var theColor = colors[resourceOrder[i]];
        var thePoly = hexPolys[i]
        var theSprite = generateHexSprite(hexPolys[i].points[0], resourceOrder[i]); 
        var theHex = new Hex(i, theResource, diceValues[i], hexPolys[i], theSprite, false);
        hexes.push(theHex);
    }
    return hexes;
}
/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 * src: stackoverflow 6274339
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}