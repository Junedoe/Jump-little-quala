function backImage(imgSrc, x, speed) {
    this.x = x;
    this.speed = speed;
    this.img = new Image();
    this.img.src = imgSrc;

    this.move = function() {
        this.x += this.speed;
        this.x %= canvas.width;
    };
    this.draw = function() {
        ctx.drawImage(this.img, this.x, 0);
        if (this.speed < 0) {
            ctx.drawImage(this.img, this.x + canvas.width, 0);
        } else {
            ctx.drawImage(this.img, this.x - this.img.width, 0);
        }
    };
}

// Background image upper part:
var backImgUp = new backImage('img/backImgUp.png', 0, -0.5);
// Background image upper part:
var backImgBot = new backImage('img/backImgBott.png', 0, -1);
// game over
var imgGameOver = new backImage('img/gameover.png', 0, 0);