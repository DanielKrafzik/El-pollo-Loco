class BackgroundObject extends MovableObject {
    constructor(imagePath) {
        super();        
        this.width = 720;
        this.height = 300;
        this.y = 180;
        this.x = 0;
        this.loadImage(imagePath);
    }
}