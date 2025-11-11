class Shark extends MovableObject {

    height = 100;
    y = 155;
    speed = 5;
    IMAGES_SWIMMING = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];
    world;


    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIMMING);        

        this.animate();
    }

    animate() {
        setInterval(() => {
            if(this.world.keyboard.RIGHT && this.x < 2700){
                this.x += this.speed;
                this.otherDirection = false;
            }
            if(this.world.keyboard.LEFT && this.x > 0){
                this.x -= this.speed;
                this.otherDirection = true;
            }
            if(this.world.keyboard.UP && this.y > 0){
                this.y -= this.speed;
            }
            if(this.world.keyboard.DOWN && this.y < this.world.canvas.height - this.height){
                this.y += this.speed;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN){    
                this.playAnimation(this.IMAGES_SWIMMING);   
            }
        }, 100);    
    }
        
    jump() {
    
    }
}
    