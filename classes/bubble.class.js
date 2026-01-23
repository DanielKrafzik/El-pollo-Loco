import { MovableObject } from "./movable-object.class.js";

export class Bubble extends MovableObject{
    constructor(x, y, goingLeft, bubbleImg){
        super();
        this.loadImage(bubbleImg);
        this.x = x + 20;
        this.y = y + 20;
        this.width = 50;
        this.height = 50;
        this.speed = 7;
        this.goingLeft = goingLeft;
        this.poisonous = bubbleImg.includes('for whale');
        this.animate();
        this.bubbleRise();
    }

    /**
     * Animates the bubble movement by continuously updating its horizontal position.
     * The bubble moves left or right based on the {@link goingLeft} property at a rate
     * determined by the {@link speed} property. The animation runs at approximately 60 FPS.
     */
    animate(){
        setInterval(() => {
            if (this.goingLeft){
                this.x -= this.speed;
            } else {
                this.x += this.speed;
            }
        }, 1000 / 60);
    }


}