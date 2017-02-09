function generateCardSprite(type, x, y, scale, group=null) {
    const cardTypes = ["lumber", "wool", "wheat", "bricks", "ore", "knight", "yop", "monopoly", "roadBuilder", "victory"];
    if (cardTypes.indexOf(type) === -1) {
        return null;
    }
    var theCard = group.create(x, y, 'card_sheet');
    theCard.anchor.setTo(0, 0);
    theCard.scale.x = theCard.scale.y = scale;
    theCard.frame = cardTypes.indexOf(type);
    return theCard;
}

function Card(type="hidden", x=0, y=0, scale=.4) {
    this.type = type;
    this.cardSprite = generateCardSprite(this.type, x, y, scale);
}

function displayCardHand(resourceCounts=[], devCounts=[], x, y, width, height, group=null) {
    const originalCardWidth = 200;
    const spacing = width / 10;
    const cardWidth = width / 12;

    const style = {font: "bold 32px Arial", fill: "#000000", boundsAlignH: "center", boundsAlignV: "middle"};
    //const title = game.add.text(165, 25, "Inventory", style, group);
    var handCards = [];
    const cardTypes = ["lumber", "wool", "wheat", "bricks", "ore", "knight", "yop", "monopoly", "roadBuilder", "victory"];
    for (var i = 0; i < 10; i++) {
        var theX = x + i * spacing;
        handCards.push(generateCardSprite(cardTypes[i], theX, y, cardWidth / 200, group));
        
        // Check if none of this resource
        var isEmpty = (typeof resourceCounts[i] === 'undefined' || resourceCounts[i] < 1) ? true : false;
        var resourceCount = isEmpty ? "0" : resourceCounts[i];
        
        // If none of this resource, fade card
        var alphaVal = isEmpty ? 0.2 : 1;
        var countText = game.add.text(originalCardWidth / 2, - originalCardWidth / 3, resourceCount, style);
        handCards[i].alpha = alphaVal;
        handCards[i].addChild(countText);
    }
}

function CardHand(x, y, width, height) {
    this.group = game.add.group();
    displayCardHand([0, 1, 0, 0, 0], [], x, y, width, height, this.group);
    this.group.scale.set(1);
}

