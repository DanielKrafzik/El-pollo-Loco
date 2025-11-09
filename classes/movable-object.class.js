/* self created 
class MovableObject {    
    img;
    x = 120;
    y = 250;
    height  = 100;
    width = 150;
    imgCounter = 0;
    otherDirection = false;

    loadImage(src) {
        this.img = new Image();
        this.img.src = src;
    }

    
} */

// video
class MovableObject {
    x = 120;
    y  = 280;
    img;
    height  = 100;
    width = 150;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;


    loadImage(src) {
        this.img = new Image();
        this.img.src = src;
    }

    loadImages(arr) {
        arr.forEach(src => {
            let img = new Image();
            img.src = src;
            this.imageCache[src] = img;
        });
    }

    moveRight() {
    
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}
    