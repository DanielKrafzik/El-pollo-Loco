class PoisonBar extends DrawableObject {
    IMAGES_POISON = [
        'img/4. Marcadores/orange/0_ copia.png',
        'img/4. Marcadores/orange/20_ copia.png',
        'img/4. Marcadores/orange/40_ copia.png',
        'img/4. Marcadores/orange/60_ copia.png',
        'img/4. Marcadores/orange/80_ copia.png',
        'img/4. Marcadores/orange/100_ copia.png'
    ];
    
    constructor() {
        super();
        this.loadImage(this.IMAGES_POISON[this.poisonCount]);
        this.loadImages(this.IMAGES_POISON);
        this.x = 20;
        this.y = 80;
        this.width = 200;
        this.height = 60;
    }

    /**
     * Sets the poison counter bar progress by updating the displayed image.
     * @param {number} counter - The poison counter value used as an index to retrieve the corresponding image from the IMAGES_POISON array.
     * @returns {void}
     */
    setBarProgress(counter) {
        this.img = this.imageCache[this.IMAGES_POISON[counter]];
    }
}