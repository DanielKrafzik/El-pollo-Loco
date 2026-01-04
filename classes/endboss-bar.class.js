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

    setHealth(health) {
        this.health = health;
        let imagePath= this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }


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