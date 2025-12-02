class Bubble extends MovableObject{
    constructor(x, y, goingLeft, bubbleImg){
        super();
        this.loadImage(bubbleImg);
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.speed = 7;
        this.goingLeft = goingLeft;
        this.poisonous = bubbleImg.includes('for whale');
        this.animate();
        this.bubbleRise();
    }

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