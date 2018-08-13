// Koala Constructor
function Koala(x, y, vx, vy, radius, ctx, canvasHeight) {
    this.x = x;
    this.y = canvasHeight;
    this.vy = -30;
    this.radius = radius;
    this.color = '#FFF58F';
    this.ctx = ctx;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.bounce = 0.6;
    this.draw = function() {
        this.ctx.save();
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    };
}
Koala.prototype.newPos = function() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    this.hitBottom();
    // Bottom and top boundary
    if (this.y + this.radius >= canvasHeight || this.y - this.radius < 0) {
        this.vy *= -1;
    }
    if (this.x < this.radius) this.x = this.radius;
    if (this.x > canvasWidth - this.radius) this.x = canvasWidth - this.radius;
    if (this.y < this.radius) this.y = this.radius;
    if (this.y > canvasHeight - this.radius) this.y = canvasHeight - this.radius;
};

Koala.prototype.hitBottom = function() {
    var rockbottom = this.ctx.canvas.height - this.radius;
    if (this.y >= rockbottom) {
        this.gravitySpeed = -(this.gravitySpeed * this.bounce);
    }
};

Koala.prototype.accelerate = function(n) {
    this.gravity = n;
};
