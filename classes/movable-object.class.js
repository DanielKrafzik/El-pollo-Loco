class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    energy = 100;
    lastHit = 0;



    

    drawFrame(ctx) {

        if(this instanceof Shark || this instanceof Enemies || this instanceof Endboss) {
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'orange';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        }
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
               this.y + this.height > mo.y &&
               this.x < mo.x &&
               this.y < mo.y + mo.height;
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

    moveRight() {
    
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}
    