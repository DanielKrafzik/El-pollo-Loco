class Endboss extends MovableObject {

    height = 400;
    width = 300;
    y = 0;
    energy = 60;
    endboss = true;
    endbossHitCounter = 6;
    triggered = false;

    IMAGES_SWIMMING = [
        './img/2.Enemy/3 Final Enemy/2.floating/1.png',
        './img/2.Enemy/3 Final Enemy/2.floating/2.png',
        './img/2.Enemy/3 Final Enemy/2.floating/3.png',
        './img/2.Enemy/3 Final Enemy/2.floating/4.png',
        './img/2.Enemy/3 Final Enemy/2.floating/5.png',
        './img/2.Enemy/3 Final Enemy/2.floating/6.png',
        './img/2.Enemy/3 Final Enemy/2.floating/7.png',
        './img/2.Enemy/3 Final Enemy/2.floating/8.png',
        './img/2.Enemy/3 Final Enemy/2.floating/9.png',
        './img/2.Enemy/3 Final Enemy/2.floating/10.png',
        './img/2.Enemy/3 Final Enemy/2.floating/11.png',
        './img/2.Enemy/3 Final Enemy/2.floating/12.png',
        './img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ]
    IMAGES_INTRODUCTION = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ];
    IMAGES_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png'
    ];
    IMAGES_DEAD = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ];
    IMAGES_HURT = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];

    constructor() {
        super();
        this.animationFinished = false;
        this.x = 3900;
        this.speed = 2.5;
        this.offset = {
            top: 200,
            right: 30,
            bottom: 75,
            left: 30
        };
        this.loadImage('img/2.Enemy/3 Final Enemy/1.Introduce/10.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_INTRODUCTION);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.healthbar = new Endbosshealthbar();
        this.world = null;
    }   

    setWorld(world) {
        this.world = world;
        this.animate();  
    }

    animate() {
        setInterval(() => {
            if (this.world.isPaused) return;
            if(this.world.hitTimePassed(this)){ 
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.energy > 0 && this.triggered && this.endbossHitCounter >= 6 && this.animationFinished) {
                this.playAnimation(this.IMAGES_SWIMMING);
            } else if (this.endbossHitCounter < 6 && this.triggered) {
                this.endbossHitCounter++;
                this.playAnimation(this.IMAGES_ATTACK);
            }
        }, 250);
        this.endbossSwimmingInterval = setInterval(() => {
            if (this.world.isPaused) return;
            if(this.world.shark.x >= 3200) {
                
                this.triggered = true;
            }
            if(this.triggered) {
                if (!this.animationFinished) {
                    this.updateAnimation(this.IMAGES_INTRODUCTION, null, 120);
                } else {
                    this.updateAnimation(this.IMAGES_SWIMMING, null, 120);
                }
            }
        }, 1000 / 60);    
        setInterval(() => {
            if (this.world.isPaused) return;
            if(this.triggered && this.energy > 0) {
                this.moveTowardsShark();   
            }
        }, 1000 / 60);
    }

    updateAnimation(animation1, animation2, speed = 120) {
        if (!this.lastAnimTime) this.lastAnimTime = 0;

        const now = Date.now();
        if (now - this.lastAnimTime > speed) {
            this.playAnimationOnce(
                animation1,
                animation2
            );
            
            this.lastAnimTime = now;
        }
    }

    moveTowardsShark() {
        const shark = this.world.shark;
        const bossHitboxY = this.y + this.offset.top; 
        const sharkHitboxY = shark.y + shark.offset.top;

        if (shark.x < this.x) {
            this.otherDirection = false;
            this.x -= this.speed;
        }
        if (shark.x > this.x) {
            this.otherDirection = true;
            this.x += this.speed;
        }
        if (sharkHitboxY < bossHitboxY) this.y -= this.speed;
        if (sharkHitboxY > bossHitboxY && this.y < 200) this.y += this.speed;    
    }

    endbossDyingAnimation() {
        this.isDead = true;
        this.currentImage = 0;

        setInterval(() => {
            let i = this.currentImage % this.IMAGES_DEAD.length;
            let path = this.IMAGES_DEAD[i];
            this.img = this.imageCache[path];
            this.currentImage++;            
        }, 1000 / 6);
    }
}