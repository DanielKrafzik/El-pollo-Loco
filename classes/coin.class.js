class Coin extends DrawableObject {
    coinsSizes= [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png'
    ]

    constructor(x, y) {
        super();
        this.loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.coinsSizes);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.isPaused) return;
            let i = this.currentImage % this.coinsSizes.length;
            let path = this.coinsSizes[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 250);
    }
}