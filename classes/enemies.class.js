import { MovableObject } from "./movable-object.class.js";
import { PUFFER_IMAGES, YELLY_IMAGES } from "../js/enemyImages.js";

export class Enemies extends MovableObject {
    y = 360;
    height = 100;
    width = 100;
    energy = 40;
    colorIndex;
    isDead = false;
    world;
    pufferColorAnimations = [
        PUFFER_IMAGES.IMAGES_SWIMMING_PUFFER, 
        PUFFER_IMAGES.IMAGES_SWIMMING_PUFFER2, 
        PUFFER_IMAGES.IMAGES_SWIMMING_PUFFER3
    ];
    pufferTransitionAnimations = [
        PUFFER_IMAGES.IMAGES_TRANSITION_PUFFER, 
        PUFFER_IMAGES.IMAGES_TRANSITION_PUFFER2,
        PUFFER_IMAGES.IMAGES_TRANSITION_PUFFER3
    ];
    bubbleSwimAnimations = [
        PUFFER_IMAGES.IMAGES_BUBBLESWIM_PUFFER,
        PUFFER_IMAGES.IMAGES_BUBBLESWIM_PUFFER2,
        PUFFER_IMAGES.IMAGES_BUBBLESWIM_PUFFER3
    ];
    dyingPufferAnimations = [
        PUFFER_IMAGES.IMAGES_DYING_PUFFER,
        PUFFER_IMAGES.IMAGES_DYING_PUFFER2,
        PUFFER_IMAGES.IMAGES_DYING_PUFFER3
    ];
    jellyColorAnimations = [
        YELLY_IMAGES.IMAGES_SWIMMING_YELLY,
        YELLY_IMAGES.IMAGES_SWIMMING_YELLY2
    ];
    jellyTransitionAnimations = [
        YELLY_IMAGES.IMAGES_TRANSITION_YELLY,
        YELLY_IMAGES.IMAGES_TRANSITION_YELLY2
    ];
    jellyDeadAnimations = [
        YELLY_IMAGES.IMAGES_DEAD_YELLY_YELLOW,
        YELLY_IMAGES.IMAGES_DEAD_YELLY_LILA,
    ];
    jellyTransitionDeadAnimations = [
        YELLY_IMAGES.IMAGES_DEAD_YELLY_GREEN,
        YELLY_IMAGES.IMAGES_DEAD_YELLY_PINK
    ];

    constructor(startImage, top, right, bottom, left, currentColor) {
        super().loadImage(startImage);        
        this.colorIndex = currentColor;
        this.offset = {
            top: top,
            right: right,
            bottom: bottom,
            left: left
        };
        this.x = 500 + Math.random() * 3200;
        this.y = 50 + Math.random() * 250;
        this.speed = 0.15 + Math.random() * 0.5;
        this.loadImages(PUFFER_IMAGES.IMAGES_SWIMMING_PUFFER);  
        this.loadImages(PUFFER_IMAGES.IMAGES_SWIMMING_PUFFER2);
        this.loadImages(PUFFER_IMAGES.IMAGES_SWIMMING_PUFFER3);
        this.loadImages(PUFFER_IMAGES.IMAGES_TRANSITION_PUFFER);
        this.loadImages(PUFFER_IMAGES.IMAGES_TRANSITION_PUFFER2);
        this.loadImages(PUFFER_IMAGES.IMAGES_TRANSITION_PUFFER3);
        this.loadImages(PUFFER_IMAGES.IMAGES_BUBBLESWIM_PUFFER);
        this.loadImages(PUFFER_IMAGES.IMAGES_BUBBLESWIM_PUFFER2);
        this.loadImages(PUFFER_IMAGES.IMAGES_BUBBLESWIM_PUFFER3);
        this.loadImages(PUFFER_IMAGES.IMAGES_DYING_PUFFER);
        this.loadImages(PUFFER_IMAGES.IMAGES_DYING_PUFFER2);
        this.loadImages(PUFFER_IMAGES.IMAGES_DYING_PUFFER3);
        this.loadImages(YELLY_IMAGES.IMAGES_SWIMMING_YELLY);
        this.loadImages(YELLY_IMAGES.IMAGES_SWIMMING_YELLY2);
        this.loadImages(YELLY_IMAGES.IMAGES_TRANSITION_YELLY);
        this.loadImages(YELLY_IMAGES.IMAGES_TRANSITION_YELLY2);
        this.loadImages(YELLY_IMAGES.IMAGES_DEAD_YELLY_YELLOW);
        this.loadImages(YELLY_IMAGES.IMAGES_DEAD_YELLY_LILA);
        this.loadImages(YELLY_IMAGES.IMAGES_DEAD_YELLY_GREEN);
        this.loadImages(YELLY_IMAGES.IMAGES_DEAD_YELLY_PINK);
        if (startImage.includes('Puffer fish')) {
            this.animatePuffer(currentColor);           
            this.moveLeft();
        } else {
            this.animateJelly(currentColor);
            this.moveUpDown();
        }
    }

