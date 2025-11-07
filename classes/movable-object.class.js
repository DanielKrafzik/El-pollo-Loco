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

    
}

/* video
class MovableObject {
    x = 120;
    y  = 400;
    img;
    height  = 100;
    width = 150;


    loadImage(src) {
        this.img = new Image();
        this.img.src = src;
    }

    moveRight() {
    
    }

    moveLeft() {
    
    }
}
    */