class Shark extends MovableObject {

    height = 200;
    width = 200;
    y = 155;
    x = 200;
    speed = 5;
    rotation = 0;
    restCounter = 0;
    isBubbleAnimating = false;
    isPoisonBubbleAnimating = false;
    offset = {
        top: 100, 
        right: 40, 
        bottom: 50, 
        left: 40
    };
    IMAGES_WAITING = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ];
    IMAGES_RESTING = [
        'img/1.Sharkie/2.Long_IDLE/i1.png',
        'img/1.Sharkie/2.Long_IDLE/i2.png',    
        'img/1.Sharkie/2.Long_IDLE/i3.png',
        'img/1.Sharkie/2.Long_IDLE/i4.png', 
        'img/1.Sharkie/2.Long_IDLE/i5.png',
        'img/1.Sharkie/2.Long_IDLE/i6.png', 
        'img/1.Sharkie/2.Long_IDLE/i7.png',
        'img/1.Sharkie/2.Long_IDLE/i8.png', 
        'img/1.Sharkie/2.Long_IDLE/i9.png',
        'img/1.Sharkie/2.Long_IDLE/i10.png', 
        'img/1.Sharkie/2.Long_IDLE/i11.png',
        'img/1.Sharkie/2.Long_IDLE/i12.png', 
        'img/1.Sharkie/2.Long_IDLE/i13.png',
        'img/1.Sharkie/2.Long_IDLE/i14.png'
    ];
    IMAGES_SLEEPING = [        
        'img/1.Sharkie/2.Long_IDLE/i11.png',
        'img/1.Sharkie/2.Long_IDLE/i12.png', 
        'img/1.Sharkie/2.Long_IDLE/i13.png',
        'img/1.Sharkie/2.Long_IDLE/i14.png'
    ];
    IMAGES_SWIMMING = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];
    IMAGES_DEAD = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png'
    ];
    IMAGES_HURT = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png'
    ];
    IMAGES_BUBBLES = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png'
    ];
    IMAGES_POISONBUBBLES = [
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png'
    ];
    world;


    constructor() {
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMAGES_WAITING);      
        this.loadImages(this.IMAGES_RESTING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_SWIMMING);      
        this.loadImages(this.IMAGES_DEAD);  
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_BUBBLES);
        this.loadImages(this.IMAGES_POISONBUBBLES);

        this.animate();
    }

    animate() {
        setInterval(() => {
            if(this.world.keyboard.RIGHT && this.x < 3700){
                this.x += this.speed;
                this.otherDirection = false;
            }
            if(this.world.keyboard.LEFT && this.x > 100){
                this.x -= this.speed;
                this.otherDirection = true;
            }
            if(this.world.keyboard.UP && this.y > 0){
                this.y -= this.speed;
                this.rotation = -0.25;
            }
            if(this.world.keyboard.DOWN && this.y < this.world.canvas.height - this.height){
                this.y += this.speed;
                this.rotation = 0.25;
            }
            if (!this.world.keyboard.UP && !this.world.keyboard.DOWN){
                this.rotation = 0;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            this.restCounter++;
            if(this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);
                return;
            } else if(this.isHurt()){ 
                this.playAnimation(this.IMAGES_HURT);
            } else if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {                
                this.playAnimation(this.IMAGES_SWIMMING);   
                this.restCounter = 0;                
            } else if(this.restCounter > 50) {
                this.playAnimationOnce(this.IMAGES_RESTING, this.IMAGES_SLEEPING);
            }
            else {
                this.playAnimation(this.IMAGES_WAITING);                
            }
            if (this.world.keyboard.E && !this.isBubbleAnimating) {
                this.isBubbleAnimating = true;
                this.animationFinished = false;
                this.currentImage = 0;
            }
            if (this.world.keyboard.SPACE && !this.isPoisonBubbleAnimating && this.poisonCount > 0) {
                this.isPoisonBubbleAnimating = true;
                this.animationFinished = false;
                this.currentImage = 0;
            }
            if (this.isBubbleAnimating) {
                this.playAnimationOnce(this.IMAGES_BUBBLES);

                if (this.animationFinished) {
                    this.shootBubble('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
                    this.isBubbleAnimating = false;
                    this.animationFinished = false;
                    this.restCounter = 0;
                }
            }
            if (this.isPoisonBubbleAnimating) {
                this.playAnimationOnce(this.IMAGES_POISONBUBBLES);

                if (this.animationFinished) {
                    this.shootBubble('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
                    this.poisonCount--;
                    this.world.poisonBar.setBarProgress(this.poisonCount);
                    this.isPoisonBubbleAnimating = false;
                    this.animationFinished = false;
                    this.restCounter = 0;
                }
            }
        }, 250);    
    }

    shootBubble(bubbleImg) {
        let bubble;
        if (!this.otherDirection){
        bubble = new Bubble(this.x + 140, this.y + 50, this.otherDirection, bubbleImg);
        } else {
        bubble = new Bubble(this.x - 40 , this.y + 50, this.otherDirection, bubbleImg);
        }        
        this.world.bubbles.push(bubble);        
    }
        
    jump() {
    
    }
}
    