/*
// SUSHI CONSTRUCTOR
*/
function Sushi(randomSushi, canvas, ctx, y) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.img = new Image();
    switch (randomSushi) {
        case 'sushi1':
            this.height = 64;
            this.width = 70;
            this.img.src = 'sushi_01.png';
            break;
        case 'sushi2':
            this.height = 41;
            this.width = 70;
            this.img.src = 'sushi_02.png';
            break;
        case 'sushi3':
            this.height = 43;
            this.width = 70;
            this.img.src = 'sushi_03.png';
            break;
        case 'sushi4':
            this.height = 52;
            this.width = 70;
            this.img.src = 'sushi_04.png';
            break;
        case 'sushi5':
            this.height = 38;
            this.width = 70;
            this.img.src = 'sushi_05.png';
            break;
    }
    this.x = this.canvas.width;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
}
// Draw Sushi
Sushi.prototype.draw = function() {
    this.ctx.drawImage(this.img, this.x, this.y);
};
// Appear from right <-- left:
Sushi.prototype.move = function() {
    this.x--;
};
