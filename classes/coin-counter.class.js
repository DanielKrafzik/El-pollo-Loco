class CoinBar extends DrawableObject {
    IMAGES_COINS = [
        'img/4. Marcadores/orange/0_  copia 2.png',
        'img/4. Marcadores/orange/20_ copia 2.png',
        'img/4. Marcadores/orange/40_  copia 2.png',
        'img/4. Marcadores/orange/60_  copia 2.png',
        'img/4. Marcadores/orange/80_  copia 2.png',
        'img/4. Marcadores/orange/100_ copia 2.png'
    ];    

    constructor() {
        super();
        this.loadImage(this.IMAGES_COINS[this.coinCount]);
        this.loadImages(this.IMAGES_COINS);
        this.x = 20;
        this.y = 40;
        this.width = 200;
        this.height = 60;
    }
}