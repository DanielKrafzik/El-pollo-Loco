class Enemies extends MovableObject {
    y = 360;
    height = 60;
    width = 80;
    IMAGES_SWIMMING_PUFFER = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];
    IMAGES_SWIMMING_YELLY = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'
    ];

    constructor(startImage) {
        super().loadImage(startImage);

        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.loadImages(this.IMAGES_SWIMMING_PUFFER);  
        this.loadImages(this.IMAGES_SWIMMING_YELLY);
        if (startImage.includes('Puffer fish')) {
            this.animatePuffer();
        } else {
            this.animateJelly();
        }
    }

    animatePuffer() {
        
        this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_SWIMMING_PUFFER.length;
            let path = this.IMAGES_SWIMMING_PUFFER[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 6);
    }

    animateJelly() {
        this.moveUpDown();
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_SWIMMING_YELLY.length;
            let path = this.IMAGES_SWIMMING_YELLY[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 6);
    }

}