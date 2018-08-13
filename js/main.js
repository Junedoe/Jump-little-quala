// Set up Canvas:
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// Width and height:
var canvasWidth = ctx.canvas.width;
var canvasHeight = ctx.canvas.height;

// declarations:
var koalaFig;
var interval;
var myObstacles;

// On load start event listener and start game function:
window.onload = function() {
    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 38) {
            console.log(koalaFig.y);
            koalaFig.accelerate(-0.5);
        }
    });
    window.addEventListener('keyup', function(e) {
        koalaFig.accelerate(0.3);
    });
    startGame();
};

function startGame() {
    koalaFig = new Koala(45, 455, 5, 2, 40, ctx, canvasHeight);
    // myObstacles = new Obstacles();
    interval = setInterval(updateGameArea, 20);
}
function clearGame() {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

// Make Move
function updateGameArea() {
    clearGame();
    // myObstacles.update()??
    koalaFig.newPos();
    koalaFig.draw();
}
