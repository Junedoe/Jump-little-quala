// Shushi bonus constructor
function Sushi(randomSushi, canvas, ctx, y) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.img = new Image();
    switch (randomSushi) {
        case 'sushi1':
            this.height = 91;
            this.width = 100;
            this.img.src = 'img/sushi_01.png';
            break;
        case 'sushi2':
            this.height = 59;
            this.width = 100;
            this.img.src = 'img/sushi_02.png';
            break;
        case 'sushi3':
            this.height = 61;
            this.width = 100;
            this.img.src = 'img/sushi_03.png';
            break;
        case 'sushi4':
            this.height = 74;
            this.width = 100;
            this.img.src = 'img/sushi_04.png';
            break;
        case 'sushi5':
            this.height = 54;
            this.width = 100;
            this.img.src = 'img/sushi_05.png';
            break;
    }
    this.x = this.canvas.width;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
}
// draw Sushi
Sushi.prototype.draw = function() {
    this.ctx.drawImage(this.img, this.x, this.y);
};
// appear from right to left: (x--)
Sushi.prototype.move = function() {
    this.x--;
};
