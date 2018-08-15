// Set up Canvas:
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// Width and height:
var canvasWidth = ctx.canvas.width;
var canvasHeight = ctx.canvas.height;

// declarations:
var interval;
var koalaFig;
var obstaclesArray = [];
var obstaclesArrayNames = ['bob1', 'bob2', 'bob3', 'bob4', 'bob5'];
var frames = 0;

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
    // document.getElementById("start-button").onclick = function() {
    //     startGame();
    //   };
    startGame();
};

function startGame() {
    koalaFig = new Koala(100, 300, 65, 50, ctx);
    interval = setInterval(updateGameArea, 20);
}
function clearGame() {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

// Clear Game Area / move and draw elements
function updateGameArea() {
    frames++;
    clearGame();
    backImgUp.move();
    backImgBot.move();
    koalaFig.newPos();
    backImgUp.draw();
    backImgBot.draw();
    koalaFig.draw();

    if (frames % 100 === 0) {
        randomBobCreator();
    }
    for (var i = 0; i < obstaclesArray.length; i++) {
        obstaclesArray[i].move();
        if (koalaFig.collide(obstaclesArray[i])) {
            gameover();
        }
        obstaclesArray[i].draw();
    }
}

function randomBobCreator() {
    randomNumber = Math.floor(Math.random() * obstaclesArrayNames.length);
    randomBob = obstaclesArrayNames[randomNumber];
    obstaclesArray.push(new Obstacles(randomBob, canvas, ctx));
}

// gameover game function:
function gameover() {
    clearInterval(interval);
    return imgGameOver;
}

// score function?
function score() {
    var frames = 0;
    points = Math.floor(frames / 5);
    context.font = '18px serif';
    context.fillStyle = 'black';
    context.fillText('Score: ' + points, 350, 50);
}
