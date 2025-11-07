/* self created
class BackgroundObject extends MovableObject {
    constructor(imagePath, height, y, x) {
        super();        
        this.width = 720;
        this.height = height;
        this.y = y;
        this.x = x;
        this.loadImage(imagePath);
    }
} */


// video
class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
    