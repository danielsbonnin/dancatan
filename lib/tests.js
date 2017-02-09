

/*

function updateRoad() {
    for (var j = 0; j < 4; j++) {
        if (roadGraph[(roadCounter - 1) % 72].adj[j] != null) {
            roads[roadGraph[(roadCounter - 1) % 72].adj[j]].frame = 0;
        }
    }
    for (var j = 0; j < 4; j++) {
        if (roadGraph[roadCounter % 72].adj[j] != null) {
            roads[roadGraph[roadCounter % 72].adj[j]].frame = 1;
            game.debug.text("Road: " + (roadCounter % 72).toString(), 32, 32);
            game.debug.text("adj: [" + roadGraph[roadCounter % 72].adj[0] + " " + roadGraph[roadCounter % 72].adj[1] + " " + roadGraph[roadCounter % 72].adj[2] +
                " " + roadGraph[roadCounter % 72].adj[3], 32, 80);
        }
    }

    roadCounter++;
}
var pressed = false;
function update() {
    for (var i = 0; i < 72; i++) {
        if (roads[i].input.pointerOver()) {
            for (var j = 0; j < 4; j++) {
                if (roadGraph[i].adj[j] != null) {
                    roads[roadGraph[i].adj[j]].frame = 1;
                }
            }
        }
        if (roads[i].input.pointerOut()) {
            for (var j = 0; j < 4; j++) {
                if (roadGraph[i].adj[j] != null) {
                    roads[roadGraph[i].adj[j]].frame = 0;
                }
            }
        }
    }
    if (this.spaceKey.isDown) {
        pressed = true;
    }
    if (this.spaceKey.isUp) {
        if (pressed == true) {
            updateRoad();
        }
        pressed = false;
    }
}





*/