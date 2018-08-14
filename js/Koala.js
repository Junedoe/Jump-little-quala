// Koala Constructor
function Koala(x, y, vx, vy, radius, ctx, canvasHeight) {
    this.x = x;
    this.y = canvasHeight;
    this.radius = radius;
    this.color = '#FFF58F';
    this.ctx = ctx;
    this.speedX = 0;
    this.speedY = 0;
    this.numberOfJumps = 0;

    // Parameter to adapt
    this.gravity = 0.9; // The bigger, the faster will be the fall
    this.bounce = 0.6; // The bigger, the more it will bounce. 0 => nothing, 1 => bounce for ever
    this.friction = 0.05; // The bigger, the smoother the fall will be
    this.maxJumps = 2;

    // this.gravitySpeed = 0;
    // this.koalaImg = new Image();
    // this.koalaImg.src = koalaImgSrc;
    // this.drawImage(this.koalaImg, this.x, this.y, this.width, this.height);

    // Former draw method
    // this.draw = function() {
    //     this.ctx.save();
    //     this.ctx.fillStyle = this.color;
    //     this.ctx.beginPath();
    //     this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    //     this.ctx.closePath();
    //     this.ctx.fill();
    //     this.ctx.restore();
    // };
}

Koala.prototype.draw = function() {
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.radius, this.radius);
    this.ctx.restore();
};

Koala.prototype.newPos = function() {
    this.speedY += this.gravity - this.friction * this.speedY;
    this.x += this.speedX;
    this.y += this.speedY;

    // Bottom and top boundary
    // if (this.y + this.radius >= canvasHeight || this.y - this.radius < 0) {
    //     this.vy *= -1;
    // }
    // if (this.x < 0) this.x = 0;
    // if (this.x > canvasWidth - this.radius) this.x = canvasWidth - this.radius;

    // Reach the top
    if (this.y < this.radius) {
        this.y = this.radius;
        this.speedY = 0;
    }
    // Reach the bottom
    if (this.y > canvasHeight - this.radius) {
        this.numberOfJumps = 0;
        this.y = canvasHeight - this.radius;
        this.speedY *= -this.bounce;
    }
};

// Koala.prototype.hitBottom = function() {
//     var rockbottom = this.ctx.canvas.height - this.radius;
//     if (this.y >= rockbottom) {
//         this.gravitySpeed = -(this.gravitySpeed * this.bounce);
//     }
// };

Koala.prototype.jump = function(n) {
    if (this.numberOfJumps < this.maxJumps) {
        this.numberOfJumps++;
        this.speedY = -20;
    }
};
