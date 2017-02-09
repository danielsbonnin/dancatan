const HARBOR_LIST = ["generic", "wool", "generic", "generic", "bricks", "lumber",
    "generic", "wheat", "ore"];
    
function Harbor(harborType="generic", position = -1, x=0, y=0, scale=1, angle=0) {
    this.harborType = harborType;
    this.position = position;
    this.sprite = generateHarborSprite(x, y, scale, this.harborType, angle);
    this.toString = function() {
        return "Harbor: type = " + this.harborType + " position = " +
            this.position;
    };
}

function generateHarborSprite(x, y, scale, type, angle) {
    // Harbor sprite image is scaled for a board width of 1000px
    const harborScale = BOARD_HEIGHT / 1000;
    const harborTypes = ["generic", "wool", "bricks", "lumber", "wheat", "ore"];
    var theHarborSprite = game.add.sprite(x, y, "harbor_sheet");
    theHarborSprite.anchor.setTo(0.5, 1);
    theHarborSprite.angle = angle;
    theHarborSprite.frame = harborTypes.indexOf(type); 
    theHarborSprite.scale.x = theHarborSprite.scale.y = harborScale;
    
    return theHarborSprite;
}

function generateHarbors(hexPoints, harborOrder=[0, 1, 2, 3, 4, 5, 6, 7, 8]) {
    var yPad = HEX_ORIGIN_Y;
    var xPad = HEX_ORIGIN_X;
    var harbors = [
        new Harbor(HARBOR_LIST[harborOrder[0]], 0, hexPoints[1][0].x + xPad, hexPoints[1][0].y + yPad - HEX_SIDE_LENGTH, 1, 150),
        new Harbor(HARBOR_LIST[harborOrder[1]], 1, hexPoints[1][2].x + xPad, hexPoints[1][2].y + yPad - HEX_SIDE_LENGTH, 1, 210),
        new Harbor(HARBOR_LIST[harborOrder[2]], 2, hexPoints[3][4].x + xPad, hexPoints[3][4].y + yPad - HEX_SIDE_LENGTH, 1, 210),
        new Harbor(HARBOR_LIST[harborOrder[3]], 3, hexPoints[5][5].x + HEX_SIDE_LENGTH + xPad, hexPoints[5][5].y + yPad + HEX_SIDE_LENGTH / 2, 1, 270),
        new Harbor(HARBOR_LIST[harborOrder[4]], 4, hexPoints[8][4].x + xPad, hexPoints[8][4].y + HEX_SIDE_LENGTH + yPad, 1, 330),
        new Harbor(HARBOR_LIST[harborOrder[5]], 5, hexPoints[10][2].x + xPad, hexPoints[10][2].y + HEX_SIDE_LENGTH + yPad, 1, 330),
        new Harbor(HARBOR_LIST[harborOrder[6]], 6, hexPoints[10][0].x + xPad, hexPoints[10][0].y + HEX_SIDE_LENGTH + yPad, 1, 30),
        new Harbor(HARBOR_LIST[harborOrder[7]], 7, hexPoints[6][0].x + xPad, hexPoints[6][0].y + HEX_SIDE_LENGTH + yPad, 1, 90),
        new Harbor(HARBOR_LIST[harborOrder[8]], 8, hexPoints[3][0].x + xPad - HEX_SIDE_LENGTH, hexPoints[3][0].y + HEX_SIDE_LENGTH / 2 + yPad, 1, 90),
    ];
    
    return harbors;

}