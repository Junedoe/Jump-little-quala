// 1.) CANVAS SETUP
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

/* 
// 2.)  DECLARATIONS
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
var bonusPoints = 0;
var interval = 0;
var isGameStarted = false;
// Images:
var gameOverImg;
var startScreenImg;
// Sounds:
var soundBackground;
var soundCrash;
var soundJump;
var soundEat;
var soundGameOver;
// Background image upper part:
var backImgUp = new backImage('images/backimgup.png', 0, -0.5);
// Background image upper part:
var backImgBot = new backImage('images/backimgbott.png', 0, -1);

/*
// 3.) ONLOAD EVENTS
*/
// Onload start event listener and start game function:
window.onload = function() {
    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 38) {
            koalaFig.img = imgJump;
            koalaFig.jump();
        }
    });
    window.addEventListener('keyup', function(e) {
        if (e.keyCode === 38) {
            koalaFig.img = imgFloor;
        }
    });

    document.getElementById('start-button').onclick = function() {
        if (!isGameStarted) {
            soundBackground = new Sound('Sound/background.mp3');
            soundCrash = new Sound('Sound/collision.mp3');
            soundJump = new Sound('Sound/jump.mp3');
            soundEat = new Sound('Sound/eat.mp3');
            soundGameOver = new Sound('Sound/gameover.mp3');
            isGameStarted = true;
            startGame();
        }
        canvas.addEventListener(
            'touchstart',
            function() {
                koalaFig.img = imgJump;
                koalaFig.jump();
            },
            false
        );
        canvas.addEventListener(
            'touchend',
            function() {
                koalaFig.img = imgFloor;
            },
            false
        );
    };
};

// On startGame create Koala, setInterval and clear game:
function startGame() {
    koalaFig = new Koala(100, 300, 100, 100, imgFloor, ctx);
    if (typeof interval === 'undefined') restart();
    soundBackground.play();
    interval = setInterval(updateGameArea, 1000 / 200);
}
function clearGame() {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

/* 
// 4.) UPDATE GAME AREA
*/
// Create random gap between obstacles:
function updateGameArea() {
    var randomGapObstacles = Math.floor(Math.random() * 300 + 200);
    var randomGapSushi = Math.floor(Math.random() * 400 + 300);
    frames++;
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
    printJumps();
    printScore();
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
    randomHeight = Math.floor(Math.random() * 200 + 100);

    sushiArray.push(new Sushi(randomSushi, canvas, ctx, randomHeight));
}
// get the biggest height of an obstacle:
// function getHeightObstacle() {
//     for (var i = 0; i < obstaclesArray.length; i++) {
//         if (obstaclesArray[i].y > obHeight) obHeight = obstaclesArray[i].height;
//     }
//     return obHeight;
// }

/*
// 5.) GAME OVER / PRINT SCORE / PRINT JUMPS/ RESTART GAME
*/
function gameover() {
    clearInterval(interval);
    soundCrash.play();
    gameOverImg = new Image();
    gameOverImg.src = 'images/gameover.jpg';
    gameOverImg.onload = function() {
        ctx.drawImage(gameOverImg, 0, 0, 1000, 500);
        printScore();
        printJumps();
    };
    setTimeout(function() {
        soundGameOver.play();
    }, 2000);
    isGameStarted = false;
    soundJump.stop();
    soundEat.stop();
    soundBackground.stop();
    interval = undefined;
}

// Score for Bonus:
function printScore() {
    ctx.fillStyle = '#1BA38E';
    ctx.font = '40px Lato';
    ctx.fillText('Points: ' + bonusPoints, 20, 50);
}
// Jumps counter:
function printJumps() {
    ctx.fillStyle = '#1BA38E';
    ctx.font = '40px Lato';
    ctx.fillText('Jumps: ' + koalaFig.numberOfJumps, 800, 50);
}
// Restart game:
function restart() {
    if (clearInterval(interval)) frames = 0;
    bonusPoints = 0;
    obstaclesArray = [];
    sushiArray = [];
}
