// Adjacent roads to each hexPoint (City) 
const CitiesAdj = [
[1, 2], [3, 4], [5, 6], 
[49, 1], [50, 2, 3], [51, 4, 5], [52, 6], 
[7, 49, 8], [9, 50, 10], [11, 51, 12], [13, 52, 14], 
[53, 7], [54, 8, 9], [55, 10, 11], [56, 12, 13], [57, 14],
[15, 53, 16], [17, 54, 18], [19, 55, 20], [21, 56, 22], [23, 57, 24],
[58, 15], [59, 16, 17], [60, 18, 19], [61, 20, 21], [62, 22, 23], [63, 24],
[25, 58], [26, 59, 27], [28, 60, 29], [30, 61, 31], [32, 62, 33], [34, 63],
[64, 25, 26], [65, 27, 28], [66, 29, 30], [67, 31, 32], [68, 33, 34],
[35, 64], [36, 65, 37], [38, 66, 39], [40, 67, 41], [42, 68],
[69, 35, 36], [70, 37, 38], [71, 39, 40], [0, 41, 42],
[43, 69], [44, 70, 45], [46, 71, 47], [48, 0],
[43, 44], [45, 46], [47, 48]
];

function City(position=-1, owner=4, isCity=false, x=0, y=0, scale=1, harborType="none") {
    this.position = position;
    this.owner = owner;
    this.isCity = isCity; // false = settlement, true = city
    this.sprite = generateCity(x, y, this.owner, this.isCity, scale);
    this.adjRoads = CitiesAdj[this.position];
    this.harborType = harborType;
    this.setPosition = function (newPos) {
        this.position = newPos;
        this.adjRoads = CitiesAdj[newPos];
        this.sprite.events.onInputOver.add(cityShowAdj, {adj: this.adjRoads});
        
    };
    this.sprite.events.onInputOver.add(cityShowAdj, {adj: this.adjRoads});
    this.sprite.events.onInputOut.add(cityHideAdj, {adj: this.adjRoads});
}

function cityShowAdj(city) {
    this.adj.forEach(function(roadIdx) {
        gb.roads[roadIdx].sprite.frame = 1;
    });
}

function cityHideAdj(city) {
    this.adj.forEach(function(roadIdx) {
        gb.roads[roadIdx].sprite.frame = 4;
    });
}
function generateCity(x, y, owner, isCity, scale) {
    var citySprite = game.add.sprite(x, y, 'cities_sheet');
    citySprite.inputEnabled = true;
    citySprite.anchor.setTo(0.5, 0.5);
    citySprite.scale.x = citySprite.scale.y = scale;
    citySprite.frame = (isCity ? 5 : 0) + owner;
    
    return citySprite;
}
function generateCities(hexPoints) {
    var cities = []; 
    // City sprite image is scaled for a board width of 1000px.
    const cityScale = BOARD_HEIGHT / 1000;
    var xPad = HEX_ORIGIN_X;
    var yPad = HEX_ORIGIN_Y;
    var idx = 0;
    hexPoints.forEach(function(pointArr) {
        pointArr.forEach(function(point){
            cities.push(new City(idx, 3, false, point.x + xPad, point.y + yPad, cityScale));
            idx++;
        });
    });
    
    return cities;
}

