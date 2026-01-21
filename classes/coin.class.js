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

    /**
     * Starts the coin animation by periodically updating the coin's image.
     * The animation cycles through the available coin sizes every 250 milliseconds.
     * If the world is paused, the animation does not update.
     *
     * @function
     * @memberof Coin
     */
    animate() {
        setInterval(() => {
            if (!this.world || this.world.isPaused) return;
            let i = this.currentImage % this.coinsSizes.length;
            let path = this.coinsSizes[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 250);
    }
}