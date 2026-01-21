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

    /**
     * Sets the world instance for this endboss and initiates animation.
     * @param {World} world - The world instance to associate with this endboss
     * @returns {void}
     */
    setWorld(world) {
        this.world = world;
        this.animate();  
    }

    /**
     * Initializes the end boss's behavior and animations.
     *
     * This method starts all main aspects of the end boss:
     * 
     * - Calls `endbossActions()` to handle attacks, hits, and animation states.
     * - Calls `endbossApperance()` to manage the boss's introduction and swimming animations.
     * - Starts continuous movement with `endbossMovement()` if it has not already been started.
     *
     * @method animate
     */
    animate() {
        this.endbossActions();
        this.endbossApperance();    
        if (this.endbossMoveInterval) return;
        this.endbossMovement();
    }

    /**
     * Controls the continuous movement of the end boss towards the shark.
     *
     * Sets up a repeating interval (60 times per second) to update the boss's
     * position:
     * 
     * - Skips movement updates if the game is paused.
     * - If the boss is triggered and still has energy, it moves towards the
     *   shark using `moveTowardsShark()`.
     *
     * @method endbossMovement
     */
    endbossMovement() {
        this.endbossMoveInterval = setInterval(() => {
            if (this.world.isPaused) return;
            if (this.triggered && this.energy > 0) {
                this.moveTowardsShark();
            }
        }, 1000 / 60);
    }

    /**
     * Handles the appearance and entrance animation of the end boss.
     *
     * Sets up a repeating interval (60 times per second) to manage the boss's
     * introduction sequence and swimming animation:
     * 
     * - Checks if the game is paused and skips updates if so.
     * - Triggers the boss when the shark reaches a certain x-position (3200).
     * - While triggered, plays the introduction animation until it finishes,
     *   including playing the boss sound.
     * - After the introduction animation completes, continuously updates the
     *   boss's swimming animation.
     *
     * @method endbossApperance
     */
    endbossApperance() {
        this.endbossSwimmingInterval = setInterval(() => {
            if (this.world.isPaused) return;
            if (this.world.shark.x >= 3200)this.triggered = true;            
            if (this.triggered) {
                if (!this.animationFinished) {
                    this.updateAnimation(this.IMAGES_INTRODUCTION, null, 120);
                    this.world.sound.play('boss');
                } else {
                    this.updateAnimation(this.IMAGES_SWIMMING, null, 120);
                }
            }
        }, 1000 / 60);
    }

    /**
     * Controls the end boss's actions in the game at regular intervals.
     *
     * This function sets up a repeating interval (every 250ms) to manage the
     * end boss behavior based on its state and the game world:
     * 
     * - Plays the "hurt" animation if the boss has recently been hit.
     * - Plays the "swimming" animation if the boss is alive, triggered, has
     *   been hit enough times, and the previous animation has finished.
     * - Plays the "attack" animation and increments the hit counter if the
     *   boss is triggered but hasn't reached the required number of hits,
     *   also plays an attack sound.
     * - Skips any action if the game is paused.
     *
     * @method endbossActions
     */
    endbossActions() {
        setInterval(() => {
            if (this.world.isPaused) return;
            if (this.world.hitTimePassed(this)) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.energy > 0 && this.triggered && this.endbossHitCounter >= 6 && this.animationFinished) {
                this.playAnimation(this.IMAGES_SWIMMING);
            } else if (this.endbossHitCounter < 6 && this.triggered) {
                this.endbossHitCounter++;
                this.playAnimation(this.IMAGES_ATTACK);
                this.world.sound.play('orcaAttack');
            }
        }, 250);
    }

    /**
     * Updates the animation state based on a time interval.
     *
     * Ensures that animations are played at a controlled speed by checking
     * the elapsed time since the last animation update. If enough time has
     * passed, the given animations are played once.
     *
     * @param {Array|string} animation1 - The primary animation or animation frames.
     * @param {Array|string} animation2 - The secondary animation or fallback animation.
     * @param {number} [speed=120] - Minimum time in milliseconds between animation updates.
     *
     * @method updateAnimation
     */
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

    /**
     * Moves the boss character towards the shark's position.
     *
     * The boss adjusts its horizontal movement based on the shark's x-position
     * and flips its direction accordingly. Vertically, it aligns itself with
     * the shark's hitbox while respecting an upper movement limit.
     *
     * - Moves left or right depending on the shark's x-coordinate
     * - Updates `otherDirection` to control sprite orientation
     * - Moves up or down to follow the shark's vertical position
     * - Prevents downward movement beyond a defined vertical boundary
     *
     * @method moveTowardsShark
     */
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

    /**
     * Plays the death animation for the endboss.
     * Sets the isDead flag to true and cycles through the IMAGES_DEAD array
     * at a frame rate of 6 FPS (1000ms / 6 frames).
     * 
     * @function endbossDyingAnimation
     * @returns {void}
     */
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