    /**
     * Animates the puffer fish with a normal animation followed by a transition animation.
     * Clears any existing animation interval and sets up a new one that cycles through
     * animation frames at 6 FPS. After a random duration between 2-3 seconds, transitions
     * to the transition animation.
     * 
     * @param {string} currentColor - The current color of the puffer fish to be used in animations
     * @returns {void}
     */
    animatePuffer(currentColor) {
        if (this.isDead) return;
        clearInterval(this.normalPufferAnimationInterval);   
        this.currentImage = 0;
        this.offset.bottom = 30; 
        this.offset.top = 10;
        this.normalPufferAnimationInterval = setInterval(() => {            
            if (!this.world || this.world.isPaused) return;                                 
            this.normalPufferAnimation(currentColor);
        }, 1000 / 6);
        setTimeout(() => {
            if (!this.world || this.world.isPaused) return;
            clearInterval(this.normalPufferAnimationInterval);
            this.transitionPufferAnimation(currentColor);
        }, Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000);
    }

    /**
     * Plays the swimming animation for a normal puffer fish based on its color.
     * Updates the current image of the puffer fish from the cached frames.
     *
     * @param {number} currentColor - The index or key representing the current color of the puffer fish.
     */
    normalPufferAnimation(currentColor) {
        if (this.isDead) return;
        let frames = this.pufferColorAnimations[currentColor];
        let i = this.currentImage % frames.length;
        this.img = this.imageCache[frames[i]];
        this.currentImage++;
    }

    /**
     * Handles the transition animation for a puffer fish when changing to a new color.
     * Resets the current image, triggers the color change, and after a short delay
     * starts the bubble swim animation for the new color.
     *
     * @param {number} currentColor - The index or key representing the new color of the puffer fish.
     */
    transitionPufferAnimation(currentColor) {
        if (this.isDead) return;
        clearInterval(this.transitionPufferAnimationInterval);
        this.currentImage = 0;
        this.pufferColorChange(currentColor);
        setTimeout(() => {
            if (!this.world || this.world.isPaused) return;
            clearInterval(this.transitionPufferAnimationInterval);
            this.bubbleSwimAnimation(currentColor);
        }, 833);
    }

    /**
     * Starts the transition animation for a puffer fish changing to a new color.
     * Cycles through the frames of the transition animation at 6 frames per second
     * and updates the fish's image accordingly.
     *
     * @param {number} currentColor - The index or key representing the new color of the puffer fish.
     */
    pufferColorChange(currentColor) {
        this.transitionPufferAnimationInterval = setInterval(() => {
            if (!this.world || this.world.isPaused) return;
            let frames = this.pufferTransitionAnimations[currentColor];
            let i = this.currentImage % frames.length;
            this.img = this.imageCache[frames[i]];
            this.currentImage++;
        }, 1000 / 6);
    }

    /**
     * Initiates the "bubble swim" animation for a puffer fish of a specific color.
     * Resets animation state, applies color-specific bubble swim, and after a random
     * duration between 2000ms and 3000ms, transitions the puffer fish back using 
     * `transitionPufferAnimationReverse`.
     *
     * @param {number} currentColor - The index or key representing the current color of the puffer fish.
     */
    bubbleSwimAnimation(currentColor) {
        if (this.isDead) return;
        clearInterval(this.bubbleSwimInterval);
        this.currentImage = 0;
        this.offset.bottom = 0; 
        this.offset.top = 0;
        this.bubbleSwimColor(currentColor);
        setTimeout(() => {
            if (!this.world || this.world.isPaused) return;
            clearInterval(this.bubbleSwimInterval);
            this.transitionPufferAnimationReverse(currentColor);
        }, Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000);
    }

    /**
     * Starts the bubble swim animation for a puffer fish of a specific color.
     * Cycles through the color-specific animation frames at a rate of 6 frames per second
     * and updates the displayed image accordingly.
     *
     * @param {number} currentColor - The index or key representing the current color of the puffer fish.
     */
    bubbleSwimColor(currentColor) {
        this.bubbleSwimInterval = setInterval(() => {
            if (!this.world || this.world.isPaused) return;
            let frames = this.bubbleSwimAnimations[currentColor];
            let i = this.currentImage % frames.length;
            this.img = this.imageCache[frames[i]];
            this.currentImage++;
        }, 1000 / 6);
    }

