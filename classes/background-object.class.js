class BackgroundObject extends MovableObject {
    constructor(imagePath, height, y) {
        super();        
        this.width = 720;
        this.height = height;
        this.y = y;
        this.x = 0;
        this.loadImage(imagePath);
    }
}