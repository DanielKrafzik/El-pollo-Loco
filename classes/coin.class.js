class Coin extends DrawableObject {
    constructor(x, y) {
        super();
        this.loadImage('img/4. Marcadores/1. Coins/1.png');
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }
}