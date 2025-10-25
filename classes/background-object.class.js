class BackgroundObject extends MovableObject {
    constructor(imagePath, height, y, x) {
        super();        
        this.width = 720;
        this.height = height;
        this.y = y;
        this.x = x;
        this.loadImage(imagePath);
    }
}