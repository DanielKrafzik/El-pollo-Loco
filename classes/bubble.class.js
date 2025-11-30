class Bubble extends MovableObject{
    constructor(x, y, goingLeft, isPoisonous){
        super();
        this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.speed = 7;
        this.goingLeft = goingLeft;
        this.isPoisonous = isPoisonous; 
        this.animate();
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