/** 
 The GameBoard consists of 19 hexes, 72 roads, 19 hex images, 54 buildings,
 and 19 dice value icons.
 Each Hex is assigned to a "resource": 
    Type:       Count:
    "lumber"    4
    "wool"      4
    "wheat"     4
    "bricks"    3
    "ore"       3
    "desert"    1
    
    In the "beginner" setupType, the resources are assigned according to the
    pattern in the Settlers of Catan manual. In the "variable" setupType, they
    are randomly assigned.
    
    Each Hex is assigned a "dice value". 
        Dice values are assigned in a "spiral" pattern, starting at the top-left
        hex, and proceeding counter-clockwise toward the center. The dice values
        are fixed, except that the "desert" hex is always assigned the dice
        value of 7. Therefore, the index of whichever hex is assigned 
        the resource of "desert" is stored, and the dice value 7 is inserted
        at the index of the dice values array which corresponds to that same hex.
 
    Setup Process:
        hexPoints
        generatePoints() assigns the coordinates of each hex vertex to a 2d Array
        of Phaser.Point objects, according to the dimensions of the canvas and 
        offset constants for the game board.
        
        hexes
        generateHexes() uses hexPoints to define the 19 hexagon tiles of the 
        game board.
        
        roads
        generateRoads() uses hexPoints to place 72 Phaser.Sprite roads.
        
        roadGraph
        This object enumerates each road's adjacent roads
        
        Assign resources
        If setupType is "variable", then the resource order is shuffled.
        
        diceValCircles
        generateDiceVals() creates the diceValCircles according to the location
        of the "desert" hex.
        
    */
var GameBoard = {
    hexPoints: [],
    hexPolys: [],
    hexes: [],
    roads: [],
    cities: [],
    diceValCircles: [],
    diceVals: [],
    setupType: "beginner",
    desertIdx: 9,
    dashboard: null,
    resourceOrder: [0, 2, 4, 3, 1, 3, 4, 4, 1, 5, 2, 1, 3, 0, 2, 0, 2, 0, 1],

    setup: function() {
        this.hexPoints = generateHexPoints();
        
        this.roads = generateRoads(this.hexPoints);
        
        // "variable" setup requires random resource placement
        if (this.setupType == "variable") {
            shuffle(this.resourceOrder);
        }
        
        // Store the index of the hex assigned to the "desert" resource
        this.desertIdx = this.resourceOrder.indexOf(5);
        
        // Assign the dice value ordering
        this.diceVals = generateDiceVals(this.desertIdx);
        
        // Generate Hexagons to define each hex tile's coordinates on the board
        this.hexPolys = generateHexPolys(this.hexPoints);

        // Set up and display the game hex tiles
        this.hexes = generateHexes(this.hexPolys, this.resourceOrder, this.diceVals);
        
        // Display dice value circles on each hex tile
        this.diceValCircles = generateDiceValCircles(this.hexPolys, this.diceVals);
        
        // Generate cities
        this.cities = generateCities(this.hexPoints);
        
        // Generate harbors
        this.harbors = generateHarbors(this.hexPoints);
        this.dashboard = new Dashboard();
    }
}