    /**
     * Plays the puffer fish's transition animation in reverse for a given color.
     * Cycles backward through the color-specific transition frames at 6 frames per second.
     * After the reverse animation completes (833ms), it triggers the normal puffer animation.
     *
     * @param {number} currentColor - The index or key representing the current color of the puffer fish.
     */
    transitionPufferAnimationReverse(currentColor) {
        if (this.isDead) return;
        clearInterval(this.transitionPufferAnimationReverseInterval);
        this.currentImage = this.pufferTransitionAnimations[currentColor].length - 1;
        this.transitionPufferAnimationReverseInterval = setInterval(() => {
            if (!this.world || this.world.isPaused) return;
            let frames = this.pufferTransitionAnimations[currentColor];
            let i = this.currentImage % frames.length;
            this.img = this.imageCache[frames[i]];
            this.currentImage--;
        }, 1000 / 6);
        setTimeout(() => {
            if (!this.world || this.world.isPaused) return;
            clearInterval(this.transitionPufferAnimationReverseInterval);
            this.animatePuffer(currentColor);
        }, 833);
    }

    /**
     * Stops all current puffer fish animations and sets the fish into its dying state.
     * Resets the animation frame to the first frame of the color-specific dying animation
     * and marks the puffer fish as dead.
     */
    dyingPufferAnimation() {
        this.isDead = true;
        clearInterval(this.normalPufferAnimationInterval);
        clearInterval(this.transitionPufferAnimationInterval);
        clearInterval(this.bubbleSwimInterval);
        clearInterval(this.transitionPufferAnimationReverseInterval);
        this.currentImage = 0;
        let path = this.dyingPufferAnimations[this.colorIndex][0];
        this.img = this.imageCache[path];
    }

    /**
     * Animates the jellyfish of the specified color by cycling through its swimming frames.
     * The animation interval runs at 6 frames per second. After a random duration between
     * 2 and 3 seconds, the interval is cleared and the transition animation is triggered.
     *
     * @param {string|number} currentColor - The key or index representing the jellyfish's color.
     */
    animateJelly(currentColor) {
        if (this.isDead) return;
        this.animateJellyInterval = setInterval(() => {
            if (!this.world || this.world.isPaused) return;
            let i = this.currentImage % this.jellyColorAnimations[currentColor].length;            
            let path = this.jellyColorAnimations[currentColor][i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 6);
        setTimeout(() => {
            if (!this.world || this.world.isPaused) return;
            clearInterval(this.animateJellyInterval);
            this.animateJellyTransition(currentColor);
        }, Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000);
    }

    /**
     * Animates the jellyfish's transition sequence for the specified color.
     * This method cycles through the transition frames at 6 frames per second.
     * After a random duration between 2 and 3 seconds, the interval is cleared and
     * the regular swimming animation (`animateJelly`) is restarted.
     *
     * @param {string|number} currentColor - The key or index representing the jellyfish's color.
     */
    animateJellyTransition(currentColor) {
        if (this.isDead) return;
        this.currentImage = 0;
        this.animateJellyTransitionInterval = setInterval(() => {
            if (!this.world ||this.world.isPaused) return;
            let i = this.currentImage % this.jellyTransitionAnimations[currentColor].length;
            let path = this.jellyTransitionAnimations[currentColor][i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 6);
        setTimeout(() => {
            if (!this.world ||this.world.isPaused) return;
            clearInterval(this.animateJellyTransitionInterval);
            this.animateJelly(currentColor);
        },Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000);
    }

    /**
     * Plays the dying animation for the jellyfish enemy.
     * Clears any ongoing swimming or transition animations and cycles through
     * the appropriate dead animation frames at 6 frames per second.
     * The dead animation array is chosen based on the enemy's current image color.
     *
     * @param {Object} enemy - The enemy object whose dying animation is triggered.
     * @param {HTMLImageElement} enemy.img - The current image element of the enemy.
     */
    animateJellyDying(enemy) {
        this.isDead = true;
        clearInterval(this.animateJellyInterval);
        clearInterval(this.animateJellyTransitionInterval);
        this.currentImage = 0;
        let deadImgArray;
        if(enemy.img.currentSrc.includes('Yellow')|| enemy.img.currentSrc.includes('Lila')) deadImgArray = this.jellyDeadAnimations;
        else deadImgArray = this.jellyTransitionDeadAnimations;        
        setInterval(() => {
            if (!this.world || this.world.isPaused) return;
            let i = this.currentImage % deadImgArray[this.colorIndex].length;
            let path = deadImgArray[this.colorIndex][i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 6);
    }
}