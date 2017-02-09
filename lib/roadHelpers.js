/** 
 * A Road adjacent to 1 or more hex tiles on the game board, adjacent to 1 - 4 
 *      other Roads.
 * @constructor
 * @this {Road}
 * @param {number} position Index into the ordered list of roads on the board
 * @param {number} owner the player who placed this road, or none
 * @param {number[]} adj array of adjacent roads (order not important)
 * @param {number|boolean} selected currently has focus
 * @param {number} x X coordinate of sprite
 * @param {number} y Y coordinate of sprite
 * @param {number} angle Rotation of sprite
 * @param {number} scale Scale of sprite
 */
function Road(position, owner, adj=[null, null, null, null], selected=null, x=0, y=0, angle=0, scale=1) {
    this.position = position;
    this.selected = selected;
    this.owner = owner;
    this.adj = [null, null, null, null];
    this.sprite = generateRoadSprite(x, y, angle, scale, owner, position);
    this.toString = function() {
        const ownerColors =["blue", "orange", "red", "white", "none"]; 
        return "Position: " + this.position + " Owner " + ownerColors[this.owner] + " Adjacent: " + this.adj;
    };
    this.setPosition = function (newPos) {
        this.position = newPos;
        this.adj = RoadGraph[newPos];
        this.sprite.events.onInputDown.add(showAdj, {roadIdx: this.position});
        this.sprite.events.onInputUp.add(hideAdj, {roadIdx: this.position});
    };
    
}

/**
 * Correct ordering of Road array to conform to roadGraph
 * @param {Road[]} original 2d Array of roads in original order
 * @return {Road[]} Array in correct order, with updated
 *      position member
*/
function reorderRoads(original) {
    var reordered = [];
    
    // Indices of original, in correct order
    const order = [ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 25, 27, 29, 31,
                    33, 34, 35, 37, 39, 41, 42, 43, 45, 47, 48, 1, 3, 5, 7, 9,
                    11, 13, 15, 17, 19, 21, 23, 26, 28, 30, 32, 36, 38, 40, 44,
                    46, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62,
                    63, 64, 65, 66, 67, 68, 69, 70, 71, 0];
    
    // Loop original, placing at indices defined in order array
    for (var i = 0; i < 72; i++) {
        var newIdx = order[i];
        reordered[newIdx] = original[i];
        reordered[newIdx].setPosition(newIdx);
    }
    return reordered;
}

/**
 * Generate a Phaser.Sprite road
 * @param {number} x The x coordinate
 * @param {number} y The y coordinate
 * @param {number} angle The rotation
 * @param {number} scale Scale of 60px X 10px road image frame
 * @param {number} type The player color or blank
 * @return {Phaser.Sprite} A road on the game board
 */
function generateRoadSprite(x, y, angle, scale=1, type=4, roadIdx=0) {
    var theRoad = game.add.sprite(x, y, 'road_sheet');
    theRoad.inputEnabled = true;
    theRoad.anchor.setTo(0.5, 0.5);
    theRoad.angle = angle;
    theRoad.scale.x = theRoad.scale.y = scale;
    theRoad.frame = type;
    theRoad.hitArea = new Phaser.Circle(0, 0, 100);
    theRoad.events.onInputOver.add(showRoad);
    theRoad.events.onInputOut.add(hideRoad);
    return theRoad;
}
function showRoad(theRoad) {
    theRoad.frame = 0;
}
function hideRoad(theRoad) {
    theRoad.frame = 4;
}
function showAdj(theRoad) {
    gb.roads[this.roadIdx].adj.forEach(function(road) {
        gb.roads[road].sprite.frame = 2;
    });
}
function hideAdj(theRoad) {
    for (var i = 0; i < gb.roads[this.roadIdx].adj.length; i++) {
        gb.roads[gb.roads[this.roadIdx].adj[i]].sprite.frame = 4;
    };
}
/**
 * Create a Phaser.Sprite for each road on the board.
 * Assign scale and rotation.
 */
function generateRoads(hexPoints) {
    var numRoads = 72;
    var xPad, yPad;
    var roads = [];
    var roadWidth = parseInt(HEX_SIDE_LENGTH * 5 / 8);
    var roadScale = roadWidth / 60 // image is 60 pixels wide

    var idx = 0

    // Insert right-sloped roads
    
    // Y offset for right-sloped roads 
    yPad = HEX_ORIGIN_Y + HEX_HEIGHT / 8;

    for (var i = 0; i < hexPoints.length; i+= 2) {
        for (var j = 0; j < hexPoints[i].length; j++) {
            // Reverse last road for bottom half of the board.
            if ((i > 5) && (j == hexPoints[i].length - 1)) {
                // Last road in row, on bottom half of board is left of point
                xPad = HEX_ORIGIN_X - HEX_WIDTH / 4;
                roads.push(new Road(-1, 4, [], 0, x = hexPoints[i][j].x + xPad, y = hexPoints[i][j].y + yPad, angle = -30, roadScale));
            } else {
                xPad = HEX_ORIGIN_X + HEX_WIDTH / 4;
                roads.push(new Road(-1, 4, [], 0, x = hexPoints[i][j].x + xPad, y = hexPoints[i][j].y + yPad, angle = 30, roadScale));
            }
            idx++;
        }
    }
    
    // Insert left-sloped roads
    
    // Offsets for left-sloped roads
    yPad = HEX_ORIGIN_Y - HEX_HEIGHT / 8;
    xPad = HEX_ORIGIN_X + HEX_WIDTH / 4;
    
    for (var i = 1; i < hexPoints.length; i+= 2) {
        for (var j = 0; j < hexPoints[i].length - 1; j++) {
            roads.push(new Road(-1, 4, [], 0, x = hexPoints[i][j].x + xPad, y = hexPoints[i][j].y + yPad, angle = -30, scale = roadScale));
            idx++;
        }
    }
    
    // Insert vertical roads
    
    // Offsets for vertical roads
    yPad = HEX_ORIGIN_Y + HEX_HEIGHT / 4;
    xPad = HEX_ORIGIN_X;
    
    for (var i = 1; i < hexPoints.length - 1; i+= 2) {
        for (var j = 0; j < hexPoints[i].length; j++) {
            roads.push(new Road(-1, 4, [], 0, x = hexPoints[i][j].x + xPad, y = hexPoints[i][j].y + yPad, angle = 90, scale = roadScale));
            idx++;
        }
    }

    return reorderRoads(roads);
}