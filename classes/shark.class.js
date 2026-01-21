class Shark extends MovableObject {

    height = 200;
    width = 200;
    y = 155;
    x = 200;
    speed = 5;
    rotation = 0;
    restCounter = 0;
    vulnerable = true;
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
        './img/1.Sharkie/2.Long_IDLE/i1.png',
        './img/1.Sharkie/2.Long_IDLE/I2.png',    
        './img/1.Sharkie/2.Long_IDLE/I3.png',
        './img/1.Sharkie/2.Long_IDLE/I4.png', 
        './img/1.Sharkie/2.Long_IDLE/I5.png',
        './img/1.Sharkie/2.Long_IDLE/I6.png', 
        './img/1.Sharkie/2.Long_IDLE/I7.png',
        './img/1.Sharkie/2.Long_IDLE/I8.png', 
        './img/1.Sharkie/2.Long_IDLE/I9.png',
        './img/1.Sharkie/2.Long_IDLE/I10.png', 
        'img/1.Sharkie/2.Long_IDLE/I11.png',
        'img/1.Sharkie/2.Long_IDLE/I12.png', 
        'img/1.Sharkie/2.Long_IDLE/I13.png',
        'img/1.Sharkie/2.Long_IDLE/I14.png'
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

    /**
     * Main animation loop for the shark character.
     *
     * This function handles the shark's movement, actions, and bubble attacks. It:
     * - Calls `sharkMovement` to update the shark's position.
     * - Sets up a recurring interval (every 100ms) to animate bubble attacks:
     *   - Calls `sharkBubble` if a normal bubble is animating.
     *   - Calls `sharkPoisonBubble` if a poisoned bubble is animating.
     * - Calls `sharkActions` to execute additional shark behaviors.
     *
     * The bubble animation interval respects the world's paused state and will not execute while paused.
     */
    animate() {        
        this.sharkMovement();
        this.bubbleInterval = setInterval(() => {
            if (this.world.isPaused) return;
            if (this.isBubbleAnimating) this.sharkBubble();
            if (this.isPoisonBubbleAnimating) this.sharkPoisonBubble();            
        }, 100);

        this.sharkActions();
    }

    /**
     * Handles the main animation and action loop for the shark character.
     * Determines which animation to play based on the shark's state, user input, and world conditions.
     * - Plays dead animation if the shark is dead.
     * - Plays hurt animation if the shark was recently hit.
     * - Plays swimming animation if movement keys are pressed.
     * - Plays resting or sleeping animation if idle for a certain period.
     * - Plays waiting animation otherwise.
     * - Initiates bubble or poison bubble actions based on user input.
     * The loop runs every 250ms and respects the world's paused state.
     */
    sharkActions() {
        this.animationInterval = setInterval(() => {
            if (this.world.isPaused) return;
            this.restCounter++;
            if (this.isBubbleAnimating || this.isPoisonBubbleAnimating) return;
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                return;
            }
            if (this.world.hitTimePassed(this)) {
                this.playAnimation(this.IMAGES_HURT);
                return;
            }
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.playAnimation(this.IMAGES_SWIMMING);
                this.restCounter = 0;
                return;
            }
            if (this.restCounter > 50) {
                this.playAnimationOnce(this.IMAGES_RESTING, this.IMAGES_SLEEPING);
                return;
            }
            this.playAnimation(this.IMAGES_WAITING);
            if (this.world.keyboard.D && !this.isBubbleAnimating) this.startBubble();
            if (this.world.keyboard.SPACE && !this.isPoisonBubbleAnimating && this.poisonCount > 0) this.startPoisonBubble();
        }, 250);
    }

    /**
     * Initiates the bubble animation for the shark.
     * Sets the animation state to active and resets the animation sequence.
     */
    startBubble() {
        this.isBubbleAnimating = true;
        this.resetAnimation();
    }

    /**
     * Initiates the poison bubble animation for the shark.
     * Sets the animation state to active and resets the animation sequence.
     */
    startPoisonBubble() {
        this.isPoisonBubbleAnimating = true;
        this.resetAnimation();
    }

    /**
     * Resets the animation state to its initial values.
     * Sets the animation as not finished and resets the current image index to 0.
     */
    resetAnimation() {
        this.animationFinished = false;
        this.currentImage = 0;
    }

    /**
     * Animates the shark's poisoned bubble attack and shoots a poisoned bubble when the animation is complete.
     *
     * This function plays the poisoned bubble animation using `playAnimationOnce`. Once the animation
     * finishes, it spawns a poisoned bubble by calling `shootBubble`, decreases the `poisonCount`,
     * updates the poison bar via `world.poisonBar.setBarProgress`, and resets relevant flags
     * (`isPoisonBubbleAnimating`, `animationFinished`) and the `restCounter`.
     */
    sharkPoisonBubble() {
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

    /**
     * Animates the shark's bubble attack and shoots a bubble when the animation is complete.
     *
     * This function plays the bubble animation using `playAnimationOnce`. Once the animation
     * finishes, it spawns a bubble by calling `shootBubble`, plays the bubble sound, and resets
     * the relevant flags (`isBubbleAnimating`, `animationFinished`) and the `restCounter`.
     */
    sharkBubble() {
        this.playAnimationOnce(this.IMAGES_BUBBLES);
        if (this.animationFinished) {
            this.shootBubble('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
            this.world.sound.play('bubble');
            this.isBubbleAnimating = false;
            this.animationFinished = false;
            this.restCounter = 0;
        }
    }

    /**
     * Handles the movement logic for the shark character based on keyboard input.
     * Updates the shark's position (`x`, `y`), direction (`otherDirection`), and rotation.
     * Also updates the camera position relative to the shark.
     * Movement is paused if `world.isPaused` is true.
     * 
     * - Moves right if the RIGHT key is pressed and within bounds.
     * - Moves left if the LEFT key is pressed and within bounds.
     * - Moves up if the UP key is pressed and within bounds, applying upward rotation.
     * - Moves down if the DOWN key is pressed and within bounds, applying downward rotation.
     * - Resets rotation if neither UP nor DOWN is pressed.
     * - Continuously updates at 60 frames per second.
     *
     * @method
     * @memberof Shark
     */
    sharkMovement() {
        setInterval(() => {
            if (this.world.isPaused) return;
            if (this.world.keyboard.RIGHT && this.x < 3700) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 100) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            if (this.world.keyboard.UP && this.y > -100) {
                this.y -= this.speed;
                this.rotation = -0.25;
            }
            if (this.world.keyboard.DOWN && this.y < this.world.canvas.height - this.height) {
                this.y += this.speed;
                this.rotation = 0.25;
            }
            if (!this.world.keyboard.UP && !this.world.keyboard.DOWN) this.rotation = 0;
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Creates and shoots a bubble from the shark's position.
     * The bubble direction depends on whether the shark is facing the opposite direction.
     * 
     * @param {string} bubbleImg - The image source for the bubble
     * @returns {void}
     */
    shootBubble(bubbleImg) {
        let bubble;
        if (!this.otherDirection){
        bubble = new Bubble(this.x + 140, this.y + 50, this.otherDirection, bubbleImg);
        } else {
        bubble = new Bubble(this.x - 40 , this.y + 50, this.otherDirection, bubbleImg);
        }        
        this.world.bubbles.push(bubble);        
    }
}
    