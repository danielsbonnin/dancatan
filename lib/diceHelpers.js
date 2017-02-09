/**
 * Create and display a dice value icon, relative to a set of coordinates.
 * @param point Phaser.Point
 * @param diceValue the dice value to display on the icon
 * @return a reference to the Phaser.Sprite dice value icon created
 */

function createDiceVal(point, diceValue) {
    // Set up positioning relative to point
    
    // Dice value sprite image is scaled for a board width of 1000px
    const diceValScale = BOARD_HEIGHT / 1000;
    var xPad = HEX_ORIGIN_X;
    var yPad = HEX_ORIGIN_Y + HEX_HEIGHT / 2;
    
    // Create and display dice value icon
    var diceVal = game.add.sprite(point.x + xPad, point.y + yPad, 'dice_vals_sheet');
    
    diceVal.anchor.setTo(0.5, 0.5);
    diceVal.alpha = 0.8;
    diceVal.scale.x = diceVal.scale.y = diceValScale;
    
    // Frame # = diceValue - 2 because zero index on spritesheet, and a value of
    // 1 does not exist.
    diceVal.frame = diceValue - 2;
    return diceVal;
}

/**
 * Reorder the hex dice values such that the desert tile is inserted into the 
 * spiral ordering of the tiles.
 * @param desertIdx  the index (in normal ordering) of the desert hex
 * @return Updated dice values in normal order
 */
function generateDiceVals(desertIdx) {
    var newDiceValues = []; // Updated dice values in regular order
    
    // Values of dice in normal order
    var diceValues = [6, 5, 9, 4, 3, 8, 10, 6, 5, 9, 12, 3, 2, 10, 11, 11, 4, 8];
    
    // Indices into diceValues in spiral order
    var spiralHexIdxs = [0, 3, 7, 12, 16, 17, 18, 15, 11, 6, 2, 1, 4, 8, 13, 14, 10, 5, 9];
    
    // Dice values in spiral order omitting the desert dice value    
    var spiralDiceValues = [6, 4, 6, 3, 11, 4, 8, 11, 12, 10, 9, 5, 3, 5, 2, 10, 9, 8];
    
    // Add the "desert" dice value at the index of the "desert" hex
    spiralDiceValues.splice(spiralHexIdxs.indexOf(desertIdx), 0, 7);
    
    // Translate spiral dice values into normal order
    for (var i = 0; i < spiralHexIdxs.length; i++) {
        newDiceValues.push(spiralDiceValues[spiralHexIdxs.indexOf(i)]);
    }
    return newDiceValues;

}

/**
 * Create Phaser.Sprite display objects representing the dice value of each hex.
 * @param hexPolys Phaser.Polygon hexagon array representing the coordinates of 
 *      each hex, in normal ordering (left to right, top to bottom)
 * @param diceVals integer array containing the dice value of each hex, in normal
 *      order.
 * @return an array of Phaser.Sprite dice value labels
 */
function generateDiceValCircles(hexPolys, diceVals) {
    var diceValCircles = [];
    for( var i = 0; i < hexPolys.length; i++) {
        diceValCircles.push(createDiceVal(hexPolys[i].points[0], diceVals[i]));
    }
    return diceValCircles;
}