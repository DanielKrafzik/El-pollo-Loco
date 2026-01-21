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
    timePassed = 0;

    /**
     * Animates the bubble rising effect by updating the vertical position (`y`) and speed (`speedY`)
     * at a fixed interval. The bubble rises upwards, gradually slowing down due to acceleration.
     * 
     * @function
     * @memberof MovableObject
     */
    bubbleRise() {
        setInterval(() => {
                this.y += this.speedY;
                this.speedY -= this.acceleration;
        }, 1000 / 60);
    }

    /**
     * Checks if this object is colliding with another movable object.
     *
     * Collision is determined based on the positions, dimensions, and offset properties of both objects.
     *
     * @param {Object} mo - The other movable object to check collision against.
     * @param {number} mo.x - The x-coordinate of the other object.
     * @param {number} mo.y - The y-coordinate of the other object.
     * @param {number} mo.width - The width of the other object.
     * @param {number} mo.height - The height of the other object.
     * @param {Object} mo.offset - The offset values for the other object.
     * @param {number} mo.offset.left - The left offset of the other object.
     * @param {number} mo.offset.right - The right offset of the other object.
     * @param {number} mo.offset.top - The top offset of the other object.
     * @param {number} mo.offset.bottom - The bottom offset of the other object.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
               this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
               this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
               this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduces the object's energy by 20 when hit.
     * If energy drops below 0, it is set to 0.
     * Otherwise, records the timestamp of the last hit.
     */
    hit() {
        this.energy -= 20;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is dead based on its energy level.
     * @returns {boolean} Returns true if energy is 0, indicating the object is dead; otherwise, false.
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * Plays an animation by cycling through the provided array of image paths.
     * Updates the object's image to the next frame in the animation sequence.
     *
     * @param {string[]} arr - Array of image paths representing animation frames.
     */
    playAnimation(arr) {
                let i = this.currentImage % arr.length;
                let path = arr[i];
                this.img = this.imageCache[path];
                this.currentImage++;    
    }

    /**
     * Plays the intro animation once. Marks animation as finished when done.
     *
     * @param {Array<string>} introArr - Array of image paths for the intro animation.
     */
    playIntroAnimation(introArr) {
        if (this.animationFinished) return;
        const i = this.currentImage % introArr.length;
        const path = introArr[i];
        if (!this.imageCache[path]) return;
        this.img = this.imageCache[path];
        this.currentImage++;
        if (this.currentImage >= introArr.length) {
            this.animationFinished = true;
            this.currentImage = 0;
        }
    }

    /**
     * Plays a looping animation.
     *
     * @param {Array<string>} loopArr - Array of image paths for the looping animation.
     */
    playLoopAnimation(loopArr) {
        if (!loopArr || loopArr.length === 0) return;

        const i = this.currentImage % loopArr.length;
        const path = loopArr[i];

        if (!this.imageCache[path]) return;
        this.img = this.imageCache[path];

        this.currentImage++;
    }

    /**
     * Plays an animation: intro first (once), then loop if provided.
     *
     * @param {Array<string>} introArr - Array of image paths for the intro animation.
     * @param {Array<string>} [loopArr] - Array of image paths for the looping animation.
     */
    playAnimationOnce(introArr, loopArr) {
        if (!this.animationFinished) {
            this.playIntroAnimation(introArr);
        } else if (loopArr) {
            this.playLoopAnimation(loopArr);
        }
    }

    /**
     * Starts moving the object to the left by updating its `x` position at a fixed interval.
     * Movement is paused if the world is not defined or is currently paused.
     * The interval runs at approximately 60 frames per second.
     *
     * @function
     * @returns {void}
     */
    moveLeft() {
        this.moveLeftInterval =setInterval(() => {
            if (!this.world || this.world.isPaused) return;
            this.x -= this.speed;
        }, 1000 / 60);
    }

    /**
     * Moves the object upwards by decreasing its y-coordinate at a rate determined by its speed.
     * The movement occurs at approximately 60 frames per second.
     * Movement is paused if the world is not defined or is currently paused.
     */
    moveUp() {
        setInterval(() => {
            if (!this.world || this.world.isPaused) return;
            this.y -= this.speed * 2;
        }, 1000 / 60);
    }

    /**
     * Moves the object up and down between the specified vertical boundaries.
     * The movement is animated using setInterval and reverses direction at each boundary.
     *
     * @param {number} [startY=20] - The minimum Y position (upper boundary).
     * @param {number} [endY=360] - The maximum Y position (lower boundary).
     * @param {number} [speed=1] - The speed of movement per frame.
     */
    moveUpDown(startY = 20, endY = 360, speed = 1) {
        this.direction = 1;
        this.moveUpDownInterval = setInterval(() => {
            if (!this.world || this.world.isPaused) return;
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