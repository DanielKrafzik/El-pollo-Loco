import { DrawableObject } from "./drawable-object.class.js";

export class Statusbar extends DrawableObject {
    IMAGES = [
        'img/4. Marcadores/orange/0_  copia.png',
        'img/4. Marcadores/orange/20_ copia 2.png',
        'img/4. Marcadores/orange/40_  copia.png',
        'img/4. Marcadores/orange/60_  copia.png',
        'img/4. Marcadores/orange/80_  copia.png',
        'img/4. Marcadores/orange/100_  copia.png'
    ];

    

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the current percentage value and updates the status bar image accordingly.
     *
     * @param {number} percentage - The new percentage value to set (typically between 0 and 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath= this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }


    /**
     * Determines the image index based on the current percentage value.
     * 
     * @returns {number} The image index corresponding to the percentage:
     *   - 5 for 100%
     *   - 4 for 80-99%
     *   - 3 for 60-79%
     *   - 2 for 40-59%
     *   - 1 for 20-39%
     *   - 0 for 0-19%
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

}