class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    energy = 100;
    lastHit = 0;    
    animationFinished = false;
    speedY = 0;
    acceleration = 0.25;
    poisonous = false;
    endboss = false;

    bubbleRise() {
        setInterval(() => {
                this.y += this.speedY;
                this.speedY -= this.acceleration;
        }, 1000 / 60);
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
               this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
               this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
               this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    hit() {
        this.energy -= 20;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }


    playAnimation(arr) {
                let i = this.currentImage % arr.length;
                let path = arr[i];
                this.img = this.imageCache[path];
                this.currentImage++;     
                
    }

    playAnimationOnce(arr, endArr) {
        if (!this.animationFinished) {
            let i = this.currentImage % arr.length;
            let path = arr[i];
            this.img = this.imageCache[path];        
            this.currentImage++;   
            if (i === arr.length -1) {
                this.animationFinished = true;
        }        
        } else if (this.animationFinished) {
            let i = this.currentImage % endArr.length;
            let path = endArr[i];
            this.img = this.imageCache[path];        
            this.currentImage++;   
        }
    }

    moveRight() {
    
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    moveUpDown(startY = 20, endY = 360, speed = 1) {
    this.direction = 1;

    setInterval(() => {
        this.y += this.direction * speed;
        
        if (this.y >= endY) {
            this.direction = -1;
        }

        if (this.y <= startY) {
            this.direction = 1;
        }
    }, 1000 / 60);
}
}