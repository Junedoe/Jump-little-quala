var koalaImgSrc = 'img/koala_icon.png';

// Koala Constructor
function Koala(x, y, width, height, ctx) {
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = koalaImgSrc;
    this.ctx = ctx;
    this.speedX = 0;
    this.speedY = 0;
    this.numberOfJumps = 0;
    this.width = width;
    this.height = height;

    // Parameter to adapt:
    this.gravity = 0.1; // The bigger, the faster the fall will be
    this.bounce = 0.6; // The bigger, the more it will bounce. 0 => nothing, 1 => bounce for ever
    this.friction = 0.07; // The bigger, the smoother the fall will be
    this.maxJumps = 6;
}
// Draw Koala figure:
Koala.prototype.draw = function() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
};
// Move Koala figure:
Koala.prototype.newPos = function() {
    this.speedY += this.gravity - this.friction * this.speedY;
    this.x += this.speedX;
    this.y += this.speedY;

    // Reach the top / set limit:
    if (this.y < this.height) {
        this.y = this.height;
        this.speedY = 0;
    }
    // Reach the bottom / set bounce:
    if (this.y > canvasHeight - 50 - this.height) {
        this.numberOfJumps = 0;
        this.y = canvasHeight - 50 - this.height;
        this.speedY *= -this.bounce;
    }
};

// Set Koala jumps:
Koala.prototype.jump = function(n) {
    if (this.numberOfJumps < this.maxJumps) {
        this.numberOfJumps++;
        this.speedY = -20;
    }
    soundJump.play();
};

// On collision with obstacles:
Koala.prototype.collide = function(obstacle) {
    var myleft = this.x;
    var myright = this.x + this.width - 30;
    var mytop = this.y;
    var mybottom = this.y + this.height - 25;
    var otherleft = obstacle.x;
    var otherright = obstacle.x + obstacle.width;
    var othertop = obstacle.y;
    var otherbottom = obstacle.y + obstacle.height;
    var crash = true;
    if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright) {
        crash = false;
    }
    return crash;
};
// On collecting bonus:
Koala.prototype.collectBonus = function(bonus) {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = bonus.x;
    var otherright = bonus.x + bonus.width;
    var othertop = bonus.y;
    var otherbottom = bonus.y + bonus.height;
    var bonus = true;
    if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright) {
        bonus = false;
    }
    return bonus;
};
