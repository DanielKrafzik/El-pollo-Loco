class Endbosshealthbar extends DrawableObject {
    IMAGES = [
        'img/4. Marcadores/Purple/0_ .png',
        'img/4. Marcadores/Purple/20__1.png',
        'img/4. Marcadores/Purple/60_ .png',
        'img/4. Marcadores/Purple/100_ .png'
    ];

    health = 60;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 720;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setHealth(60);
    }

    /**
     * Sets the health value and updates the displayed health bar image accordingly.
     * @param {number} health - The new health value to set
     */
    setHealth(health) {
        this.health = health;
        let imagePath= this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }


    /**
     * Resolves the appropriate health bar image index based on the current health value.
     * @returns {number} The image index (0-3) corresponding to the health level.
     *                   - 3: health == 60 (full health)
     *                   - 2: health >= 40 (medium-high health)
     *                   - 1: health >= 20 (low health)
     *                   - 0: health < 20 (critical health)
     */
    resolveImageIndex() {
        if (this.health == 60) {
            return 3;
        } else if (this.health >= 40) {
            return 2;
        } else if (this.health >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

}