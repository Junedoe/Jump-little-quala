// Set up Canvas:
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// Width and height:
var canvasWidth = ctx.canvas.width;
var canvasHeight = ctx.canvas.height;

// declarations:
var interval;
var koalaFig;
var myObstacles;

// On load start event listener and start game function:
window.onload = function() {
    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 38) {
            console.log(koalaFig.y);
            koalaFig.jump();
        }
    });
    window.addEventListener('keyup', function(e) {
        if (e.keyCode === 38) {
            // koalaFig.accelerate(0.3);
        }
    });
    startGame();
};

function startGame() {
    koalaFig = new Koala(60, 455, 5, 2, 40, ctx, canvasHeight);
    // myObstacles = new Obstacles();
    interval = setInterval(updateGameArea, 20);
    console.log(backImgUp, backImgBot);
}
function clearGame() {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

// Clear Game Area / move and draw elements
function updateGameArea() {
    clearGame();
    backImgUp.move();
    backImgBot.move();
    koalaFig.newPos();
    backImgUp.draw();
    backImgBot.draw();
    koalaFig.draw();
}
