class Bubble extends MovableObject{
    constructor(x, y, goingLeft, isPoisonous){
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.speed = 7;
        this.goingLeft = goingLeft;
        this.isPoisonous = isPoisonous; 
        this.x -= 20;
    }
}