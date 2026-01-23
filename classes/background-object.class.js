import { MovableObject } from "./movable-object.class.js";

export class BackgroundObject extends MovableObject {

    width = 940;
    height = 540;
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 540 - this.height;
    }
}
    