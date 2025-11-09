/* self created 
class Shark extends MovableObject {

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
        super();
        this.x = 0;
        this.loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if(keyboard.RIGHT && this.x < 2700) {
                this.x += 15;
            }
            if(keyboard.LEFT && this.x > 0) {
                this.x -= 15;
            }
            if(keyboard.UP && this.y > 0) {
                this.y -= 15;
            }
            if(keyboard.DOWN && this.y < canvas.height - this.height) {
                this.y += 15;
            }
            this.world.camera_x = -this.x;
        }, 100);
    }

    loadImages(arr) {
        setInterval(() => {
            if(keyboard.LEFT || keyboard.RIGHT) {
                this.img = new Image();
                this.img.src = arr[this.imgCounter];
                this.imgCounter++;
                if (this.imgCounter >= arr.length) {
                    this.imgCounter = 0;
                }
            }
        }, 100);
    }
} */

// video

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
            if(this.world.keyboard.RIGHT){
                this.x += this.speed;
                this.otherDirection = false;
            }
            if(this.world.keyboard.LEFT){
                this.x -= this.speed;
                this.otherDirection = true;
            }
            if(this.world.keyboard.UP){
                this.y -= this.speed;
            }
            if(this.world.keyboard.DOWN){
                this.y += this.speed;
            }
        }, 1000 / 60);

        setInterval(() => {
            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN){
                let i = this.currentImage % this.IMAGES_SWIMMING.length;
                let path = this.IMAGES_SWIMMING[i];
                this.img = this.imageCache[path];
                this.currentImage++;            
            }
        }, 100);    
    }
        
    jump() {
    
    }
}
    