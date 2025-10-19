class MovableObject {    
    img;
    x = 120;
    y = 250;
    height  = 100;
    width = 150;
    loadImage(src) {
        this.img = new Image();
        this.img.src = src;
    }
}