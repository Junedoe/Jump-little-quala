// Set up Canvas:
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

/* 
// DECLARATIONS:
*/
// Canvas width and height:
var canvasWidth = ctx.canvas.width;
var canvasHeight = ctx.canvas.height;
var interval;
var koalaFig;
// empty Array to push random obstacle/sushi in
var obstaclesArrayNames = ['bob1', 'bob2', 'bob3', 'bob4', 'bob5'];
var sushiArrayNames = ['sushi1', 'sushi2', 'sushi3', 'sushi4', 'sushi5'];
var obstaclesArray = [];
var sushiArray = [];
// All counters at zero state:
var frames = 0;
var score = 0;
var bonusPoints = 0;
var interval = 0;
// Images:
var gameOverImg;
var startScreenImg;
// Sounds:
var soundBackground;
var soundCrash;
var soundJump;
var soundEat;

// Onload start event listener and start game function:
window.onload = function() {
    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 38) {
            koalaFig.jump();
        }
    });
    window.addEventListener('keyup', function(e) {
        if (e.keyCode === 38) {
        }
    });

    document.getElementById('start-button').onclick = function() {
        soundBackground = new Sound('sound/background.mp3');
        soundCrash = new Sound('sound/crash.mp3');
        soundJump = new Sound('sound/jump.mp3');
        soundEat = new Sound('sound/eat.mp3');
        soundBackground.play();
        startGame();
    };
};

// On startGame create Koala, setInterval and clear game:
function startGame() {
    koalaFig = new Koala(100, 300, 80, 80, ctx);
    if (typeof interval === 'undefined') restart();
    interval = setInterval(updateGameArea, 1000 / 200);
}
function clearGame() {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

/* 
// UPDATE GAME AREA:
*/

// Create random gap between obstacles:
function updateGameArea() {
    var randomGapObstacles = Math.floor(Math.random() * 300 + 200);
    var randomGapSushi = Math.floor(Math.random() * 400 + 300);
    frames++;
    if (frames % 100 === 0) {
        score++;
    }
    //every random ms between 300 and 250 create an obstacle:
    if (frames % randomGapObstacles === 0) {
        console.log('=');
        randomBobCreator();
    }
    // every 250 ms create a bonus:
    if (frames % randomGapSushi === 0) {
        randomSushiCreator();
    }
    clearGame();
    // MOVE
    backImgUp.move();
    backImgBot.move();
    // iterate over the random sushi of sushiArray and move/draw it:
    for (var i = 0; i < sushiArray.length; i++) {
        sushiArray[i].move();
    }
    for (var i = 0; i < obstaclesArray.length; i++) {
        obstaclesArray[i].move();
    }
    koalaFig.newPos();
    // on collision:
    for (var i = 0; i < obstaclesArray.length; i++) {
        if (koalaFig.collide(obstaclesArray[i])) {
            soundCrash.play();
            gameover();
        }
    }
    // on collecting/ eating sushi:
    for (var i = 0; i < sushiArray.length; i++) {
        if (koalaFig.collectBonus(sushiArray[i])) {
            sushiArray.splice(i, 1);
            soundEat.play();
            bonusPoints++;
        }
    }
    //DRAW
    backImgUp.draw();
    backImgBot.draw();
    // iterate over the random obstacle of obstacleArray and move/draw it:
    for (var i = 0; i < obstaclesArray.length; i++) {
        obstaclesArray[i].draw();
    }
    for (var i = 0; i < sushiArray.length; i++) {
        sushiArray[i].draw();
    }
    koalaFig.draw();
    printScore();
    printBonusScore();
}
// Choose random obstacles from obstaclesArrayNames and push it to obstaclesArray:
function randomBobCreator() {
    randomNumber = Math.floor(Math.random() * obstaclesArrayNames.length);
    randomBob = obstaclesArrayNames[randomNumber];

    obstaclesArray.push(new Obstacles(randomBob, canvas, ctx));
}

// Choose random bonus sushi from sushiArrayNames and push it to sushiArray:
function randomSushiCreator() {
    randomNumber = Math.floor(Math.random() * sushiArrayNames.length);
    randomSushi = sushiArrayNames[randomNumber];
    randomHeight = Math.floor(Math.random() * 400 + 1);
    y = randomHeight;
    sushiArray.push(new Sushi(randomSushi, canvas, ctx, y));
}

function gameover() {
    clearInterval(interval);
    gameOverImg = new Image();
    gameOverImg.src = 'img/gameover.jpg';
    gameOverImg.onload = function() {
        ctx.drawImage(gameOverImg, 0, 0, 1000, 500);
    };
    interval = undefined;
}
// score function:
function printScore() {
    ctx.fillStyle = 'white';
    ctx.font = '40px Lato';
    ctx.fillText('Score: ' + score, 20, 50);
}
// score for Bonus:
function printBonusScore() {
    ctx.fillStyle = 'white';
    ctx.font = '40px Lato';
    ctx.fillText('Points: ' + bonusPoints, 820, 50);
}

// restart game:
// function restart() {
//     if (clearInterval(interval)) frames = 0;
//     score = 0;
//     start();
// }

function restart() {
    if (clearInterval(interval)) frames = 0;
    score = 0;
    obstaclesArray = [];
}
