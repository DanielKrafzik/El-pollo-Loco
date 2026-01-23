

export class CollisionManager {
    constructor(world) {
        this.world = world;
        this.checkCollisions();
    }

    setWorld(world) {
        this.world = world;
    }

    /**
     * Starts a recurring check for all game collisions and interactions.     
     * - Runs every 100 milliseconds using `setInterval`.
     * - Skips execution if the game is currently paused (`isPaused` is true).
     * - Checks for collisions between the player (`shark`) and enemies.
     * - Handles collectible pickups such as coins and poison items.
     * - Processes bubble interactions in the game world.     
     * This function sets up the main collision detection loop for gameplay mechanics.
     */
    checkCollisions() {
        this.collisionInterval = setInterval(() => {
            if (!this.world ||this.world.isPaused) return;
            this.sharkColliding();
            this.coinCollecting();
            this.poisonCollecting();
            this.bubbleHandling();
        }, 100);
    }

    /**
     * Handles interactions between bubbles and enemies in the game world.     
     * - Iterates through all active bubbles and checks for collisions with each enemy.
     * - Plays the 'bubbleHit' sound when a collision occurs.
     * - For regular enemies, triggers `bubbleSplicing` to handle the collision effects.
     * - For the endboss, triggers `poisonBubbleSplicing` instead.     
     * This method is responsible for detecting and processing all bubble-enemy interactions.
     */
    bubbleHandling() {
        this.world.bubbles.forEach((bubble, bIndex) => {
            this.world.level.enemies.forEach((enemy, eIndex) => {
                if (bubble.isColliding(enemy)) {
                    this.world.sound.play('bubbleHit');
                    if (!enemy.endboss) {
                        this.bubbleSplicing(bIndex, bubble, enemy, eIndex);
                    } else {
                        this.poisonBubbleSplicing(bIndex, bubble, enemy, eIndex);
                    }
                }
            });
        });
    }

    /**
     * Handles the collision of a poisonous bubble with the endboss.     
     * - Removes the bubble from the active bubbles array.
     * - Plays the 'bossHit' sound effect.
     * - If the bubble is poisonous and the enemy is the endboss:
     *   - Applies damage to the endboss by calling `hit()`.
     *   - Updates the endboss health bar to reflect the current energy.
     *   - Calls `bubbleIntervallHandling` to handle any additional endboss-specific effects.     
     * @param {number} bIndex - The index of the bubble in the bubbles array.
     * @param {Object} bubble - The bubble object that collided.
     * @param {Object} enemy - The enemy object (endboss) that was hit.
     * @param {number} eIndex - The index of the enemy in the enemies array.
     */
    poisonBubbleSplicing(bIndex, bubble, enemy, eIndex) {
        this.world.bubbles.splice(bIndex, 1);
        this.world.sound.play('bossHit');
        if (bubble.poisonous && enemy.endboss) {
            enemy.hit();
            enemy.healthbar.setHealth(enemy.energy);
            this.bubbleIntervallHandling(enemy, eIndex);
        }
    }

    /**
     * Handles the aftermath of a bubble hitting an enemy, specifically for the endboss.     
     * - If the enemy's energy is 0 or less:
     *   - Stops the endboss movement and swimming intervals.
     *   - Reduces the endboss speed and triggers its dying animation.
     *   - Moves the endboss upwards.
     *   - Removes the endboss from the enemies array after 3 seconds.
     * - If the enemy still has energy:
     *   - Stops both the endboss swimming interval and the general move-towards-shark interval.     
     * @param {Object} enemy - The enemy object that was hit by a bubble.
     * @param {number} eIndex - The index of the enemy in the enemies array.
     */
    bubbleIntervallHandling(enemy, eIndex) {
        if (enemy.energy <= 0) {
            clearInterval(this.world.moveTowardsSharkIntervall);
            clearInterval(enemy.endbossSwimmingInterval);
            enemy.speed = 0.5;
            enemy.endbossDyingAnimation();
            enemy.moveUp();
            setTimeout(() => {
                this.world.level.enemies.splice(eIndex, 1);
            }, 3000);
        } else {
            clearInterval(enemy.endbossSwimmingInterval);
            clearInterval(this.world.moveTowardsSharkIntervall);
        }
    }

