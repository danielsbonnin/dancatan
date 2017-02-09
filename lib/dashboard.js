function Dial(x, y, size, position="roll", group=null) {
    const positions = ["roll", "trade", "build", "wait"];
    theSprite = game.add.sprite(x, y, 'dial_sheet');
    theSprite.frame = positions.indexOf(position);
    theSprite.inputEnabled = true;
    theSprite.scale.setTo(size / 60);
    
    this.sprite = theSprite;
    this.sprite.events.onInputUp.add(turnDial);
    
}
function turnDial(theDial) {
    theDial.frame = theDial.frame > 2 ? 0 : theDial.frame + 1;
}
/**
 * Display game pieces in inventory
 * @param {number} x horizontal coordinate relative to dashboard
 * @param {number} y vertical coordinate relative to dashboard
 * @param {number} width horizontal dimension of rectangle allocated to pieces
 * @param {number} height vertical dimension of rectangle allocated to pieces
 * @param {number} owner id 
 * @param {number} roadCount current player number of roads remaining
 * @param {number} settlementCount current player number of settlements remaining
 * @param {number} cityCount current player number of cities remaining
 */
function PieceBag(x, y, width, height, owner=0, roadCount=15, settlementCount=5, cityCount=4) {
    const style = {font: "bold 15px Arial", fill: "#000000", boundsAlignH: "center", boundsAlignV: "middle"};
    const textOffsetY = height / 3;
    const textOffsetX = width / 6;
    const originalRoadWidth = 60;
    const originalRoadHeight = 10;
    const originalCityWidth = 20;
    const originalCityHeight = 10;
    this.group = game.add.group();
    
    // Setup road inventory
    this.road = this.group.create(x , y, 'road_sheet');
    this.road.frame = owner;
    var roadCountText = game.add.text(x + textOffsetX, y - textOffsetY, roadCount, style);
    this.road.alpha = roadCount < 1 ? 0.2 : 1;
    this.road.scale.setTo(width / (originalRoadWidth * 4));
    this.group.addChild(roadCountText);
    
    // Setup Settlement inventory
    this.settlement = this.group.create(x + width / 3, y, 'cities_sheet');
    this.settlement.frame = owner;
    var settlementCountText = game.add.text(x + textOffsetX * 3, y - textOffsetY, settlementCount, style);
    this.settlement.alpha = settlementCount < 1 ? 0.2 : 1;
    this.settlement.scale.setTo(width / (originalCityWidth * 4));
    this.group.addChild(settlementCountText);

    this.city = this.group.create(x + 2 / 3 * width, y, 'cities_sheet');
    this.city.scale.setTo(width / 80);
    var cityCountText = game.add.text(x + textOffsetX * 5, y - textOffsetY, cityCount, style);
    this.city.frame = 5 + owner;
    this.group.addChild(cityCountText);
    
    this.group.add(this.city);
}

/**
 * Display dashboard containing game data and controls
 */
function Dashboard() {
    const width = BOARD_WIDTH / 2;
    const height = BOARD_HEIGHT / 2;
    const padding = BOARD_WIDTH / 80;
    const xLoc = BOARD_WIDTH / 2;
    const yLoc = BOARD_HEIGHT / 8;
    
    // Define cards section
    const cardsX = width / 10;
    const cardsY = 3 / 4 * height;
    const cardsWidth = 4 / 5 * width;
    const cardsHeight = height / 4;
    
    // Define pieces section
    const piecesX = width / 10;
    const piecesY = height * (3/5);
    const piecesWidth = 2/5* width;
    const piecesHeight = height / 8;
    
    // Define dial location
    const dialX = width / 10;
    const dialY = height * (1/5);
    const dialSize = height / 5;
    
    // Create a bitmapData object
    var bmd = game.add.bitmapData(width, height);
    
    // Draw a border
    bmd.ctx.beginPath();
    bmd.ctx.rect(padding, padding, width - 2 * padding, height - 2 * padding);
    bmd.ctx.strokeStyle = 0x000000;
    bmd.ctx.lineWidth = padding; 
    bmd.ctx.stroke();
    
    // Color in background
    bmd.ctx.fillStyle = '#ffffff';
    bmd.ctx.fill();
    
    // Create sprite to display bitmapData object
    this.bg = game.add.sprite(xLoc, yLoc, bmd);
    
    this.cards = new CardHand(cardsX, cardsY, cardsWidth, cardsHeight);
    this.pieces = new PieceBag(piecesX, piecesY, piecesWidth, piecesHeight);
    this.dial = new Dial(dialX, dialY, dialSize);
    this.bg.addChild(this.cards.group);
    this.bg.addChild(this.pieces.group);
    this.bg.addChild(this.dial.sprite);
    
}