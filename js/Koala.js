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

    // Parameter to adapt
    this.gravity = 0.5; // The bigger, the faster will be the fall
    this.bounce = 0.8; // The bigger, the more it will bounce. 0 => nothing, 1 => bounce for ever
    this.friction = 0.06; // The bigger, the smoother the fall will be
    this.maxJumps = 3;
}

Koala.prototype.draw = function() {
    // console.log(this.img.src);
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
};

Koala.prototype.newPos = function() {
    this.speedY += this.gravity - this.friction * this.speedY;
    this.x += this.speedX;
    this.y += this.speedY;

    // Reach the top
    if (this.y < this.height) {
        this.y = this.height;
        this.speedY = 0;
    }
    // Reach the bottom
    if (this.y > canvasHeight - 50 - this.height) {
        this.numberOfJumps = 0;
        this.y = canvasHeight - 50 - this.height;
        this.speedY *= -this.bounce;
    }
};

Koala.prototype.jump = function(n) {
    if (this.numberOfJumps < this.maxJumps) {
        this.numberOfJumps++;
        this.speedY = -20;
    }
};

Koala.prototype.collide = function(obstacle) {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
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