    /**
     * Handles the effects of a regular bubble hitting a non-endboss enemy.     
     * - Removes the bubble from the bubbles array.
     * - Reduces the enemy's energy based on whether the bubble is poisonous (40 if poisonous, 20 otherwise).
     * - If the enemy's energy drops to 0 or below, triggers `poisonBubbleIntervalHandling` for further processing.     
     * @param {number} bIndex - The index of the bubble in the bubbles array.
     * @param {Object} bubble - The bubble object that collided with the enemy.
     * @param {Object} enemy - The enemy object that was hit by the bubble.
     * @param {number} eIndex - The index of the enemy in the enemies array.
     */
    bubbleSplicing(bIndex, bubble, enemy, eIndex) {
        this.world.bubbles.splice(bIndex, 1);
        if (bubble.poisonous) enemy.energy -= 40;
        else enemy.energy -= 20;
        if (enemy.energy <= 0) {
            this.poisonBubbleIntervalHandling(enemy, eIndex);
        }
    }

    /**
     * Handles the death sequence for an enemy after being hit by a bubble that reduces its energy to zero.     
     * - Determines the enemy type based on its image source.
     *   - If it's a Puffer fish, stops its left movement interval and plays the dying animation.
     *   - Otherwise, assumes it's a Jellyfish, stops its vertical movement interval and plays the jelly dying animation.
     * - Moves the enemy upward to simulate a death movement.
     * - Removes the enemy from the `level.enemies` array after 3 seconds.    
     * @param {Object} enemy - The enemy object that is dying.
     * @param {number} eIndex - The index of the enemy in the `level.enemies` array.
     */
    poisonBubbleIntervalHandling(enemy, eIndex) {
        if (enemy.img.currentSrc.includes('Puffer')) {
            clearInterval(enemy.moveLeftInterval);
            enemy.dyingPufferAnimation(enemy);
        } else {
            clearInterval(enemy.moveUpDownInterval);
            enemy.animateJellyDying(enemy);
        }
        enemy.moveUp();
        setTimeout(() => {
            this.world.level.enemies.splice(eIndex, 1);
        }, 3000);
    }

    /**
     * Checks for collisions between the shark and poison items in the level.     
     * - If the shark collides with a poison item:
     *   - Increases the shark's poison count via `collectPoison()`.
     *   - Plays a "flask" sound effect.
     *   - Removes the collected poison item from the level.
     *   - Updates the poison bar to reflect the shark's current poison count.
     */
    poisonCollecting() {
        this.world.level.poison.forEach((poison, index) => {
            if (this.world.shark.isColliding(poison)) {
                this.world.shark.collectPoison();
                this.world.sound.play('flask');
                this.world.level.poison.splice(index, 1);
                this.world.poisonBar.setBarProgress(this.world.shark.poisonCount);
            }
        });
    }

    /**
     * Checks for collisions between the shark and collectible coins in the level.     
     * - If the shark collides with a coin:
     *   - Increases the shark's coin count via `collect()`.
     *   - Plays a "coin" sound effect.
     *   - Removes the collected coin from the level.
     *   - Updates the coin bar to reflect the shark's current coin count.
     */
    coinCollecting() {
        this.world.level.collectibles.forEach((collectible, index) => {
            if (this.world.shark.isColliding(collectible)) {
                this.world.shark.collect();
                this.world.sound.play('coin');
                this.world.level.collectibles.splice(index, 1);
                this.world.coinBar.setBarProgress(this.world.shark.coinCount);
            }
        });
    }

    /**
     * Checks for collisions between the shark and all enemies in the level.     
     * - If a collision occurs and the shark has not been hit recently:
     *   - Reduces the shark's energy via `hit()`.
     *   - Plays the "sharkHit" sound effect.
     *   - Updates the status bar to reflect the shark's current energy.
     *   - If the enemy is the endboss:
     *     - Stops the endboss's swimming interval.
     *     - Resets the endboss's hit counter.
     */
    sharkColliding() {
        this.world.level.enemies.forEach(enemy => {
            if (this.world.shark.isColliding(enemy) && !this.hitTimePassed(this.world.shark)) {
                this.world.shark.hit();
                this.world.sound.play('sharkHit');
                this.world.statusBar.setPercentage(this.world.shark.energy);
                if (enemy.endboss) {
                    clearInterval(enemy.endbossSwimmingInterval);
                    enemy.endbossHitCounter = 0;
                }
            }
        });
    }

    /**
     * Checks if less than one second has passed since the character was last hit.
     * - Calculates the time difference between the current time and the character's `lastHit` timestamp.
     * - Converts the difference from milliseconds to seconds.
     * - Returns `true` if the character was hit less than one second ago, otherwise `false`.
     *
     * @param {Object} character - The character object to check.
     * @param {number} character.lastHit - The timestamp (in milliseconds) of the character's last hit.
     * @returns {boolean} True if less than one second has passed since the last hit, false otherwise.
     */
    hitTimePassed(character) {
        const lastHitTime = (new Date().getTime() - character.lastHit) / 1000;
        return lastHitTime < 1;
    }
}